import React from "react";
import { ChevronRight, Home, FileText, Shield, Clock, Package, AlertTriangle, Users, Phone, Sparkles, Star, CheckCircle, ArrowRight, Search, ShoppingCart, User, Menu, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import {Link} from "react-router-dom"
import Sidebar from "./Sidebar";

const Refund = () => {
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
                    <h1 className="text-3xl font-bold mb-2">Refund Policy</h1>
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

              {/* Policy Sections */}
              <div className="p-8 space-y-10">
                
                {/* Return Policy */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Return Policy</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <ul className="space-y-4">
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          All Products purchased from the Website enjoy Ten (10) days Return Policy.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          Any Product purchased from the Website can be returned to the Company within Ten (10) days of delivery by placing a Cancel Order request by logging a call with the Company's Customer Care Centre at 9660339514 (Mon to Sat-10AM to 6PM).
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          Any Product purchased from the Website can be returned only if the Product is damaged, defective, or different from what was ordered.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          The User shall ensure not to accept delivery of any Product whose original packaging is damaged or tampered in any manner.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          If the Product is damaged/defective/different from what was ordered, the User must immediately inform the Company's Customer Care Centre, and the Company will arrange for replacement or a refund of the price, including shipping charges if applicable.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          In case of Cancellation (Return/Exchange) after delivery, the Customer must cooperate fully to return the Product with all original packaging, manuals, accessories, freebies, and other materials received with the Product. Refund or exchange will only be processed after receipt of the product.
                        </div>
                      </li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-6">
                      All free gifts, in original packing and unused condition, must be returned along with the Product in case of cancellation of the Product with which the free gift(s) were given.
                    </p>
                  </div>
                </section>

                {/* Refund Policy */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Refund Policy</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <ul className="space-y-4">
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          Any cancellation/exchange in accordance with the above terms qualifies for payment reversal or replacement of the Product depending on availability and User preference.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          Refunds for cancellations before delivery will be subject to a 2% deduction plus applicable taxes of the Product Price (Transaction value) as banking and transaction charges. The balance amount will be processed for refund.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          Refunds will be initiated within Ten (10) working days of receipt of the Request for Cancellation or after the Company's logistics partner picks up the Product from the User's place. The refund will be credited to the User's bank/credit card account based on banking channels' processing time. If approved, you'll be automatically refunded on your original payment method within 10 business days.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          Refunds will be credited to the account from which payment was made.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          Interest Fee Reversal: If an EMI facility was availed for the cancelled transaction, the interest fee debited to the User's card will be reversed as per the bank's terms. The User should contact the card-issuing bank for interest refund procedures.
                        </div>
                      </li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-6">
                      The above terms and conditions in respect to refunds are referred to as the "Refund Policy."
                    </p>
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

export default Refund;
