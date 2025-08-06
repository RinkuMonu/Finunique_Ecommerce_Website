"use client"

import { useEffect, useState } from "react"
import { User, Mail, Phone, MapPin, FilePenLine, Package, Loader2 } from "lucide-react"
import OrderPage from "../userOrder/OrderPage"

const colors = {
  primary: '#4f46e5',
  primaryLight: '#6366f1',
  primaryDark: '#4338ca',
  secondary: '#ec4899',
  secondaryDark: '#db2777',
  accent: '#f43f5e',
  gray: '#6b7280',
  lightGray: '#f3f4f6',
  darkGray: '#374151'
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
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col items-center">
              <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 mb-4 overflow-hidden">
                {profile.firstName || profile.lastName ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-3xl font-medium text-indigo-600">
                      {profile.firstName?.[0]}
                      {profile.lastName?.[0]}
                    </span>
                  </div>
                ) : (
                  <div className="h-full w-full bg-gray-200"></div>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900 text-center">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-sm text-gray-500 text-center">{profile.email}</p>
            </div>

            <nav className="mt-8 space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <User className="w-5 h-5 mr-3" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Package className="w-5 h-5 mr-3" />
                Orders
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'profile' ? (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {isEditing ? "Update your profile details" : "View your profile details"}
                  </p>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FilePenLine className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="p-6">
                {successMessage && (
                  <div className="mb-6 rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">{successMessage}</p>
                      </div>
                    </div>
                  </div>
                )}

                {errors.submit && (
                  <div className="mb-6 rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800">{errors.submit}</p>
                      </div>
                    </div>
                  </div>
                )}

                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={profile.firstName}
                            onChange={handleChange}
                            className={`block w-full p-2 rounded-md shadow-sm ${errors.firstName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} sm:text-sm`}
                          />
                          {errors.firstName && <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={profile.lastName}
                            onChange={handleChange}
                            className={`block w-full p-2 rounded-md shadow-sm ${errors.lastName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} sm:text-sm`}
                          />
                          {errors.lastName && <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={profile.email}
                            onChange={handleChange}
                            className={`block w-full p-2 rounded-md shadow-sm ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} sm:text-sm`}
                          />
                          {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                          Mobile number
                        </label>
                        <div className="mt-1">
                          <input
                            id="mobile"
                            name="mobile"
                            type="tel"
                            value={profile.mobile}
                            onChange={handleMobileChange}
                            maxLength={10}
                            className={`block w-full p-2 rounded-md shadow-sm ${errors.mobile ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} sm:text-sm`}
                          />
                          {errors.mobile && <p className="mt-2 text-sm text-red-600">{errors.mobile}</p>}
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                          Address
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="address"
                            name="address"
                            rows={3}
                            value={profile.address}
                            onChange={handleChange}
                            className={`block w-full p-2 rounded-md shadow-sm ${errors.address ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} sm:text-sm`}
                          />
                          {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
                      >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
                      <InfoItem icon={User} label="Full Name" value={`${profile.firstName} ${profile.lastName}`} />
                      <InfoItem icon={Mail} label="Email Address" value={profile.email} />
                      <InfoItem icon={Phone} label="Mobile Number" value={profile.mobile} />
                      <InfoItem icon={MapPin} label="Address" value={profile.address || "Not provided"} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <OrderPage />
          )}
        </div>
      </div>
    </div>
  )
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
        <Icon className="h-5 w-5 text-indigo-600" />
      </div>
      <div className="ml-4">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900">{value}</dd>
      </div>
    </div>
  )
}