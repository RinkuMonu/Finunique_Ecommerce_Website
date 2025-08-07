import React from "react";
import { ChevronRight, Home, FileText, Shield, Clock, Package, AlertTriangle, Users, Phone, Sparkles, Star, CheckCircle, ArrowRight, Search, ShoppingCart, User, Menu, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import {Link} from "react-router-dom"
import Sidebar from "./Sidebar";

const CancellationPolicy = () => {
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
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Cancellation Policy</h1>
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
              <div className="p-8 space-y-10">
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Cancellation Policy for Digihub Unique Tech Solutions Private Limited.</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      Last updated: Feb, 20, 2024
                    </p>
                  </div>
                </section>

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
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The cancellation policy of an IT company serves as a structured framework that outlines the terms and conditions for canceling services, projects, or subscriptions. It is designed to provide clarity and transparency regarding how cancellations are handled, ensuring that both the client and the company understand their rights and responsibilities. By setting clear rules, the policy helps in minimizing disputes and maintaining professional relationships.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Additionally, the policy plays a crucial role in preventing financial and operational losses that may arise from last-minute cancellations. IT projects often involve resource allocation, workforce planning, and contractual commitments; unexpected cancellations can lead to wasted effort, revenue loss, and scheduling disruptions. To mitigate such risks, the policy may include cancellation timeframes, refund eligibility, and potential penalties for abrupt terminations.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Furthermore, the policy ensures compliance with legal and contractual obligations, especially in long-term service agreements. Many IT services operate under contracts that specify termination clauses, notice periods, and liability terms. A well-defined cancellation policy helps both parties adhere to these agreements, reducing the likelihood of legal conflicts and ensuring a smooth transition in case of service discontinuation.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      By implementing a robust cancellation policy, IT companies can protect their business interests, maintain operational efficiency, and foster trust with clients through a fair and transparent approach to cancellations. 🚀
                    </p>
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
                        <strong className="text-[#384D89]">Account:</strong> An account refers to a registered user profile or contractual entity that has access to a company's services, products, or subscriptions.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-gray-700 leading-relaxed">
                        <strong className="text-[#384D89]">Affiliate:</strong> An affiliate refers to an individual or entity that partners with a company to promote its products or services, often earning a commission for referrals.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-gray-700 leading-relaxed">
                        <strong className="text-[#384D89]">Company:</strong> A company refers to the business or service provider that establishes and enforces the terms for canceling services, projects, or subscriptions.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-gray-700 leading-relaxed">
                        <strong className="text-[#384D89]">Cookies:</strong> Cookies refer to small data files stored on a user's device by a website to track and remember user preferences, login details, or browsing behavior.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-gray-700 leading-relaxed">
                        <strong className="text-[#384D89]">Device:</strong> A device refers to the physical hardware (such as a smartphone, tablet, laptop, or desktop computer) that a user employs to access a company's services, applications, or software.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-gray-700 leading-relaxed">
                        <strong className="text-[#384D89]">Personal Data:</strong> Personal data refers to any information that identifies an individual, such as name, email address, phone number, payment details, or login credentials, which a company collects during service registration or usage.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-gray-700 leading-relaxed">
                        <strong className="text-[#384D89]">Service:</strong> A service refers to the product, subscription, or solution provided by a company to its customers, which may be subject to cancellation under specific terms and conditions.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Key Elements */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Key Elements of a Cancellation Policy</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-[#384D89]">Scope:</strong> Specifies what services or products the policy applies to (e.g., software development projects, SaaS subscriptions, IT consulting services).
                    </p>
                  </div>
                </section>

                {/* Cancellation Timeframe */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Cancellation Timeframe</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      The cancellation timeframe in a cancellation policy specifies how far in advance a customer, client, or partner must request a cancellation to avoid penalties such as fees, loss of deposits, or non-refundable charges. This timeframe is crucial for businesses, as it allows them to manage resources, staffing, and financial planning efficiently while also providing fairness and clarity to customers.
                    </p>
                  </div>
                </section>

                {/* Refund & Charges */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <ShoppingCart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Refund &amp; Charges</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      A cancellation policy includes clear guidelines on whether a customer is eligible for a refund and if any cancellation fees apply. This ensures transparency in financial transactions and helps both the company and the customer understand their rights and obligations when canceling a service, subscription, or contract.
                    </p>
                  </div>
                </section>

                {/* Contractual Obligations */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Contractual Obligations</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      A termination clause in a long-term agreement defines the conditions under which either party (the company or the client) can end the contract before its intended completion date. These clauses are critical for ensuring that both parties understand their rights, obligations, and any consequences of terminating the agreement prematurely.
                    </p>
                  </div>
                </section>

                {/* Exceptions & Special Cases */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Exceptions &amp; Special Cases</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      A cancellation policy outlines standard procedures for terminating services, projects, or contracts. However, there are specific exceptional scenarios where cancellations may be handled differently. These special cases ensure fairness, legal compliance, and adaptability to unforeseen circumstances.
                    </p>
                  </div>
                </section>

                {/* Contact Us */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Contact Us</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      If you have any questions about this Privacy Policy, You can contact us via email at{" "}
                      <a href="mailto:info@digihubtech.in." className="text-[#384D89] hover:text-[#C1467F] transition-colors duration-300">
                        info@digihubtech.in.
                      </a>{" "}
                      and call us at{" "}
                      <a href="tel:=01414511098" className="text-[#384D89] hover:text-[#C1467F] transition-colors duration-300">
                        0141-4511098
                      </a>.
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

export default CancellationPolicy;
