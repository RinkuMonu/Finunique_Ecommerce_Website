"use client";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Shield,
  Truck,
  CreditCard,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import footerLogo from "/digihub_footer.png";
import { useEffect, useState } from "react";

export default function Footer() {
  const [categories, setCategories] = useState<string[]>([]);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseUrl}/website/${referenceWebsite}`);
        const data = await res.json();
        if (Array.isArray(data.website?.categories)) {
          setCategories(data.website.categories.map((cat: any) => cat.name));
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [baseUrl, referenceWebsite]);

  const socialLinks = [
    {
      icon: <Facebook className="h-5 w-5" />,
      link: "#",
      name: "Facebook",
      color: "#1877F2",
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      link: "#",
      name: "Twitter",
      color: "#1DA1F2",
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      link: "#",
      name: "Instagram",
      color: "#E4405F",
    },
    {
      icon: <Youtube className="h-5 w-5" />,
      link: "#",
      name: "YouTube",
      color: "#FF0000",
    },
  ];

  const trustFeatures = [
    { icon: <Shield size={20} />, text: "Secure Shopping", color: "#10B981" },
    { icon: <Truck size={20} />, text: "Free Shipping", color: "#3B82F6" },
    { icon: <Award size={20} />, text: "Quality Guarantee", color: "#8B5CF6" },
    { icon: <CreditCard size={20} />, text: "Easy Returns", color: "#F59E0B" },
  ];
  const scrollToTop = () => {
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Trust Features Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: feature.color }}
                >
                  {feature.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img
                src={footerLogo || "/placeholder.svg"}
                alt="Company Logo"
                className="h-16 w-auto"
              />
            </Link>

            <div className="space-y-4">
              {/* <p className="text-sm leading-relaxed text-gray-600">
                Your trusted partner for premium quality products. We deliver
                excellence with every purchase.
              </p> */}

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Mail size={16} className="text-gray-400" />
                  <a href="mailto:info@digihub.com" className="hover:underline">
                    info@digihub.com
                  </a>
                </div>

                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Phone size={16} className="text-gray-400" />
                  <a href="tel:01414511098" className="hover:underline">
                    0141-4511098
                  </a>
                </div>

                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <MapPin size={46} className="text-gray-400" />
                  <span>
                    Plot No. 97, Dakshinpuri-I, Shrikishanpura, Sanganer,
                    Jagatpura, Jaipur – 302017, Rajasthan
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
            <div className="space-y-3">
              {categories.slice(0, 6).map((category, index) => (
                <Link
                  key={index}
                  to={`/category/${encodeURIComponent(category).toLowerCase()}`}
                  className="block text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  {category}
                </Link>
              ))}
              {categories.length > 6 && (
                <button className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                onClick={scrollToTop}
                >
                  View All Categories
                  <ArrowRight size={14} className="ml-1" />
                </button>
              )}
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Customer Service
            </h3>
            <div className="space-y-3">
              {[
                { title: "Shipping Policy", path: "/shipping" },
                { title: "Return & Exchanges", path: "/return-and-exchanges" },
                { title: "Terms & Condition", path: "/terms-and-condition" },
                { title: "Privacy Policy", path: "/privacy-policy" },
                { title: "Cancellation Policy", path: "/cancellation-policy" },

                { title: "Cookie Policy", path: "/cookies" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="block text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Company</h3>
            <div className="space-y-3">
              {[
                { title: "Home", path: "/" },
                { title: "About Us", path: "/about" },
                { title: "WishList", path: "/wishlist" },
                // { title: "Press", path: "/press" },
                // { title: "Stories", path: "/stories" },
                { title: "Contact Us", path: "/contact-us" },
                { title: "Track Order", path: "/profile" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="block text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        {/* <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-600 text-sm">
                Subscribe to our newsletter for exclusive offers, new arrivals,
                and style tips.
              </p>
            </div>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}

        {/* Social Media & Reviews */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 mr-2">Follow us:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-white hover:border-transparent transition-all duration-200"
                  style={{
                    hover: { backgroundColor: social.color },
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = social.color;
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#6B7280";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              {/* <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-yellow-400 stroke-yellow-400"
                    />
                  ))}
                </div>
                <span>4.8/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users size={16} className="text-gray-400" />
                <span>50K+ Customers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Package size={16} className="text-gray-400" />
                <span>100K+ Orders</span>
              </div> */}
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} Your Company. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
      </div>
    </footer>
  );
}
