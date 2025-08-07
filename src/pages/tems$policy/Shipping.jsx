import { ChevronRight, Home, FileText, Shield, Clock, Package, AlertTriangle, Users, Phone, Sparkles, Star, CheckCircle, ArrowRight, Search, ShoppingCart, User, Menu, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import {Link} from "react-router-dom"
import  Sidebar  from './Sidebar'

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
       
                  <Sidebar/>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

              <div className="bg-gradient-to-r from-[#14263F] via-[#2A4172] to-[#384D89] p-8 text-white">
                <div className="flex items-center mb-4">
                  <div className="bg-white/20 p-3 rounded-xl mr-4">
                    <Package className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Shipping Policy</h1>
                    <p className="text-white/80">Last updated: January 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    5 min read
                  </span>
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Important Policy
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                
                {/* Company Terms */}
                <div className="mb-12">
                  <div className="bg-gradient-to-r from-[#2A4172] to-[#384D89] p-6 rounded-xl text-white mb-6">
                    <div className="flex items-center">
                      <Shield className="w-6 h-6 mr-3" />
                      <h2 className="text-xl font-bold">DIGIHUB UNIQUE TECH SOLUTIONS PRIVATE LIMITED - Service Terms & Conditions</h2>
                    </div>
                  </div>
                </div>

                {/* Policy Sections */}
                <div className="space-y-10">
                  
                  {/* Introduction */}
                  <section className="group">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#14263F] mb-1">Introduction</h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                      <p className="text-gray-700 leading-relaxed">
                        Welcome to DIGIHUB UNIQUE TECH SOLUTIONS PRIVATE LIMITED Services. By signing the Service Form and handing over your product(s) for service, you agree to abide by these Terms and Conditions. These terms govern the service and repair of your product(s) by Digital Services Centers through its after-sales service, operated by an independent third party. If you do not agree to these terms and conditions, please do not submit the Form or hand over your product(s) for service.
                      </p>
                    </div>
                  </section>

                  {/* Order Processing */}
                  <section className="group">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#14263F] mb-1">Order Processing</h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-[#C1467F] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          We strive to fulfill orders as soon as you place them. In most cases, your order will be expected to be delivered within 7 business days. Our business days are Monday-Friday.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Shipping Time */}
                  <section className="group">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#14263F] mb-1">Shipping Time</h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                      <div className="flex items-start mb-6">
                        <div className="w-2 h-2 bg-[#C1467F] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          For most serviceable pin codes, we try to deliver within 10 days.
                        </p>
                      </div>
                      
                      {/* Shipping Options Cards */}
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group/card">
                          <div className="flex items-center justify-between mb-3">
                            <div className="font-bold text-[#14263F]">Standard Shipping</div>
                            <ArrowRight className="w-4 h-4 text-[#384D89] opacity-0 group-hover/card:opacity-100 transition-opacity" />
                          </div>
                          <div className="text-gray-600 text-sm mb-2">3 to 5 business days</div>
                          <div className="text-[#C1467F] font-semibold">FREE</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group/card">
                          <div className="flex items-center justify-between mb-3">
                            <div className="font-bold text-[#14263F]">Express Shipping</div>
                            <ArrowRight className="w-4 h-4 text-[#A13C78] opacity-0 group-hover/card:opacity-100 transition-opacity" />
                          </div>
                          <div className="text-gray-600 text-sm mb-2">1 to 2 business days</div>
                          <div className="text-[#C1467F] font-semibold">$9.99</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group/card">
                          <div className="flex items-center justify-between mb-3">
                            <div className="font-bold text-[#14263F]">International</div>
                            <ArrowRight className="w-4 h-4 text-[#C1467F] opacity-0 group-hover/card:opacity-100 transition-opacity" />
                          </div>
                          <div className="text-gray-600 text-sm mb-2">7 to 14 business days</div>
                          <div className="text-[#C1467F] font-semibold">$24.99</div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Definitions */}
                  <section className="group">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#14263F] mb-1">Definitions</h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F] space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">You/Customer:</strong> Refers to the individual or entity handing over the product(s) for service.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">We/Us/Company:</strong> Refers to Digital Services Centers.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* In-Warranty Product Service */}
                  <section className="group">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#14263F] mb-1">In-Warranty Product Service</h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                      <div className="space-y-4">
                        {[
                          { title: "Proof of Purchase", content: "You must provide a clear and legible copy of the proof of purchase (such as a bill or invoice) and details of the product's model and serial number." },
                          { title: "Customer Responsibility", content: "It is your sole responsibility to support the Company/service provider in offering its services." },
                          { title: "Warranty Terms", content: "The service of the product(s) is governed by the terms of the warranty conditions. Please refer to the warranty terms on our website for detailed inclusions and exclusions." },
                          { title: "Free Service", content: "Products covered under warranty will receive free service and replacement of components, provided the product is used as per the user manual instructions." },
                          { title: "Property Rights", content: "Replaced products or parts under warranty will become your property, and removed parts will become the property of the Company." },
                          { title: "Service Charges", content: "Charges will apply for products under warranty if the product is not used as per the user manual instructions." },
                          { title: "External Accessories", content: "The warranty does not cover repair, installation, or configuration of external accessories supplied by Digital Services Centers or third parties." },
                          { title: "Replacement Products", content: "In case of a free replacement, the same model will be provided. If discontinued, an alternate model will be provided with your consent." },
                          { title: "Shipping Policy", content: "Packages are generally dispatched within 6-7 days after receipt of payment and are shipped via reputed national couriers with tracking. We will provide you with a link to track your package online." }
                        ].map((item, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                            <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                            <div className="text-gray-700 leading-relaxed">
                              <strong className="text-[#384D89]">{item.title}:</strong> {item.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Out-of-Warranty Product Service */}
                  <section className="group">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                        <AlertTriangle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#14263F] mb-1">Out-of-Warranty Product Service</h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                      <div className="bg-white p-4 rounded-lg shadow-sm flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Service Charges:</strong> For products outside the warranty period, a service charge of Rs. 450 + GST or more (subject to prevailing charges) and replacement part charges will apply.
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Force Majeure */}
                  <section className="group">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                        <AlertTriangle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#14263F] mb-1">Force Majeure</h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                      <p className="text-gray-700 leading-relaxed">
                        In unforeseen situations like acts of God, epidemics, pandemics, strikes, or lockouts, the Company's services will be suspended. Once normalcy is restored, services will resume.
                      </p>
                    </div>
                  </section>

                  {/* Liability */}
                  <section className="group">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#14263F] mb-1">Liability</h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                      <p className="text-gray-700 leading-relaxed">
                        The Company/Service provider and its employees are not liable for any special, indirect, incidental, or consequential damages from repair services. The sole liability is limited to the cost of repair or replacement of the affected product.
                      </p>
                    </div>
                  </section>

                  {/* Abandoned Products */}
                  <section className="group">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#14263F] mb-1">Abandoned Products</h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                      <p className="text-gray-700 leading-relaxed">
                        If the Company/Service provider is unable to return the product due to lack of payment or refusal to collect within thirty (30) days of notification, the product will be considered abandoned. The Company may dispose of the product in accordance with applicable laws.
                      </p>
                    </div>
                  </section>

                  {/* Data Collection */}
                  <section className="group">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#14263F] mb-1">Data Collection</h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                      <p className="text-gray-700 leading-relaxed">
                        You agree that it is necessary for the Company to collect, process, and use your personal data to perform service and support obligations under these terms and conditions.
                      </p>
                    </div>
                  </section>

                  {/* Contact Information */}
                  <section className="group">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#14263F] mb-1">Contact Information</h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                      <p className="text-gray-700 leading-relaxed">
                        For further details, please contact our Customer Care or visit our website.
                      </p>
                    </div>
                  </section>

                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
