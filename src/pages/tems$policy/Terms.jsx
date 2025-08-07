import React from "react";
import { ChevronRight, Home, FileText, Shield, Clock, Package, AlertTriangle, Users, Phone, Sparkles, Star, CheckCircle, ArrowRight, Search, ShoppingCart, User, Menu, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import {Link} from "react-router-dom" 
import Sidebar from "./Sidebar";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <Sidebar/>
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">            
              {/* Header */}
              <div className="bg-gradient-to-r from-[#14263F] via-[#2A4172] to-[#384D89] p-8 text-white">
                <div className="flex items-center mb-4">
                  <div className="bg-white/20 p-3 rounded-xl mr-4">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Terms and Conditions</h1>
                    <p className="text-white/80">Last updated: Feb, 20, 2024</p>
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

              {/* Policy Sections */}
              <div className="p-8 space-y-10">
                
                {/* Exchange Offer */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Exchange Offer</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <ul className="space-y-4">
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Availability:</strong> The exchange offer is valid until stocks last or until the offer expires, whichever is earlier.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Simultaneous Exchange:</strong> New product delivery and used product pickup will happen simultaneously.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Cancellation and Retention:</strong> If you decide not to proceed with the exchange and retain the used product, you need to pay the value provided for the used product as part of the transaction and offer.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Refund Policy:</strong> Refunds or returns for the exchanged or used product will not be provided.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Store Limitation:</strong> Exchange offer is available only at selected stores.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Model Limitation:</strong> Offer is applicable only on selected models.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Quantity Limitation:</strong> Only one product can be exchanged for each product purchased at a discounted price.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Discount without Exchange:</strong> You can avail brand new products at a discounted price, even without an old product to exchange. However, the discount percentage is higher on exchange products.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Delivery Delay:</strong> Due to high demand, delivery might be slightly delayed.
                        </div>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Eligibility */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Eligibility</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      The services of the site are available only to select geographies in India. Persons who are "incompetent to contract" within the meaning of the Indian Contract Act, 1872, including un-discharged insolvents, are not eligible to use the site.
                    </p>
                  </div>
                </section>

                {/* License & Site Access */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">License &amp; Site Access</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      You are granted a limited sub-license to access and make personal use of this site and not to download (other than page caching) or modify it, except with express written consent.
                    </p>
                  </div>
                </section>

                {/* Account & Registration Obligations */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Account &amp; Registration Obligations</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      All shoppers must register and log in to place orders on the site. You must keep your account and registration details current and correct for communications related to your purchases.
                    </p>
                  </div>
                </section>

                {/* Pricing */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <ShoppingCart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Pricing</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      All products listed on the site will be sold at MRP unless otherwise specified. Prices at the time of ordering will be the prices charged on the date of delivery.
                    </p>
                  </div>
                </section>

                {/* User Agreement */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">User Agreement</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <ul className="space-y-4">
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Non-Delivery:</strong> In the event of a non-delivery due to a mistake by you (e.g., wrong name or address), any extra cost incurred for redelivery will be claimed from you.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Lawful Use:</strong> You agree to use the services provided by the site for lawful purposes only.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Authentic Information:</strong> You will provide authentic and true information when requested.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Sole Risk:</strong> You access the services available on this site and transact at your sole risk.
                        </div>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Prohibited Uses */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Prohibited Uses</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      You may not use the site for the following purposes:
                    </p>
                    <ul className="space-y-4">
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          Disseminating unlawful, harassing, libelous, abusive, threatening, harmful, vulgar, obscene, or otherwise objectionable material.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          Encouraging conduct that constitutes a criminal offense or results in civil liability.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          Gaining unauthorized access to other computer systems.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          Interfering with another person's use or enjoyment of the site.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          Making, transmitting, or storing electronic copies of materials protected by copyright without the permission of the owner.
                        </div>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Colours */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Colours</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      We have made every effort to display the colours of our products accurately. However, as the actual colours you see depend on your monitor, we cannot guarantee that your monitor's display will be accurate.
                    </p>
                  </div>
                </section>

                {/* Modification of Terms & Conditions */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Modification of Terms &amp; Conditions</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      The site may modify the Terms &amp; Conditions of Use without prior notification. You should regularly review the Terms &amp; Conditions on the site.
                    </p>
                  </div>
                </section>

                {/* Governing Law and Jurisdiction */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Governing Law and Jurisdiction</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      This User Agreement shall be construed in accordance with the laws of India. The courts at Kolkata shall have exclusive jurisdiction.
                    </p>
                  </div>
                </section>

                {/* Reviews, Feedback, Submissions */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Reviews, Feedback, Submissions</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      All reviews, comments, feedback, suggestions, and other submissions disclosed, submitted, or offered to the site shall remain the property of the site.
                    </p>
                  </div>
                </section>

                {/* Copyright & Trademark */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Copyright &amp; Trademark</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      The site and its suppliers and licensors expressly reserve all intellectual property rights in all text, programs, products, processes, technology, content, and other materials that appear on this site.
                    </p>
                  </div>
                </section>

                {/* Objectionable Material */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Objectionable Material</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      By using the site or any services provided on the site, you may encounter content that may be deemed offensive, indecent, or objectionable.
                    </p>
                  </div>
                </section>

                {/* Indemnity */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Indemnity</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      You agree to defend, indemnify, and hold harmless the site, its employees, directors, officers, agents, and their successors and assigns from any claims, liabilities, damages, losses, costs, and expenses, including attorney's fees, arising out of your actions or inactions.
                    </p>
                  </div>
                </section>

                {/* Termination */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Termination</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      This User Agreement is effective until terminated by either you or the site. You may terminate this User Agreement at any time by discontinuing further use of the site.
                    </p>
                  </div>
                </section>

                {/* Terms and Conditions of Credit Card No Cost EMI */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <ShoppingCart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Terms and Conditions of Credit Card No Cost EMI</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <ul className="space-y-4">
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          The No Cost EMI facility is offered to customers making purchases on the site using eligible credit cards from selected banks.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          The No Cost EMI facility is funded by the site and is available on select products.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          The facility is not available for purchases made using net banking or Cash on Delivery payment methods.
                        </div>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;
