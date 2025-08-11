import React from "react";
import { ChevronRight, Home, FileText, Shield, Clock, Package, AlertTriangle, Users, Phone, Sparkles, Star, CheckCircle, ArrowRight, Search, ShoppingCart, User, Menu, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import {Link} from "react-router-dom" 
import Sidebar from "./Sidebar";

const Privacy = () => {
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
                    <Shield className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
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
                
                {/* Main Heading */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Privacy Policy for DIGIHUBUNIQUE TECH SOLUTIONS PRIVATE LIMITED</h3>
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
                      This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
                    </p>
                  </div>
                </section>

                {/* Interpretation and Definitions */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Interpretation and Definitions</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-[#384D89]">Interpretation:</strong> The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or plural.
                    </p>
                  </div>
                </section>

                {/* Definitions */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Definitions</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F] space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-gray-700 leading-relaxed">
                        <strong className="text-[#384D89]">Account:</strong> Means a unique account created for You to access our Service.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-gray-700 leading-relaxed">
                        <strong className="text-[#384D89]">Affiliate:</strong> Means an entity that controls, is controlled by, or is under common control with a party.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-gray-700 leading-relaxed">
                        <strong className="text-[#384D89]">Company:</strong> Refers to U62013RJ2024PTC093387, Plot No 97, Dakshinpuri - I, Shrikishan, Sanganer, Jagatpura, Jaipur Rajasthan, India, 302017.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-gray-700 leading-relaxed">
                        <strong className="text-[#384D89]">Cookies:</strong> Small files placed on Your device to store details of your browsing history.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-gray-700 leading-relaxed">
                        <strong className="text-[#384D89]">Device:</strong> Refers to any device that can access the Service such as a computer, cellphone, or tablet.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-gray-700 leading-relaxed">
                        <strong className="text-[#384D89]">Personal Data:</strong> Any information that relates to an identified or identifiable individual.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-gray-700 leading-relaxed">
                        <strong className="text-[#384D89]">Service:</strong> Refers to the Website.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Collecting and Using Your Personal Data */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Collecting and Using Your Personal Data</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F] space-y-4">
                    {/* <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-gray-700 leading-relaxed">
                        <strong className="text-[#384D89]">Types of Data Collected:</strong>
                      </p>
                    </div> */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-gray-700 leading-relaxed">
                        <strong className="text-[#384D89]">Personal Data:</strong> While using Our Service, We may ask You to provide Us with personally identifiable information such as Email address, Phone number, and Usage Data.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Tracking Technologies and Cookies */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Tracking Technologies and Cookies</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information.
                    </p>
                  </div>
                </section>

                {/* Use of Your Personal Data */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Use of Your Personal Data</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <ul className="space-y-4">
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">To provide and maintain our Service:</strong> Including to monitor the usage of our Service.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">To manage Your Account:</strong> To manage Your registration as a user of the Service.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">For the performance of a contract:</strong> To develop, comply with, and undertake the purchase contract for products or services.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">To contact You:</strong> To contact You with updates or other informative communications.
                        </div>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Retention of Your Personal Data */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Retention of Your Personal Data</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      The Company will retain Your Personal Data only for as long as necessary for the purposes set out in this Privacy Policy.
                    </p>
                  </div>
                </section>

                {/* Transfer of Your Personal Data */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Transfer of Your Personal Data</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      Your information may be transferred to computers located outside Your jurisdiction and may be subject to different data protection laws.
                    </p>
                  </div>
                </section>

                {/* Security of Your Personal Data */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Security of Your Personal Data</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      We strive to use commercially acceptable means to protect Your Personal Data, but no method of transmission over the Internet is 100% secure.
                    </p>
                  </div>
                </section>

                {/* Disclosure of Your Personal Data */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Disclosure of Your Personal Data</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      We may disclose Your Personal Data in the following situations:
                    </p>
                    <ul className="space-y-4">
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">For business transfers:</strong> In the event of a merger, sale, or transfer of assets, Your Personal Data may be transferred.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">With Affiliates:</strong> We may share Your information with Our affiliates.
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">With Your consent:</strong> We may disclose Your personal information for any other purpose with Your consent.
                        </div>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Retention and Deletion of Your Personal Data */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Retention and Deletion of Your Personal Data</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      You have the right to request the deletion of your personal data and to withdraw your consent at any time.
                    </p>
                  </div>
                </section>

                {/* Children's Privacy */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Children's Privacy</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us.
                    </p>
                  </div>
                </section>

                {/* Links to Other Websites */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Link className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Links to Other Websites</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      Our Service may contain links to other websites that are not operated by Us. We are not responsible for the content or privacy policies of third-party websites.
                    </p>
                  </div>
                </section>

                {/* Changes to this Privacy Policy */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Changes to this Privacy Policy</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      We may update our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
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
                      If you have any questions about this Privacy Policy, You can contact us via email at <a href="mailto:info@digihubtech.in" className="text-[#384D89] hover:text-[#C1467F] transition-colors duration-300">info@digihubtech.in</a>.
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

export default Privacy;
