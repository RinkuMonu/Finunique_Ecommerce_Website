import React from "react";
import { ChevronRight, Home, FileText, Shield, Clock, Package, AlertTriangle, Users, Phone, Sparkles, Star, CheckCircle, ArrowRight, Search, ShoppingCart, User, Menu, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import {Link} from "react-router-dom" 
import Sidebar from "./Sidebar";

const Cookies = () => {
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
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Cookies Policy</h1>
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
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Cookie Policy for Finunique Small Private Limited</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      Last updated: Feb, 20, 2024
                    </p>
                  </div>
                </section>

                {/* What Are Cookies */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">What Are Cookies</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored; however, this may downgrade or 'break' certain elements of the site's functionality.
                    </p>
                  </div>
                </section>

                {/* How We Use Cookies */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">How We Use Cookies</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry-standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
                    </p>
                  </div>
                </section>

                {/* Disabling Cookies */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Disabling Cookies</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed">
                      You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the site. Therefore, it is recommended that you do not disable cookies.
                    </p>
                  </div>
                </section>

                {/* The Cookies We Set */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">The Cookies We Set</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <ul className="space-y-4">
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Site preferences cookies:</strong>
                          <p className="text-gray-700 leading-relaxed mt-2">
                            In order to provide you with a great experience on this site, we provide the functionality to set your preferences for how the site runs when you use it. To remember your preferences, we need to set cookies so that this information can be called whenever you interact with a page affected by your preferences.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Third-Party Cookies */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">Third-Party Cookies</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      In some special cases, we also use cookies provided by trusted third parties. The following section details which third-party cookies you might encounter through this site:
                    </p>
                    <ul className="space-y-4">
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Google Analytics:</strong>
                          <p className="text-gray-700 leading-relaxed mt-2">
                            This site uses Google Analytics to help us understand how you use the site and ways we can improve your experience. These cookies may track things such as how long you spend on the site and the pages you visit so we can continue to produce engaging content.
                          </p>
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Testing New Features:</strong>
                          <p className="text-gray-700 leading-relaxed mt-2">
                            From time to time, we test new features and make subtle changes to the way the site is delivered. These cookies may be used to ensure that you receive a consistent experience and to understand which optimizations our users appreciate the most.
                          </p>
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Advertising and Business Data:</strong>
                          <p className="text-gray-700 leading-relaxed mt-2">
                            As we sell products, it's important for us to track how many visitors to our site make a purchase. This data helps us accurately make business predictions, monitor our advertising, and ensure the best prices.
                          </p>
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Google AdSense:</strong>
                          <p className="text-gray-700 leading-relaxed mt-2">
                            The Google AdSense service we use to serve advertising uses a DoubleClick cookie to serve more relevant ads across the web and limit the number of times that a given ad is shown to you.
                          </p>
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Behavioural Advertising Cookies:</strong>
                          <p className="text-gray-700 leading-relaxed mt-2">
                            These cookies track your interests anonymously and help us provide the most relevant ads by tracking your interests.
                          </p>
                        </div>
                      </li>
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          <strong className="text-[#384D89]">Social Media Cookies:</strong>
                          <p className="text-gray-700 leading-relaxed mt-2">
                            We also use social media buttons and/or plugins to connect with social networks. These sites may set cookies through our site to enhance your profile or contribute to the data they hold for various purposes outlined in their privacy policies.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* More Information */}
                <section className="group">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#C1467F] to-[#A13C78] p-3 rounded-lg mr-4">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#14263F] mb-1">More Information</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#C1467F] to-[#A13C78] rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#C1467F]">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Hopefully, that has clarified things for you. If you are unsure whether you need cookies, it is usually safer to leave them enabled as they interact with features you use on our site.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      For more general information on cookies, please read the <a href="https://www.cookiespolicy.com" className="text-[#384D89] hover:text-[#C1467F] transition-colors duration-300">Cookies Policy</a>.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      If you still have questions, you can contact us using the following contact methods:
                    </p>
                    <ul className="space-y-2">
                      <li className="bg-white p-4 rounded-lg shadow-sm flex items-start hover:shadow-md transition-shadow">
                        <CheckCircle className="w-5 h-5 text-[#C1467F] mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-gray-700 leading-relaxed">
                          Email: <a href="mailto:info@fin-unique.com" className="text-[#384D89] hover:text-[#C1467F] transition-colors duration-300">info@fin-unique.com</a>
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

export default Cookies;
