"use client"

import { useEffect, useState } from "react"
import { User, Mail, Phone, MapPin, FilePenLine, Package, Loader2 } from "lucide-react"
import OrderPage from "../userOrder/OrderPage"

const colors = {
  primary: '#384D89',
  primaryDark: '#2A4172',
  primaryDarker: '#1B2E4F',
  primaryDarkest: '#14263F',
  secondary: '#A13C78',
  secondaryDark: '#872D67',
  secondaryDarker: '#681853',
  accent: '#C1467F'
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile'); 
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
  })
  const [initialProfile, setInitialProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
  })
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for name fields (letters only)
    if (name === "firstName" || name === "lastName") {
      if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
        setProfile((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
      return;
    }

    // Special handling for mobile (numbers only)
    if (name === "mobile") {
      if (/^[0-9]*$/.test(value) || value === "") {
        setProfile((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
      return;
    }

    // Default handling for other fields
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleMobileChange = (e) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return;
    const trimmedValue = value.slice(0, 10);
    setProfile((prev) => ({
      ...prev,
      mobile: trimmedValue,
    }));
    if (trimmedValue.length > 0) {
      if (!/^[6-9]/.test(trimmedValue)) {
        setErrors((prev) => ({
          ...prev,
          mobile: "Mobile must start with 6, 7, 8, or 9",
        }));
      } else if (trimmedValue.length < 10) {
        setErrors((prev) => ({
          ...prev,
          mobile: "Mobile must be 10 digits",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          mobile: "",
        }));
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        mobile: "",
      }));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchProfile = async () => {
      setIsFetching(true)
      try {
        const response = await fetch(`${baseUrl}/auth/userInfo`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const userProfile = data?.user || {
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          address: "",
        }
        setProfile(userProfile)
        setInitialProfile(userProfile)
      } catch (err) {
        console.error("Error fetching user info:", err)
        setErrors({ submit: "Failed to load profile data." })
      } finally {
        setIsFetching(false)
      }
    }
    fetchProfile()
  }, [baseUrl])

  const validateForm = () => {
    const newErrors = {};
    if (!profile.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(profile.firstName)) {
      newErrors.firstName = "Only letters are allowed";
    }

    if (!profile.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(profile.lastName)) {
      newErrors.lastName = "Only letters are allowed";
    }

    if (!profile.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(profile.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!profile.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(profile.mobile)) {
      newErrors.mobile =
        "Invalid mobile number (must start with 6-9 and be 10 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!validateForm()) return;

    setIsLoading(true);
    setSuccessMessage("");
    setErrors({});

    try {
      const response = await fetch(`${baseUrl}/auth/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          mobile: profile.mobile,
          address: profile.address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to update profile");
      }

      setSuccessMessage("Profile updated successfully!");
      setInitialProfile(profile);
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Update error:", error);
      setErrors({
        submit: error.message || "Failed to update profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setIsEditing(false);
    setErrors({});
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
  <div className="w-full mx-auto p-4 md:p-8">
      <header className="flex items-center gap-4 mb-8">
        <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <img
            src={`/placeholder.svg?height=80&width=80&query=${profile.firstName}+${profile.lastName}`}
            alt={`${profile.firstName} ${profile.lastName}`}
            className="h-full w-full object-cover"
          />
          {(!profile.firstName && !profile.lastName) && (
            <span className="text-xl font-medium text-gray-600">
              {profile.firstName?.[0]}
              {profile.lastName?.[0]}
            </span>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold" style={{ color: colors.primaryDarker }}>
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-gray-500">Manage your account information and view your order history.</p>
        </div>
      </header>

      <div className="w-full">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center py-2 px-4 border-b-2 font-medium text-sm ${activeTab === 'profile' ? `border-[${colors.primary}] text-[${colors.primary}]` : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            style={activeTab === 'profile' ? { borderColor: colors.primary, color: colors.primary } : {}}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center py-2 px-4 border-b-2 font-medium text-sm ${activeTab === 'orders' ? `border-[${colors.primary}] text-[${colors.primary}]` : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            style={activeTab === 'orders' ? { borderColor: colors.primary, color: colors.primary } : {}}
          >
            <Package className="mr-2 h-4 w-4" />
            Orders
          </button>
        </div>
        
        <div className={activeTab === 'profile' ? 'block' : 'hidden'}>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <form onSubmit={handleSubmit}>
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold" style={{ color: colors.primaryDarker }}>Personal Information</h2>
                    <p className="text-gray-500">
                      {isEditing ? "Update your profile details below." : "View your profile details."}
                    </p>
                  </div>
                  {!isEditing && (
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      style={{ backgroundColor: colors.primary }}
                      onClick={() => setIsEditing(true)}
                    >
                      <FilePenLine className="mr-2 h-4 w-4" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
              <div className="p-6 space-y-6">
                {successMessage && (
                  <div className="rounded-md p-4 border" style={{ backgroundColor: '#F0FAF0', borderColor: '#C6F6D5' }}>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="#38A169">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium" style={{ color: '#276749' }}>Success</h3>
                        <div className="mt-2 text-sm" style={{ color: '#276749' }}>
                          <p>{successMessage}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {errors.submit && (
                  <div className="rounded-md p-4 border" style={{ backgroundColor: '#FEF2F2', borderColor: '#FECACA' }}>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="#E53E3E">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium" style={{ color: '#9B2C2C' }}>Error</h3>
                        <div className="mt-2 text-sm" style={{ color: '#9B2C2C' }}>
                          <p>{errors.submit}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="block text-sm font-medium" style={{ color: colors.primaryDarker }}>First Name</label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={profile.firstName}
                        onChange={handleChange}
                        className={`block w-full h-10 px-2 rounded-md border shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm ${errors.firstName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#384D89] focus:ring-[#384D89]'}`}
                      />
                      {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-medium" style={{ color: colors.primaryDarker }}>Last Name</label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={profile.lastName}
                        onChange={handleChange}
                        className={`block w-full h-10 px-2 rounded-md border shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm ${errors.lastName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#384D89] focus:ring-[#384D89]'}`}
                      />
                      {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium" style={{ color: colors.primaryDarker }}>Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleChange}
                        className={`block w-full h-10 px-2 rounded-md border shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#384D89] focus:ring-[#384D89]'}`}
                      />
                      {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="mobile" className="block text-sm font-medium" style={{ color: colors.primaryDarker }}>Mobile</label>
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        value={profile.mobile}
                        onChange={handleMobileChange}
                        maxLength={10}
                        className={`block w-full h-10 px-2 rounded-md border shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm ${errors.mobile ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#384D89] focus:ring-[#384D89]'}`}
                      />
                      {errors.mobile && <p className="text-sm text-red-600">{errors.mobile}</p>}
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium" style={{ color: colors.primaryDarker }}>Address</label>
                      <textarea
                        id="address"
                        name="address"
                        rows={3}
                        value={profile.address}
                        onChange={handleChange}
                        className={`block w-full h-20 px-2 rounded-md border shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm ${errors.address ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#384D89] focus:ring-[#384D89]'}`}
                      />
                      {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    <InfoItem icon={User} label="Full Name" value={`${profile.firstName} ${profile.lastName}`} primaryColor={colors.primaryDarker} />
                    <InfoItem icon={Mail} label="Email Address" value={profile.email} primaryColor={colors.primaryDarker} />
                    <InfoItem icon={Phone} label="Mobile Number" value={profile.mobile} primaryColor={colors.primaryDarker} />
                    <InfoItem icon={MapPin} label="Address" value={profile.address || "Not provided"} primaryColor={colors.primaryDarker} />
                  </div>
                )}
              </div>
              {isEditing && (
                <div className="px-6 py-3 bg-gray-50 text-right border-t border-gray-200">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      style={{ borderColor: colors.primary, color: colors.primary, focusRingColor: colors.primary }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed"
                      style={{ backgroundColor: colors.primary, hoverBackgroundColor: colors.primaryDark, focusRingColor: colors.primary }}
                    >
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        
        <div className={activeTab === 'orders' ? 'block' : 'hidden'}>
          <OrderPage />
        </div>
      </div>
    </div>
  )
}

function InfoItem({ icon: Icon, label, value, primaryColor }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-5 w-5 mt-0.5" style={{ color: primaryColor }} />
      <div>
        <p className="font-medium" style={{ color: primaryColor }}>{label}</p>
        <p className="text-gray-500">{value}</p>
      </div>
    </div>
  )
}