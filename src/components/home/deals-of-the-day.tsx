"use client"

import { useEffect, useState } from "react"
import {
  ChevronLeft, ChevronRight, Grid3X3, Eye, Heart, ShoppingCart, Star, Check
} from "lucide-react"
import { addItemToCart } from "../../reduxslice/CartSlice"
import { useDispatch } from "react-redux"

const baseUrl = import.meta.env.VITE_API_BASE_URL
const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE

const DealsOfTheDay = () => {
    const dispatch = useDispatch()
      const [addedProduct, setAddedProduct] = useState<any>(null)
    const [isPopupVisible, setIsPopupVisible] = useState(false)  
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const [deals, setDeals] = useState([])
  const [dealTimers, setDealTimers] = useState({})

  // 🔢 Utility to calculate time left
  const calculateTimeLeft = (endTime) => {
    const now = new Date().getTime()
    const distance = endTime - now

    if (distance <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds }
  }

  // 🟢 Fetch deals from backend
  useEffect(() => {
    let intervals = []

    const fetchDeals = async () => {
      try {
        const res = await fetch(`${baseUrl}/product/getdeals`)
        const data = await res.json()
        setDeals(data.deals)

        const timers = {}
        data.deals.forEach((deal) => {
          const endTime = new Date(deal.dealOfTheDay.endTime).getTime()
          timers[deal._id] = calculateTimeLeft(endTime)

          const interval = setInterval(() => {
            setDealTimers(prev => ({
              ...prev,
              [deal._id]: calculateTimeLeft(endTime),
            }))
          }, 1000)

          intervals.push(interval)
        })

        setDealTimers(timers)
      } catch (error) {
        console.error("Failed to fetch deals:", error)
      }
    }

    fetchDeals()

    // 🔴 Cleanup intervals on unmount
    return () => {
      intervals.forEach(clearInterval)
    }
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(deals.length / 2))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(deals.length / 2)) % Math.ceil(deals.length / 2))
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={14} className={`${i < rating ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`} />
    ))
  }
const handleAddToCart = (e: React.MouseEvent, deal: any) => {
  console.log("Adding to cart:", deal)
  e.preventDefault();
  e.stopPropagation();

  const token = localStorage.getItem("token");

  const cartItem = {
    id: deal._id,
    name: deal.productName,
    image: deal.images?.[0] || "",
    category: deal.category?.name || "Uncategorized",
    price: deal.actualPrice,
    quantity: 1,
  };

  if (!token) {
    // Guest user: Use localStorage
    const existingCart = JSON.parse(localStorage.getItem("addtocart") || "[]");
    const existingIndex = existingCart.findIndex((item: any) => item.id === deal._id);

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("addtocart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("guestCartUpdated"));
  } else {
    // Logged-in user: Use Redux
    dispatch(addItemToCart(cartItem));
  }

  setAddedProduct(deal);
  setIsPopupVisible(true);
  setTimeout(() => {
    setIsPopupVisible(false);
  }, 2000);
};

  return (
    <>
    {isPopupVisible && addedProduct && (
              <div className="fixed top-6 right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-2xl z-50 transition-all duration-500 transform translate-x-0 opacity-100 border border-white/20 backdrop-blur-sm">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <ShoppingCart size={18} />
                    </div>
                    <div>
                      <span className="font-bold">Added to Cart!</span>
                      <p className="text-sm opacity-90">{addedProduct.productName}</p>
                    </div>
                  </div>
                  
                </div>
              </div>
            )}
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">DEALS OF THE DAY</h2>
          <div className="flex items-center space-x-4">
            <button onClick={prevSlide} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 border border-gray-200">
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 border border-gray-200">
              <Grid3X3 size={20} className="text-gray-600" />
            </button>
            <button onClick={nextSlide} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 border border-gray-200">
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Banner */}
          <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-800 rounded-2xl p-8 text-white relative overflow-hidden" style={{ backgroundImage: "url(./images/deals.jpg)" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-lg rotate-45"></div>
            <div className="absolute bottom-8 left-8 w-6 h-6 border-2 border-white/20 rounded-full"></div>
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
                DEALS OF <br /> THE DAY
              </h3>
              <div className="space-y-2">
                <div className="text-sm opacity-90">Up to</div>
                <div className="text-2xl font-bold">70% OFF</div>
                <div className="text-xs opacity-80">Selected Items</div>
              </div>
            </div>
          </div>

          {/* Product Cards */}
          {deals.slice(currentSlide * 2, currentSlide * 2 + 2).map((deal, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-green-600">
                  <Check size={16} />
                  <span className="text-sm font-medium">In stock</span>
                </div>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">DEAL</span>
              </div>

              <div className="relative mb-6">
                <img
                  src={deal.images[0] || "/placeholder.svg"}
                  alt={deal.productName}
                  className="w-full h-48 object-contain bg-gray-50 rounded-xl"
                />
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -{deal.discount}%
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Check size={14} className="text-green-500" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Check size={14} className="text-green-500" />
                  <span>Guaranteed Genuine</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { value: dealTimers[deal._id]?.days ?? 0, label: "Days" },
                  { value: dealTimers[deal._id]?.hours ?? 0, label: "Hours" },
                  { value: dealTimers[deal._id]?.minutes ?? 0, label: "Mins" },
                  { value: dealTimers[deal._id]?.seconds ?? 0, label: "Secs" },
                ].map((time, i) => (
                  <div key={i} className="text-center">
                    <div className="bg-gray-900 text-white text-lg font-bold py-2 rounded-lg">
                      {String(time.value).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{time.label}</div>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>50% SOLD</span>
                  <span>Available</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-300" style={{ width: `50%` }}></div>
                </div>
              </div>

              <div className="text-xs font-semibold text-gray-500 mb-2">{deal.category}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{deal.productName}</h3>
              <div className="flex items-center mb-4">
                <div className="flex mr-2">{renderStars(4)}</div>
                <span className="text-sm text-gray-500">(4.0)</span>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-red-600">₹{deal.actualPrice.toFixed(2)}</span>
                  <span className="text-lg text-gray-400 line-through">₹{deal.price.toFixed(2)}</span>
                </div>
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-{deal.discount}%</div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={(e) => handleAddToCart(e, deal)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={18} />
                  <span>QUICK ADD</span>
                </button>

                {/* <div className="flex space-x-3">
                  <button className="flex-1 border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <Eye size={16} />
                    <span>Quick View</span>
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <Heart size={16} />
                    <span>Add To Wishlist</span>
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}

export default DealsOfTheDay
