"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Grid3X3, Eye, Heart, ShoppingCart, Star, Check, Zap, Clock } from "lucide-react"
import { Link } from "react-router-dom"

const DealsOfTheDay = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 7,
    minutes: 15,
    seconds: 47,
  })

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else if (days > 0) {
          days--
          hours = 23
          minutes = 59
          seconds = 59
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const deals = [
    {
      id: 1,
      category: "AIR PURIFIER",
      name: "Manufacturer Reusable Cleaner Home Washable",
      image: "/placeholder.svg?height=300&width=300&text=Air+Purifier",
      originalPrice: 420.0,
      salePrice: 400.0,
      discount: 4,
      rating: 5,
      inStock: 20,
      totalStock: 100,
      soldPercentage: 80,
      features: ["3 Years Warranty", "Genuine Guaranteed", "Free Shipping From USA"],
      badge: "BESTSELLER",
    },
    {
      id: 2,
      category: "BLUETOOTH",
      name: "Gaming Headset with Mic for Xbox One PS4 Switch",
      image: "/placeholder.svg?height=300&width=300&text=Gaming+Headset",
      originalPrice: 205.0,
      salePrice: 200.0,
      discount: 2,
      rating: 4,
      inStock: 79,
      totalStock: 200,
      soldPercentage: 60,
      features: ["3 Years Warranty", "Genuine Guaranteed", "Free Shipping From USA"],
      badge: "HOT DEAL",
    },
    {
      id: 3,
      category: "SMARTPHONE",
      name: "Latest 5G Smartphone with Advanced Camera",
      image: "/placeholder.svg?height=300&width=300&text=Smartphone",
      originalPrice: 899.0,
      salePrice: 799.0,
      discount: 11,
      rating: 5,
      inStock: 45,
      totalStock: 150,
      soldPercentage: 70,
      features: ["2 Years Warranty", "Genuine Guaranteed", "Free Shipping From USA"],
      badge: "LIMITED",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(deals.length / 2))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(deals.length / 2)) % Math.ceil(deals.length / 2))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={14} className={`${i < rating ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`} />
    ))
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">DEALS OF THE DAY</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={prevSlide}
              className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 border border-gray-200">
              <Grid3X3 size={20} className="text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Black Friday Banner */}
          <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-800 rounded-2xl p-8 text-white relative overflow-hidden" style={{backgroundImage:"url(./images/deals.jpg)"}}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-lg rotate-45"></div>
            <div className="absolute bottom-8 left-8 w-6 h-6 border-2 border-white/20 rounded-full"></div>

            {/* Star Decorations */}
            <div className="absolute top-12 left-12">
              <div className="w-4 h-4 bg-white/20 transform rotate-45 relative">
                <div className="absolute inset-1 bg-white/40 transform -rotate-45"></div>
              </div>
            </div>
            <div className="absolute bottom-20 right-12">
              <div className="w-6 h-6 bg-white/15 transform rotate-45 relative">
                <div className="absolute inset-1 bg-white/30 transform -rotate-45"></div>
              </div>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-center">
              <div className="text-xs font-semibold mb-4 opacity-80">END OF SEASON</div>
              <h3 className="text-4xl font-black mb-6 leading-tight">
              DEALS OF 
                <br />
                THE DAY
              </h3>
              <div className="space-y-2">
                <div className="text-sm opacity-90">Up to</div>
                <div className="text-2xl font-bold">70% OFF</div>
                <div className="text-xs opacity-80">Selected Items</div>
              </div>
            </div>
          </div>

          {/* Product Cards */}
          {deals.slice(currentSlide * 2, currentSlide * 2 + 2).map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Stock Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-green-600">
                  <Check size={16} />
                  <span className="text-sm font-medium">{deal.inStock} Products in stock</span>
                </div>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">{deal.badge}</span>
              </div>

              {/* Product Image */}
              <div className="relative mb-6">
                <img
                  src={deal.image || "/placeholder.svg"}
                  alt={deal.name}
                  className="w-full h-48 object-contain bg-gray-50 rounded-xl"
                />
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -{deal.discount}%
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-4">
                {deal.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                    <Check size={14} className="text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Countdown Timer */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { value: timeLeft.days.toString().padStart(2, "0"), label: "Days" },
                  { value: timeLeft.hours.toString().padStart(2, "0"), label: "Hours" },
                  { value: timeLeft.minutes.toString().padStart(2, "0"), label: "Mins" },
                  { value: timeLeft.seconds.toString().padStart(2, "0"), label: "Secs" },
                ].map((time, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gray-900 text-white text-lg font-bold py-2 rounded-lg">{time.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{time.label}</div>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>{deal.soldPercentage}% SOLD</span>
                  <span>AVAILABLE {deal.inStock}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${deal.soldPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Category */}
              <div className="text-xs font-semibold text-gray-500 mb-2">{deal.category}</div>

              {/* Product Name */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{deal.name}</h3>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex mr-2">{renderStars(deal.rating)}</div>
                <span className="text-sm text-gray-500">({deal.rating}.0)</span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-red-600">${deal.salePrice.toFixed(2)}</span>
                  <span className="text-lg text-gray-400 line-through">${deal.originalPrice.toFixed(2)}</span>
                </div>
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-{deal.discount}%</div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                  <ShoppingCart size={18} />
                  <span>QUICK ADD</span>
                </button>

                <div className="flex space-x-3">
                  <button className="flex-1 border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <Eye size={16} />
                    <span>Quick View</span>
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <Heart size={16} />
                    <span>Add To Wishlist</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        
      </div>
    </section>
  )
}

export default DealsOfTheDay
