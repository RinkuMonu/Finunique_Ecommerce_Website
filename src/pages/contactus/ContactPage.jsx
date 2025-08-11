import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What are your business hours?",
      answer:
        "Our customer support team is available Monday to Friday from 9:00 AM to 6:00 PM IST.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you'll receive a tracking number via email that you can use to track your package.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards, UPI payments, net banking, and cash on delivery (for select locations).",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 10-day return policy for most products. Please refer to our Returns & Refunds policy for details.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach us via email at info@digihubtech.in. or call us at 01414511098 during business hours.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Prevent invalid characters based on field type
    if (name === "name") {
      if (/[^a-zA-Z\s]/.test(value)) return;
    } else if (name === "email") {
      if (/[^\w@.-]/.test(value)) return;
    } else if (name === "phone") {
      if (/[^0-9]/.test(value)) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate on change
    if (name === "name") {
      if (!value.trim()) {
        setErrors((prev) => ({
          ...prev,
          name: "Name is required",
        }));
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          name: "Name should contain only letters",
        }));
      } else {
        setErrors((prev) => ({ ...prev, name: "" }));
      }
    } else if (name === "email") {
      if (!value.trim()) {
        setErrors((prev) => ({ ...prev, email: "Email is required" }));
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    } else if (name === "phone") {
      if (!value.trim()) {
        setErrors((prev) => ({ ...prev, phone: "Phone is required" }));
      } else if (!/^[0-9]+$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          phone: "Phone should contain only numbers",
        }));
      } else {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation before submit
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "Phone is required";
      isValid = false;
    } else if (!/^[0-9]*$/.test(formData.phone)) {
      newErrors.phone = "Phone should contain only numbers";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    setLoading(true);
  
    const postData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      service: "N/A",
      website_id: 10,
    };
  
    try {
      const response = await axios.post(
        "https://cms.sevenunique.com/apis/contact-query/set-contact-details.php",
        postData,
        {
          headers: {
            Authorization: "Bearer jibhfiugh84t3324fefei#*fef",
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Response:", response.data);
  
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your message has been sent successfully.",
        confirmButtonColor: "#ffb300",
      });
  
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
  
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to send message. Please try again later.",
        confirmButtonColor: "#ffb300",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-white">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-[#1B2E4F]" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-white lg:pr-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Get In Touch
              </h1>
              <p className="text-base sm:text-lg text-[#e9c1d9] mb-8 sm:mb-12">
                Feel free to contact us? submit your queries here and we will
                get back to you as soon as possibleee.
              </p>
              <div className="space-y-4 sm:mt-12 lg:mt-56  text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-2 rounded-full">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                  </div>
                  <a href="tel:01414511098" className="hover:underline text-sm sm:text-base">
                    0141-4511098
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-2 rounded-full">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                  </div>
                  <a href="mailto:info@digihubtech.in." className="hover:underline text-sm sm:text-base">
                    info@digihubtech.in.
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-2 rounded-full">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                  </div>
                  <span className="text-sm sm:text-base">
                    PLOT NO 97, DAKSHINPURI-I, SHRIKISHANPURA, SANGANER,
                    Jagatpura, Jaipur, Jaipur- 302017,Rajasthan
                  </span>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4 mt-8 sm:mt-12">
                <a
                  href="#"
                  className="bg-[#1877F2] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="#"
                  className="bg-gradient-to-r from-[#A13C78] to-[#C1467F] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="#"
                  className="bg-black text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="#"
                  className="bg-[#0A66C2] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="#"
                  className="bg-[#FF0000] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>
            <div className="lg:pt-16">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl border-0 p-4 sm:p-6">
                <div className="mb-3 sm:mb-3">
                  <h2 className="text-[20px] sm:text-[20px] font-bold text-[#384D89]">
                    Send Us Message
                  </h2>
                </div>
                <div>
                  <form className="space-y-6 sm:space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-gray-50 border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } rounded-lg h-10 sm:h-12 px-4 text-sm sm:text-base`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-gray-50 border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-lg h-10 sm:h-12 px-4 text-sm sm:text-base`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={10}
                        className={`w-full bg-gray-50 border ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        } rounded-lg h-10 sm:h-12 px-4 text-sm sm:text-base`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <textarea
                        name="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg min-h-[100px] sm:min-h-[120px] p-3 sm:p-4 text-sm sm:text-base"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full bg-[#A13C78] hover:bg-[#872D67] text-white font-bold py-2 sm:py-3 rounded-lg text-sm sm:text-lg transition-colors ${
                        loading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? "Sending..." : "Submit"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
          Frequently Asked Questions
        </h2>
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl border-0 overflow-hidden">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                className="w-full flex justify-between items-center p-4 sm:p-6 text-left"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-base sm:text-lg font-medium text-[#384D89]">
                  {faq.question}
                </h3>
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#A13C78]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#A13C78]" />
                )}
              </button>
              <div
                className={`px-4 sm:px-6 pb-4 sm:pb-6 pt-0 transition-all duration-300 ${
                  activeIndex === index ? "block" : "hidden"
                }`}
              >
                <p className="text-sm sm:text-base text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContactPage;