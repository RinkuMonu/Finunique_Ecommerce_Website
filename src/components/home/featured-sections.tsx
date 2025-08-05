"use client"

import {
  ArrowRight,
  Tablet,
  Smartphone,
  Gamepad2,
  Camera,
  Watch,
  Plane,
  Headphones,
  Monitor,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"


const FeaturedSections = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [itemsPerSlide, setItemsPerSlide] = useState(8)

  const categories = [
    { image: "/saree1.webp", name: "Tablet", path: "/category/tablet" },
    { image: "/saree1.webp", name: "Smartphone", path: "/category/smartphone" },
    { image: "/saree1.webp", name: "Game Console", path: "/category/gaming" },
    { image: "/saree1.webp", name: "Camera", path: "/category/camera" },
    { image: "/saree1.webp", name: "Smartwatch", path: "/category/smartwatch" },
    { image: "/saree1.webp", name: "Drone & Flycam", path: "/category/drone" },
    { image: "/saree1.webp", name: "Audio", path: "/category/audio" },
    { image: "/saree1.webp", name: "Computer", path: "/category/computer" },
    { image: "/saree1.webp", name: "Gaming Laptop", path: "/category/gaming-laptop" },
    { image: "/saree1.webp", name: "Accessories", path: "/category/accessories" },
    { image: "/saree1.webp", name: "Smart Home", path: "/category/smart-home" },
    { image: "/saree1.webp", name: "Wearables", path: "/category/wearables" },
  ]

  // Responsive items per slide
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(2)
      } else if (window.innerWidth < 768) {
        setItemsPerSlide(4)
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(6)
      } else {
        setItemsPerSlide(8)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    const maxSlides = Math.ceil(categories.length / itemsPerSlide)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % maxSlides)
    }, 4000) // Auto-slide every 4 seconds

    return () => clearInterval(interval)
  }, [categories.length, itemsPerSlide])


  const maxSlides = Math.ceil(categories.length / itemsPerSlide)


  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Category Icons Slider */}
        <div className="relative mb-12">
          {/* Navigation Arrows */}
          {/* <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center -ml-5 hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center -mr-5 hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button> */}

          {/* Slider Container */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {Array.from({ length: maxSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div
                    className="grid gap-4"
                    style={{
                      gridTemplateColumns: `repeat(${itemsPerSlide}, 1fr)`,
                    }}
                  >
                    {categories
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((category, index) => (
                        // <Link
                        //   key={`${slideIndex}-${index}`}
                        //   to={category.path}
                        //   className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group text-center transform hover:scale-105"
                        //   style={{ animationDelay: `${index * 100}ms` }}
                        // >
                        //   <div className="text-gray-600 group-hover:text-blue-600 transition-colors duration-200 mb-3 flex justify-center">
                        //     {category.icon}
                        //   </div>
                        //   <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                        //     {category.name}
                        //   </span>
                        // </Link>
                        <Link 
                          key={category.name}
                          to={`/category/${category.name}`}
                          className="group block py-2"
                        >
                          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#A13C78]/30 transform hover:-translate-y-2 relative h-full">
                            {/* Image Section with Gradient Overlay */}
                            <div className="relative h-28 overflow-hidden">
                              <img
                                src={category.image || "/placeholder.svg"}
                                alt={category.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />

                              {/* Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2E4F]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                              {/* Hover Action Button */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-[#384D89] hover:text-[#C1467F] hover:scale-110 transition-all duration-300">
                                  <ChevronRight size={20} strokeWidth={2} />
                                </button>
                              </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-5 relative z-10">
                              <div className="flex items-center justify-between">
                                <h3 className="font-bold text-lg text-[#1B2E4F] group-hover:text-[#384D89] transition-colors">
                                  {category.name}
                                </h3>

                                {/* Optional: Product Count Badge */}
                                {category.count && (
                                  <span className="text-xs font-medium bg-[#2A4172]/10 text-[#2A4172] px-2 py-1 rounded-full">
                                    {category.count} items
                                  </span>
                                )}
                              </div>

                              {/* Optional: Category Description (uncomment if needed) */}
                              {/* <p className="mt-2 text-sm text-gray-600 line-clamp-2">
        {category.description}
      </p> */}
                            </div>

                            {/* Accent Border on Hover */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A13C78] to-[#C1467F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: maxSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${currentSlide === index ? "bg-blue-600 w-6" : "bg-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Main Featured Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* New Arrivals - Watches */}
          <div className="lg:col-span-1 bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="text-center mb-8">
              <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                NEW ARRIVALS
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">ECOM WATCH NEW SERIES</h2>
              <Link
                to="/product"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Learn More
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Watch Display */}
            <div className="space-y-6">
              {/* Main Watch */}
              <div className="relative bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 text-center">
                <div className="w-32 h-32 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4">
                  <div className="w-24 h-24 bg-pink-200 rounded-xl flex items-center justify-center">
                    <Watch size={40} className="text-pink-600" />
                  </div>
                </div>
                <div className="text-sm text-gray-600">Series 9</div>
              </div>

              {/* Secondary Watches */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                  <div className="w-16 h-16 mx-auto bg-white rounded-xl shadow-sm flex items-center justify-center mb-2">
                    <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                      <Watch size={24} className="text-blue-600" />
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">Sport Band</div>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 text-center">
                  <div className="w-16 h-16 mx-auto bg-white rounded-xl shadow-sm flex items-center justify-center mb-2">
                    <div className="w-12 h-12 bg-red-200 rounded-lg flex items-center justify-center">
                      <Watch size={24} className="text-red-600" />
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">Braided Loop</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Special Deals */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                    SPECIAL DEALS
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">CYBER MONDAY SALE</h2>
                  <p className="text-gray-600 mb-6">
                    Up to <span className="text-red-600 font-bold">50% Discount</span>, no Promo Code Needed
                  </p>
                  <Link
                    to="/product"
                    className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Shop Now
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* TV */}
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="w-full h-20 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <Monitor size={32} className="text-gray-500" />
                    </div>
                    <div className="text-xs text-gray-600">Smart TV</div>
                  </div>
                  {/* Appliances */}
                  <div className="space-y-2">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="w-full h-12 bg-gray-200 rounded-md mb-2 flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-400 rounded"></div>
                      </div>
                      <div className="text-xs text-gray-600">Washer</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="w-full h-12 bg-gray-200 rounded-md mb-2 flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-400 rounded"></div>
                      </div>
                      <div className="text-xs text-gray-600">Fridge</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Smart Speaker */}
              <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 rounded-2xl p-8 text-center">
                <div className="w-32 h-32 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-6">
                  <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Speaker</h3>
                <p className="text-sm text-gray-600">Voice Assistant</p>
              </div>

              {/* Projector */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto bg-gray-700 rounded-lg shadow-lg flex items-center justify-center mb-6">
                    <div className="w-12 h-8 bg-gray-600 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-4">4K Projector</h3>
                  <Link
                    to="/"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium text-sm"
                  >
                    Learn More
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedSections
