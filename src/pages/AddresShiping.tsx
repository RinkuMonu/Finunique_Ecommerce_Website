"use client"
import type React from "react"
import { useEffect, useState } from "react"
import QRCode from "react-qr-code"
import { ChevronLeft, Wallet, Check, CreditCard, Clock, Shield } from "lucide-react"
import logo from "../assest/logo.jpg"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import LoginModal from "../components/loginModal/loginModal";
import Login1 from "../pages/Login1";
interface Address {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  isDefault?: boolean
}

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface ShippingMethod {
  id: string
  name: string
  description: string
  price: number
}

interface CouponCode {
  code: string
  discount: string
  description: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  pinCode?: string
  address?: string
}

const addresses: Address[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    isDefault: true,
  },
]

const shippingMethods: ShippingMethod[] = [
  { id: "1", name: "Free Delivery", description: "Free shipping", price: 0 },
  { id: "2", name: "Local Pickup", description: "Free shipping", price: 0 },
  { id: "3", name: "Flat Rate", description: "Fixed rate shipping", price: 20 },
]

const coupons: CouponCode[] = [
  {
    code: "SAVE80",
    discount: "80%",
    description: "Discount 80% for all orders",
  },
  {
    code: "FLAT500",
    discount: "₹500",
    description: "Flat ₹500 off on all orders",
  },
]

