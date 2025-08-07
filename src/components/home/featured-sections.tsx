"use client";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const FeaturedSections = () => {
  const slugify = (text) =>
    text.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-');
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;
  const [groupedCategories, setGroupedCategories] = useState({});
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseUrl}/website/${referenceWebsite}`);
        const data = await res.json();

        const grouped = {};
        if (Array.isArray(data?.website?.categories)) {
          const namesOnly = data.website.categories.map((item) => item.name);
          console.log("Category Names:", namesOnly);

          data.website.categories.forEach((item) => {
            const sub = item?.subcategory;
            if (!grouped[sub]) grouped[sub] = [];
            grouped[sub].push(item);
          });
        }

        setGroupedCategories(grouped);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, [baseUrl, referenceWebsite]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Categories Section */}
        <div className="mt-16 space-y-10">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Shop by Categories
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={scrollLeft}
                  className="p-2 rounded-full bg-white hover:bg-gray-200 transition-colors"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={scrollRight}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="relative">
              <div
                ref={scrollContainerRef}
                className="overflow-x-auto whitespace-nowrap scrollbar-hide pb-4 -mx-4 px-4"
              >
                <div className="inline-flex space-x-4">
                  {Object.values(groupedCategories)
                    .flat()
                    .map((item) => (
                      <Link
                        to={`/category/${slugify(item?.name)}`}
                        key={item._id}
                        className="flex-shrink-0 w-36 sm:w-44 bg-white rounded-[8px] p-4 text-center hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-200 shadow-sm "
                      >
                        {item?.image ? (
                          <img
                            src={item?.image}
                            alt={item?.name}
                            className="w-20 h-20 mx-auto object-contain mb-3 rounded-lg"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full mb-3 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">
                              No Image
                            </span>
                          </div>
                        )}
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {item?.name}
                        </p>
                        <span className="inline-block mt-2 text-xs text-[#CD6AA5] font-medium">
                          Shop Now{" "}
                          <ArrowRight size={12} className="inline ml-1" />
                        </span>
                      </Link>
                    ))}
                </div>
              </div>

              {/* Gradient fade effects for mobile */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent"></div>
            </div>

            {/* View All Button for mobile */}
            {/* <div className="mt-6 text-center lg:hidden">
              <Link
                to="/category"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                View All Categories
                <ArrowRight size={14} className="ml-1" />
              </Link>
            </div> */}
          </div>
        </div>

        {/* Main Banner Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          {/* Left Banner (Large) */}
          <Link to={`/category/${slugify("Smart Watches")}`}>
            <div className="lg:col-span-1 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <img
                src="./Digiimage/banner-1_900x.webp"
                alt="Banner promotion"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Right Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Banner (Cyber Monday) */}
            <div
              className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 min-h-[250px]"
              style={{
                backgroundImage: "url(./Digiimage/banner-2_900x.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-center">
                <div className="max-w-md">
                  <div className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                    SPECIAL DEALS
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    CYBER MONDAY SALE
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Up to{" "}
                    <span className="text-red-600 font-bold">50% Discount</span>
                    , no Promo Code Needed
                  </p>
                  <Link
                    to={`/category/${slugify("Smart Home Devices")}`}
                    className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 w-fit"
                  >
                    Shop Now
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Banners */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Smart Speaker Card */}
              <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-28 h-28 mx-auto bg-white rounded-full shadow-md flex items-center justify-center mb-6">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 bg-gray-800 rounded-full animate-pulse opacity-80"></div>
                    <div className="absolute inset-2 bg-gray-700 rounded-full animate-pulse opacity-60"></div>
                    <div className="absolute inset-4 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Smart Speaker
                </h3>
                <p className="text-sm text-gray-600 mb-4">Voice Assistant</p>
                <Link
                  to={`/category/Accessories`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 inline-flex items-center"
                >
                  View Collection
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>

              {/* 4K Projector Banner */}
              <div className="relative rounded-2xl overflow-hidden min-h-[200px]">
                <img
                  src="./Digiimage/banner-3_580x.jpg"
                  alt="4K Projector"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-xl sm:text-2xl text-white font-semibold mb-3">
                    4K Projector
                  </h3>
                  <Link
                    to={`/category/${slugify("Printers & Inks")}`}
                    className="inline-flex items-center bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-md font-medium text-sm transition-colors"
                  >
                    Shop Now
                    <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSections;
