import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate on change
    if (name === 'name') {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setErrors(prev => ({ ...prev, name: 'Name should contain only letters' }));
      } else {
        setErrors(prev => ({ ...prev, name: '' }));
      }
    } else if (name === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    } else if (name === 'phone') {
      if (!/^[0-9]*$/.test(value)) {
        setErrors(prev => ({ ...prev, phone: 'Phone should contain only numbers' }));
      } else {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Final validation before submit
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
      isValid = false;
    } else if (!/^[0-9]*$/.test(formData.phone)) {
      newErrors.phone = 'Phone should contain only numbers';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      // Submit the form
      console.log('Form submitted:', formData);
      // You can add your form submission logic here
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Updated background color to #1B2E4F */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#1B2E4F]" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-white lg:pr-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-lg text-[#A13C78] mb-12">
              Feel free to contact us? submit your queries here and we will get back to you as soon as possible.
            </p>
            <div className="space-y-4 mt-44 text-gray-500">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <Phone className="w-6 h-6 text-gray-500" />
                </div>
                <span className="text-lg">01414511098</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <Mail className="w-6 h-6 text-gray-500" />
                </div>
                <span className="text-lg">info@digihub.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-2 rounded-full">
                  <MapPin className="w-6 h-6 text-gray-500" />
                </div>
                <span className="text-lg">PLOT NO 97, DAKSHINPURI-I, SHRIKISHANPURA, SANGANER,
Jagatpura, Jaipur, Jaipur- 302017,Rajasthan</span>
              </div>
            </div>
            <div className="flex gap-4 mt-12">
              <a href="#" className="bg-[#1877F2] text-white p-2 rounded-full hover:opacity-90 transition-opacity">
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="bg-gradient-to-r from-[#A13C78] to-[#C1467F] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="bg-black text-white p-2 rounded-full hover:opacity-90 transition-opacity">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="bg-[#0A66C2] text-white p-2 rounded-full hover:opacity-90 transition-opacity">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="bg-[#FF0000] text-white p-2 rounded-full hover:opacity-90 transition-opacity">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="lg:pt-16">
            <div className="bg-white rounded-2xl shadow-2xl border-0 p-6">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-[#384D89]">Send Us Message</h2>
              </div>
              <div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg h-12 px-4 text-base`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg h-12 px-4 text-base`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg h-12 px-4 text-base`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg min-h-[120px] p-4 text-base"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#A13C78] hover:bg-[#872D67] text-white font-bold py-3 rounded-lg text-lg transition-colors"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;