function AddressShipping({ cartItems }) {
  console.log(cartItems, "cart Item")
  const [isNewAddress, setIsNewAddress] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<string>("")
  const [selectedShipping, setSelectedShipping] = useState<string>("1")
  const [selectedPayment, setSelectedPayment] = useState<string>("")
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [upiIntent, setUpiIntent] = useState(null)
  const [isloading, setIsLoading] = useState(false)
  const [reference, setReference] = useState("")
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(0)
  const [startTimer, setStartTimer] = useState(false)
  const [pinCode, setPinCode] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})
  const [showLoginModal, setShowLoginModal] = useState(false);
  const token = "zsdfgyxchh"

  const [userdata, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    address: "",
  })

  const subtotal = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = shippingMethods.find((m) => m.id === selectedShipping)?.price || 0
  const total = subtotal + shipping

  // Validation functions
  const validateField = (fieldName: string, value: string) => {
    let error = ''

    switch (fieldName) {
      case 'name':
        if (!value.trim()) error = 'Full name is required'
        else if (value.length < 3) error = 'Name must be at least 3 characters'
        break

      case 'email':
        if (!value.trim()) error = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email'
        break

      case 'phone':
        if (!value.trim()) error = 'Phone number is required'
        else if (!/^\d{10}$/.test(value)) error = 'Phone must be 10 digits'
        break

      case 'pinCode':
        if (!value.trim()) error = 'PIN code is required'
        else if (!/^\d{6}$/.test(value)) error = 'PIN code must be 6 digits'
        break

      case 'address':
        if (!value.trim()) error = 'Address is required'
        else if (value.length < 10) error = 'Address must be at least 10 characters'
        break
    }

    setErrors(prev => ({ ...prev, [fieldName]: error }))
    return !error
  }

  const validateForm = () => {
    const fieldsToValidate = isNewAddress ?
      ['name', 'email', 'phone', 'pinCode', 'address'] :
      ['email', 'phone'] // Basic validation if not new address

    const validationResults = fieldsToValidate.map(field => {
      const value = field === 'pinCode' ? pinCode : userdata[field]
      return validateField(field, value)
    })

    return validationResults.every(valid => valid)
  }

  const handleBlur = (fieldName: string) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }))
    const value = fieldName === 'pinCode' ? pinCode : userdata[fieldName]
    validateField(fieldName, value)
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setIsNewAddress(value === "new")
    setSelectedAddress(value)
    // Reset errors when changing address type
    if (value !== "new") {
      setErrors({})
    }
  }

  const generateReferenceNumber = () => {
    const timestamp = Date.now()
    const randomNum = Math.floor(Math.random() * 10000)
    return `${timestamp}${randomNum}`
  }

  const handlePayment = async () => {

    const isUserLoggedIn = !!localStorage.getItem("token");

    if (!isUserLoggedIn) {
      navigate(location.pathname, {
        state: { from: '/address' },
      });
      setShowLoginModal(true);
      // Trigger login modal
      return;
    }
    if (!validateForm()) {
      // Mark all fields as touched to show errors
      const allFields = isNewAddress ?
        ['name', 'email', 'phone', 'pinCode', 'address'] :
        ['email', 'phone']
      setTouchedFields(allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}))
      return
    }

    setIsLoading(true)
    const newRef = generateReferenceNumber()
    setReference(newRef)

    try {
      const gatewayConfigs = {
        upi1: {
          apiUrl: "https://api.worldpayme.com/",
          payload: {
            amount: total.toString(),
            reference: newRef,
            name: userdata.name,
            mobile: userdata.phone,
            email: userdata.email,
            userId: "67b6f05e6",
            myip: "666666",
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          extractIntent: (res) => res.data?.data?.upiIntent,
        },
        upi2: {
          apiUrl: "https://api.worldpayme.com/",
          payload: {
            amount: total.toString(),
            reference: newRef,
            name: userdata.name,
            mobile: userdata.phone,
            email: userdata.email,
            userId: "67b6f05e",
            myip: "666666",
          },
          headers: {
            Authorization: `Bearer -xebvWE39ZySDpB9DjLtQ4jxjQbyer6I`,
            "Content-Type": "application/json",
          },
          extractIntent: (res) => res.data?.data?.upiIntent || res.data?.upiUrl,
        },
      }

      if (!selectedPayment) {
        alert("Please select a payment method.")
        setIsLoading(false)
        return
      }

      const config = gatewayConfigs[selectedPayment]
      if (!config) throw new Error("Unsupported payment method")

      const response = await axios.post(config.apiUrl, config.payload, {
        headers: config.headers,
      })

      const rawLink = config.extractIntent(response)
      const cleanedLink = rawLink.replace(/\\/g, "")
      console.log("cleanedLink", rawLink)
      setUpiIntent(cleanedLink)
      setTimeLeft(240)
      setStartTimer(true)
    } catch (error) {
      console.error("Payment Error:", error)
      alert("Payment initiation failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleonChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))

    // Validate field if it's been touched before
    if (touchedFields[name]) {
      validateField(name, value)
    }
  }

  const handlePinCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6)
    setPinCode(val)

    // Validate if touched
    if (touchedFields.pinCode) {
      validateField('pinCode', val)
    }
  }

  useEffect(() => {
    if (pinCode.length === 6) {
      fetchLocation(pinCode)
    }
  }, [pinCode])

  const fetchLocation = async (pin: string) => {
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pin}`)
      console.log("API Response:", response.data)
      if (response.data[0].Status === "Success") {
        const location = response.data[0].PostOffice[0]
        setState(location.State)
        setCity(location.District)
        setUserData(prev => ({
          ...prev,
          state: location.State,
          city: location.District
        }))
      } else {
        setState("")
        setCity("")
        setUserData(prev => ({
          ...prev,
          state: "",
          city: ""
        }))
        console.warn("Invalid PIN code")
      }
    } catch (error) {
      console.error("Error fetching location:", error)
    }
  }

  // Payment status check effect (unchanged from your original code)
  let totalTime = 0
  useEffect(() => {
    if (!reference) return
    const maxDuration = 4 * 60 * 1000
    const intervalTime = 15000
    const interval = setInterval(async () => {
      totalTime += intervalTime
      try {
        setIsLoading(true)
        const response = await axios.get(
          `https://api.worldpayme.com/api/v1.1/payinTransactionCheckStatus/${reference}`,
          {
            headers: {
              Authorization: `Bearer ${selectedPayment === "upi1"
                ? token
                : "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4IiwianRpIjoiNzE1ZDJlODJiZTYxYzdiYjk1YzZhNDA0ZTdlYTNiZDRjOTNkYWRmNWEzYmJiYmExYmFhNTI2ZGIxNzVkNjhhNmI1YmZjZWU3N2ZmMTgwMDkiLCJpYXQiOjE3NDg1MTgwNTYuMjcyNDQyLCJuYmYiOjE3NDg1MTgwNTYuMjcyNDQ0LCJleHAiOjE3ODAwNTQwNTYuMjY5OTk3LCJzdWIiOiIzMDMiLCJzY29wZXMiOltdfQ.ElJzC40DRfPxMCJn8hKPJwOQqinyzK2yRONmLIky4IElGAeDJzghUbiBQg6uVIe0qMnQZCTY66trEbVh25TJZYpWv_rEyP4LYMhFNtyHOyEothKg-RAWt99y4baqf10wp5Mfl1YdUI3lQaYHKYF1B0y8gJFtLghvj8nxsWdi5a_V7TfkzcGGWy5HtqZnaYyDWxJCSIjm41E2mfJVoDrGz5_DMHCQq50JHN8rJwlx4R6pH4uD-D-xoYZsTgdg94ogkuuyWRpNpHTPx6ku9D6AVqO4gz8pGysphatUaIUeAHciNDNVW_hU3ReHMXUc6GsySmPjoogmRZJqtrtv432N4dhVZYZM8uPH8LmI437xsiT8Pwh8eigfJeiizElf0_sMgeNL7wwfkfsIkjWiNQlai9l0tgXpkSh_B4WHwbGMlhjN-xebvWE3NmiUu8Ut9m-aHyL-TCLX_hbkGepgEBilGiyqPzbpP9oNPXO7t3Js4MxAaFQjP4M2hHyHfxMPUUCbUEboS2cdL9uQpag_X9Z7w9cQMTaC6bFjv-RuAJhwGvSMHvs3paOZqdZxRd4bwybXUyCIisqdG1FHoFgPoz5tA5bYZ8CpILbYGuxPHeCpN51c0_QhOfGcEUT5st7PUadqwiQG1WJBOQ6XHquUNAt9ZySDpB9DjLtQ4jxjQbyer6I"
                }`,
              "Content-Type": "application/json",
            },
          },
        )
        console.log("responseeeeeeeeee", response.data)
        const { data } = response.data
        const txnStatus = data?.status || "Unknown"
        if (txnStatus === "Success" || txnStatus === "Failed") {
          clearInterval(interval)
          navigate(`/resultPage?status=${txnStatus}&txnId=${data.transactionNo}`)
        } else if (totalTime >= maxDuration) {
          clearInterval(interval)
          navigate(`/resultPage?status=timeout&txnId=${reference}`)
        }
      } catch (error) {
        console.error("Error fetching payout status:", error)
        clearInterval(interval)
      } finally {
        setIsLoading(false)
      }
    }, intervalTime)
    return () => clearInterval(interval)
  }, [reference])

  useEffect(() => {
    if (!startTimer || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [startTimer, timeLeft])

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")
    const sec = (seconds % 60).toString().padStart(2, "0")
    return `${min}:${sec}`
  }

  return (
    <>
     <div className="min-h-screen bg-[#F8FAFC]">
  <div className="container mx-auto px-4 py-8 max-w-7xl">
    {/* Progress Indicator */}
    <div className="flex justify-center mb-12">
      <div className="flex items-center w-full max-w-2xl">
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedAddress ? 'bg-[#A13C78] text-white' : 'bg-white border-2 border-[#A13C78] text-[#A13C78]'}`}>
            {selectedAddress ? <Check className="w-5 h-5" /> : <span>1</span>}
          </div>
          <span className={`text-sm mt-2 ${selectedAddress ? 'text-[#A13C78] font-medium' : 'text-gray-500'}`}>Shipping</span>
        </div>
        <div className={`h-1 flex-1 mx-2 ${selectedAddress ? 'bg-[#A13C78]' : 'bg-gray-200'}`}></div>
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedPayment ? 'bg-[#A13C78] text-white' : selectedAddress ? 'bg-white border-2 border-[#A13C78] text-[#A13C78]' : 'bg-gray-100 border-2 border-gray-300 text-gray-400'}`}>
            {selectedPayment ? <Check className="w-5 h-5" /> : <span>2</span>}
          </div>
          <span className={`text-sm mt-2 ${selectedPayment ? 'text-[#A13C78] font-medium' : selectedAddress ? 'text-gray-600' : 'text-gray-400'}`}>Payment</span>
        </div>
        <div className={`h-1 flex-1 mx-2 ${selectedPayment ? 'bg-[#A13C78]' : 'bg-gray-200'}`}></div>
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${upiIntent ? 'bg-[#A13C78] text-white' : selectedPayment ? 'bg-white border-2 border-[#A13C78] text-[#A13C78]' : 'bg-gray-100 border-2 border-gray-300 text-gray-400'}`}>
            {upiIntent ? <Check className="w-5 h-5" /> : <span>3</span>}
          </div>
          <span className={`text-sm mt-2 ${upiIntent ? 'text-[#A13C78] font-medium' : selectedPayment ? 'text-gray-600' : 'text-gray-400'}`}>Complete</span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Order Details */}
      <div className="lg:col-span-2 space-y-6">
        {/* Shipping Information Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E9F0] p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#1B2E4F]">Shipping Information</h2>
            {selectedAddress && selectedAddress !== "new" && (
              <button 
                onClick={() => setSelectedAddress("new")}
                className="text-sm font-medium text-[#A13C78] hover:text-[#872D67] flex items-center gap-1"
              >
                <Edit className="w-4 h-4" />
                Change
              </button>
            )}
          </div>
          
          {/* Address Selection */}
          {!selectedAddress && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#2A4172] mb-3">
                Select Address
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none rounded-xl border border-[#E5E9F0] bg-white px-5 py-3.5 text-[#2A4172] shadow-sm transition focus:border-[#A13C78] focus:outline-none focus:ring-2 focus:ring-[#A13C78]/30"
                  value={selectedAddress}
                  onChange={handleAddressChange}
                >
                  <option value="">Select Address</option>
                  <option value="new">Add new address...</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#A13C78]">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* New Address Form */}
          {isNewAddress && (
            <div className="space-y-6">
              {/* Error summary */}
              {Object.values(errors).some(error => error) && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Please fix the following errors:</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <ul className="list-disc pl-5 space-y-1">
                          {errors.name && <li>{errors.name}</li>}
                          {errors.email && <li>{errors.email}</li>}
                          {errors.phone && <li>{errors.phone}</li>}
                          {errors.pinCode && <li>{errors.pinCode}</li>}
                          {errors.address && <li>{errors.address}</li>}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#2A4172] mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    className={`w-full rounded-xl border bg-white shadow-sm transition-all ${errors.name ? 'border-red-500' : 'border-[#E5E9F0]'} px-4 py-3 focus:ring-2 focus:ring-[#A13C78]/30 focus:border-[#A13C78]`}
                    value={userdata.name}
                    onChange={handleonChange}
                    onBlur={() => handleBlur('name')}
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="mt-2 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2A4172] mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    className={`w-full rounded-xl border bg-white shadow-sm transition-all ${errors.phone ? 'border-red-500' : 'border-[#E5E9F0]'} px-4 py-3 focus:ring-2 focus:ring-[#A13C78]/30 focus:border-[#A13C78]`}
                    value={userdata.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 10)
                      handleonChange({ target: { name: 'phone', value: val } })
                      if (touchedFields.phone) validateField('phone', val)
                    }}
                    onBlur={() => handleBlur('phone')}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && <p className="mt-2 text-xs text-red-500">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2A4172] mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  className={`w-full rounded-xl border bg-white shadow-sm transition-all ${errors.email ? 'border-red-500' : 'border-[#E5E9F0]'} px-4 py-3 focus:ring-2 focus:ring-[#A13C78]/30 focus:border-[#A13C78]`}
                  value={userdata.email}
                  onChange={handleonChange}
                  onBlur={() => handleBlur('email')}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#2A4172] mb-2">PIN Code *</label>
                  <input
                    type="text"
                    className={`w-full rounded-xl border bg-white shadow-sm transition-all ${errors.pinCode ? 'border-red-500' : 'border-[#E5E9F0]'} px-4 py-3 focus:ring-2 focus:ring-[#A13C78]/30 focus:border-[#A13C78]`}
                    value={pinCode}
                    onChange={handlePinCodeChange}
                    onBlur={() => handleBlur('pinCode')}
                    placeholder="Enter PIN code"
                  />
                  {errors.pinCode && <p className="mt-2 text-xs text-red-500">{errors.pinCode}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2A4172] mb-2">State</label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-[#E5E9F0] px-4 py-3 bg-[#F8FAFC] text-[#5E6E8C]"
                    value={state}
                    readOnly
                    placeholder="Auto-filled"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2A4172] mb-2">City</label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-[#E5E9F0] px-4 py-3 bg-[#F8FAFC] text-[#5E6E8C]"
                    value={city}
                    readOnly
                    placeholder="Auto-filled"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2A4172] mb-2">Address *</label>
                <textarea
                  name="address"
                  className={`w-full rounded-xl border bg-white shadow-sm transition-all ${errors.address ? 'border-red-500' : 'border-[#E5E9F0]'} px-4 py-3 focus:ring-2 focus:ring-[#A13C78]/30 focus:border-[#A13C78]`}
                  rows={3}
                  value={userdata.address}
                  onChange={handleonChange}
                  onBlur={() => handleBlur('address')}
                  placeholder="Enter complete address (House no, Building, Street, Area)"
                />
                {errors.address && <p className="mt-2 text-xs text-red-500">{errors.address}</p>}
              </div>
            </div>
          )}

          {/* Selected Address Display */}
          {selectedAddress && selectedAddress !== "new" && (
            <div className="p-6 border border-[#E5E9F0] rounded-xl bg-[#F8FAFC]">
              {addresses
                .filter((addr) => addr.id === selectedAddress)
                .map((address) => (
                  <div key={address.id} className="space-y-2">
                    <h3 className="font-semibold text-lg text-[#1B2E4F]">{address.name}</h3>
                    <p className="text-[#2A4172]">{address.address}</p>
                    <p className="text-[#2A4172]">
                      <span className="font-medium">Phone:</span> {address.phone}
                    </p>
                    <p className="text-[#2A4172]">
                      <span className="font-medium">Email:</span> {address.email}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Shipping Method Card */}
        {selectedAddress && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E9F0] p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#1B2E4F]">Shipping Method</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shippingMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-start gap-4 p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer 
                    ${selectedShipping === method.id
                      ? "border-[#A13C78] bg-[#FDF2F8]"
                      : "border-[#E5E9F0] hover:border-[#A13C78]/50"
                    }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value={method.id}
                    checked={selectedShipping === method.id}
                    onChange={(e) => setSelectedShipping(e.target.value)}
                    className="h-5 w-5 shrink-0 mt-0.5 text-[#A13C78] focus:ring-[#A13C78]"
                  />
                  <div className="flex-1">
                    <span className="block text-lg font-semibold text-[#1B2E4F]">
                      {method.name} {method.price > 0 && <span className="text-[#5E6E8C]">– ₹{method.price}</span>}
                    </span>
                    <p className="text-sm text-[#5E6E8C] mt-1.5">{method.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Payment Method Card */}
        {selectedShipping && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E9F0] p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#1B2E4F]">Payment Method</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <label
                className={`flex items-start gap-4 p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer 
                  ${selectedPayment === "upi1"
                    ? "border-[#A13C78] bg-[#FDF2F8]"
                    : "border-[#E5E9F0] hover:border-[#A13C78]/50"
                  }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="upi1"
                  checked={selectedPayment === "upi1"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="h-5 w-5 shrink-0 mt-0.5 text-[#A13C78] focus:ring-[#A13C78]"
                />
                <div className="flex-1">
                  <span className="block text-lg font-semibold text-[#1B2E4F]">UPI Gateway 1</span>
                  <p className="text-sm text-[#5E6E8C] mt-1.5">Pay using UPI Gateway 1</p>
                </div>
              </label>
              <label
                className={`flex items-start gap-4 p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer 
                  ${selectedPayment === "upi2"
                    ? "border-[#A13C78] bg-[#FDF2F8]"
                    : "border-[#E5E9F0] hover:border-[#A13C78]/50"
                  }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="upi2"
                  checked={selectedPayment === "upi2"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="h-5 w-5 shrink-0 mt-0.5 text-[#A13C78] focus:ring-[#A13C78]"
                />
                <div className="flex-1">
                  <span className="block text-lg font-semibold text-[#1B2E4F]">UPI Gateway 2</span>
                  <p className="text-sm text-[#5E6E8C] mt-1.5">Pay using UPI Gateway 2</p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Order Notes Card */}
        {selectedPayment && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E9F0] p-8">
            <label className="block text-sm font-semibold text-[#2A4172] mb-3">
              Order Notes <span className="text-[#5E6E8C]">(Optional)</span>
            </label>
            <textarea
              className="w-full rounded-xl border border-[#E5E9F0] bg-white px-4 py-3 text-[#2A4172] shadow-sm transition-all duration-200 ease-in-out focus:border-[#A13C78] focus:outline-none focus:ring-2 focus:ring-[#A13C78]/30 placeholder:text-[#5E6E8C]"
              rows={4}
              placeholder="Notes about your order, e.g. special instructions for delivery"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-6 border-t border-[#E5E9F0]">
          <Link
            to="/cart"
            className="flex items-center gap-2 text-sm font-medium text-[#2A4172] hover:text-[#A13C78] transition px-4 py-2.5 rounded-lg hover:bg-[#F8FAFC]"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          {total === 0 ? (
            <p className="text-sm text-[#5E6E8C] font-medium">Your Cart Is Empty - Please Add Something</p>
          ) : (
            <button
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#A13C78] to-[#C1467F] text-white text-sm font-semibold px-8 py-3.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:from-[#872D67] hover:to-[#A13C78]"
              onClick={handlePayment}
              disabled={isloading || (isNewAddress && Object.values(errors).some(error => error))}
            >
              {isloading ? (
                <DotLottieReact
                  src="https://lottie.host/faaf7fb5-6078-4f3e-9f15-05b0964cdb4f/XCcsBA5RNq.lottie"
                  loop
                  autoplay
                  style={{ width: 24, height: 24 }}
                />
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Place Order
                </>
              )}
            </button>
          )}
        </div>

        {/* QR Code Section */}
        {upiIntent && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E9F0] p-8 text-center mt-6">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-bold mb-3 text-[#1B2E4F]">Complete Your Payment</h3>
              <p className="text-[#5E6E8C] mb-6">Scan this QR code with any UPI app to complete your payment</p>
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white border-2 border-[#E5E9F0] rounded-lg">
                  <QRCode value={upiIntent} size={200} />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-[#A13C78]" />
                <span className="text-lg font-semibold text-[#A13C78]">
                  Time remaining: {formatTime(timeLeft)}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-4 bg-[#F8FAFC] rounded-lg">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-[#A13C78]" />
                  <p className="text-sm font-medium text-[#1B2E4F]">Secure</p>
                </div>
                <div className="text-center p-4 bg-[#F8FAFC] rounded-lg">
                  <CreditCard className="w-6 h-6 mx-auto mb-2 text-[#A13C78]" />
                  <p className="text-sm font-medium text-[#1B2E4F]">UPI Payment</p>
                </div>
                <div className="text-center p-4 bg-[#F8FAFC] rounded-lg">
                  <Check className="w-6 h-6 mx-auto mb-2 text-[#A13C78]" />
                  <p className="text-sm font-medium text-[#1B2E4F]">Instant</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-lg border border-[#E5E9F0] p-6 sticky top-6">
          <h2 className="text-2xl font-semibold mb-6 text-[#A13C78]">Order Summary</h2>

          {/* Order Items */}
          <div className="space-y-5 mb-8 max-h-[300px] overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 justify-between border-b border-[#E5E9F0] pb-4">
                <div className="relative">
                  <img
                    src={`http://api.jajamblockprints.com/${item?.image}`}
                    alt={item?.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <span className="absolute -top-2 -right-2 bg-[#A13C78] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {item?.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[#1B2E4F] text-base">{item?.name}</h4>
                  <p className="font-semibold text-[#A13C78] text-sm text-end">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="pt-4 space-y-4">
            <div className="flex justify-between text-sm text-[#2A4172]">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-[#2A4172]">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#1B2E4F] pt-4 border-t border-[#E5E9F0]">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        >
          <Login1 />
        </LoginModal>
      )}
    </>
  )
}

export default AddressShipping