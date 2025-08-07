"use client";
import {
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
import footerLogo from "/footer-logo.png";
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
          setCategories(data.website.categories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [baseUrl, referenceWebsite]);


  console.log("Categories:", categories);

  const trustFeatures = [
    { icon: <Shield size={20} />, text: "Secure Shopping", color: "#10B981" },
    { icon: <Truck size={20} />, text: "Free Shipping", color: "#3B82F6" },
    { icon: <Award size={20} />, text: "Quality Guarantee", color: "#8B5CF6" },
    { icon: <CreditCard size={20} />, text: "Easy Returns", color: "#F59E0B" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 400, behavior: "smooth" });
  };


   const slugify = (text) =>
    text.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-');

  return (
    <footer className="bg-gradient-to-br from-[#872d67] to-[#2a4172] text-white border-t border-gray-700">
      {/* Trust Features Bar */}
      <div className="bg-gradient-to-r from-[#C1467F] to-[#8E2DE2] py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: feature.color }}
                >
                  {feature.icon}
                </div>
                <span className="text-sm font-medium text-white">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Company Info */}
          <div className="space-y-6 md:pt-8">
            <Link to="/" className="inline-block">
              <img
                src={footerLogo || "/placeholder.svg"}
                alt="Company Logo"
                width={251}
                height={6}
                className="hover:scale-105 transition-transform duration-300"
                style={{ borderRadius: "5px", padding: "7px" }}
              />
            </Link>

            <div className="">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-white/80 hover:text-[#C1467F] transition-colors duration-200">
                  <Mail size={16} className="text-[#C1467F]" />
                  <a href="mailto:info@digihub.com" className="hover:underline">
                    info@digihubtech.in
                  </a>
                </div>

                <div className="flex items-center space-x-3 text-sm text-white/80 hover:text-[#C1467F] transition-colors duration-200">
                  <Phone size={16} className="text-[#C1467F]" />
                  <a href="tel:01414511098" className="hover:underline">
                    0141-4511098
                  </a>
                </div>

                <div className="flex items-start space-x-3 text-sm text-white/80 hover:text-[#C1467F] transition-colors duration-200">
                  <MapPin size={28} className="text-[#C1467F] mt-1" />
                  <span>
                    Plot No. 97, Dakshinpuri-I, Shrikishanpura, Sanganer,
                    Jagatpura, Jaipur – 302017, Rajasthan
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-6 md:pl-16">
            <h3 className="text-lg uppercase font-semibold text-white border-b border-[#C1467F] pb-2 inline-block">
              Categories
            </h3>
            <div className="space-y-3">
              {categories.slice(0, 10).map((category, index) => (
                <Link
                  key={category._id}
                  to={`/category/${encodeURIComponent(slugify(category.name))}`}
                  className="block text-sm text-white/80 hover:text-[#C1467F] group transition-all duration-200 hover:pl-3 border-l-2 border-transparent hover:border-[#C1467F] pl-1"
                >
                  {category.name}
                </Link>
              ))}
          
            </div>
          </div>

           <div className="space-y-6 md:pl-16">
            <h3 className="text-lg font-semibold text-white border-b border-[#C1467F] pb-2 inline-block">
            POPULAR SEARCHES
            </h3>
            <div className="space-y-3">
              {categories.slice(11, 20).map((category, index) => (
                <Link
                  key={category._id}
                  to={`/category/${encodeURIComponent(slugify(category.name))}`}
                  className="block text-sm text-white/80 hover:text-[#C1467F] group transition-all duration-200 hover:pl-3 border-l-2 border-transparent hover:border-[#C1467F] pl-1"
                >
                  {category.name}
                </Link>
              ))}
            
            </div>
          </div>

          {/* Subcategories */}
          {/* <div className="space-y-6 md:pl-16">
            <h3 className="text-lg font-semibold text-white border-b border-[#C1467F] pb-2 inline-block">
              Popular Searchs
            </h3>
            <div className="space-y-3">
              {[
                { title: "Mobiles", path: "/category/Mobiles" },
                { title: "Tablets & eReaders", path: "/category/Tablets%20&%20eReaders" },
                { title: "Accessories", path: "/category/Accessories" },
                { title: "Laptops & Desktops", path: "/category/Laptops%20&%20Desktops" },
                { title: "Headphones & Earbuds", path: "/category/Headphones%20&%20Earbuds" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="block text-sm text-white/80 hover:text-[#C1467F] group transition-all duration-200 hover:pl-3 border-l-2 border-transparent hover:border-[#C1467F] pl-1"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div> */}

          {/* Company */}
          <div className="space-y-6 md:pl-16">
            <h3 className="text-lg font-semibold uppercase text-white border-b border-[#C1467F] pb-2 inline-block">
              Company
            </h3>
            <div className="space-y-3">
              {[
                { title :"FAQ",path:"/faqs"},
                { title: "Home", path: "/" },
                { title: "About Us", path: "/about" },
                { title: "WishList", path: "/wishlist" },
                { title: "Contact Us", path: "/contact-us" },
                { title: "Track Order", path: "/profile" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="block text-sm text-white/80 hover:text-[#C1467F] group transition-all duration-200 hover:pl-3 border-l-2 border-transparent hover:border-[#C1467F] pl-1"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-[#C1467F]">

          <div className="text-center pb-4">
              <p className="text-sm text-white/80">
                © {new Date().getFullYear()} DigiHubUnique Tech Solutions Private Limited. All rights reserved.
              </p>
            </div>


          <div className="flex flex-col items-center">
            {/* Policy Links */}
            <div className="w-full">
              <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-6 text-sm ">
                {[
                  { title: "Shipping Policy", path: "/shipping" },
                  { title: "Return & Exchanges", path: "/return-and-exchanges" },
                  { title: "Terms & Conditions", path: "/terms-and-condition" },
                  { title: "Privacy Policy", path: "/privacy-policy" },
                  { title: "Cancellation Policy", path: "/cancellation-policy" },
                  { title: "Cookie Policy", path: "/cookies" },
                ].map((item, index) => (
                  <li key={index} className="relative">
                    <Link
                      to={item.path}
                      className="text-white/80 hover:text-[#C1467F] transition-colors duration-200 px-1"
                    >
                      {item.title}
                    </Link>
                    {index < 5 && (
                      <span className="hidden sm:inline-block text-white md:pl-3">|</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Copyright */}

          </div>
        </div>
      </div>
    </footer>
  );
}