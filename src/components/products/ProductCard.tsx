"use client"
import { useState } from "react"
import type React from "react"
import { Check, Heart, ShoppingCart, Star, Zap } from "lucide-react"
import { useDispatch } from "react-redux"
import { addItemToWishlist } from "../../reduxslice/WishlistSlice"
import { addItemToCart } from "../../reduxslice/CartSlice"
import LoginModal from "../loginModal/LoginModal"
import Login1 from "../../pages/Login1"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom"
interface Product {
  _id: string
  productName: string
  description: string
  images: string[]
  actualPrice: number
  price?: number
  discount?: number
  size?: string
  brand?: string
  category: {
    _id: string
    name: string
  }
  rating?: number
}

interface ProductCardProps {
  product: Product
  listView?: boolean
}

const ProductCard = ({ product, listView }: ProductCardProps) => {
  console.log("product images = ", product);
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [addedProduct, setAddedProduct] = useState<any>(null)

  const imageUrl = import.meta.env.VITE_API_BASE_URL_IMAGE;
  // const [isHovered, setIsHovered] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isWishlistPopupVisible, setIsWishlistPopupVisible] = useState(false)
  const [wishlistProduct, setWishlistProduct] = useState<any>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const dispatch = useDispatch()
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isInCart, setIsInCart] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const token = localStorage.getItem("token")
    const cartItem = {
      id: product._id,
      name: product.productName,
      image: product.images?.[0] || "",
      category: product.category?.name || "Uncategorized",
      price: product.actualPrice,
      quantity: 1,
    }
    if (!token) {
      // Guest user: Use localStorage
      const existingCart = JSON.parse(localStorage.getItem("addtocart") || "[]")
      const existingIndex = existingCart.findIndex((item: any) => item.id === product._id)
      if (existingIndex !== -1) {
        existingCart[existingIndex].quantity += 1
      } else {
        existingCart.push(cartItem)
      }
      localStorage.setItem("addtocart", JSON.stringify(existingCart))
      window.dispatchEvent(new Event("guestCartUpdated"))
    } else {
      // Logged-in user: Use Redux
      dispatch(addItemToCart(cartItem))
    }
    setAddedProduct(product)
    setIsPopupVisible(true)
    setIsInCart(true)
    setTimeout(() => {
      setIsPopupVisible(false)
    }, 2000)
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const isUserLoggedIn = !!localStorage.getItem("token")
    if (!isUserLoggedIn) {
      setShowLoginModal(true) // Trigger login modal
      return
    }

    dispatch(addItemToWishlist(product._id))
    setWishlistProduct(product)
    setIsWishlistPopupVisible(true)
    setIsInWishlist(true)
    setTimeout(() => {
      setIsWishlistPopupVisible(false)
    }, 3000)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={`${i < Math.floor(rating) ? "fill-yellow-400 stroke-yellow-400" : "fill-gray-200 stroke-gray-300"} transition-colors duration-200`}
      />
    ))
  }

  const discountPercentage =
    product.price && product.actualPrice
      ? Math.round(((product.price - product.actualPrice) / product.price) * 100)
      : product.discount || 0

  if (listView) {
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
        <div className="group flex gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#9D3089]/40">
          {/* Image Section - Responsive sizing */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
            )}
            <div className="group">
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                className="rounded-2xl w-full h-[350px] sm:h-[400px] lg:h-[450px]"
              >
                {product.images?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-100">
                      {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-2xl" />
                      )}
                      <img
                        src={img}
                        alt={`${product.productName} ${index}`}
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-2xl ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                        onLoad={() => setImageLoaded(true)}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {discountPercentage > 0 && (
              <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-red-600 text-white text-[8px] sm:text-[10px] font-semibold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-sm backdrop-blur-sm">
                -{discountPercentage}%
              </div>
            )}
            <button
              onClick={handleAddToWishlist}
              className="absolute top-1 right-1 sm:top-2 sm:right-2 w-6 h-6 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center shadow hover:scale-110 transition-all duration-300"
            >
              <Heart size={12} className="sm:w-4 sm:h-4 text-gray-600 hover:text-red-500 transition-colors" />
            </button>
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-between flex-grow min-w-0">
            <div className="space-y-1 sm:space-y-1.5">
              <h3 className="font-semibold text-xs sm:text-sm md:text-sm text-gray-800 leading-snug line-clamp-2 group-hover:text-[#9D3089] transition-colors duration-200">
                {product.productName}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide">
                {product.category?.name || "Traditional Wear"}
              </p>
              <div className="flex items-center gap-1">
                {renderStars(product.rating || 4)}
                <span className="text-[10px] sm:text-xs text-gray-500 ml-1">({product.rating || 4.0})</span>
              </div>
            </div>

            {/* Price + Cart Button */}
            <div className="flex items-center justify-between mt-2 sm:mt-3 gap-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-bold text-[#9D3089] text-sm sm:text-base">₹{Math.floor(product?.actualPrice)}</span>
                {product.price && product.price > product.actualPrice && (
                  <span className="text-[10px] sm:text-xs text-gray-400 line-through">₹{Math.floor(product?.price)}</span>
                )}
              </div>
              <button
                onClick={handleAddToCart}
                className="group/btn relative overflow-hidden bg-gradient-to-r from-[#9D3089] to-[#7c226b] text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-medium text-[10px] sm:text-xs lg:text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 flex-shrink-0"
              >
                <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                  <ShoppingCart size={12} className="sm:w-3.5 sm:h-3.5" />
                  <span className="hidden xs:inline sm:inline">Add to Cart</span>
                  <span className="xs:hidden sm:hidden">Add</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#7c226b] to-[#9D3089] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>

          {/* Wishlist Popup */}
          {isWishlistPopupVisible && (
            <div className="fixed top-5 right-5 bg-green-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-slide-in">
              <Heart size={14} className="sm:w-4 sm:h-4 fill-current" />
              <span className="text-xs sm:text-sm font-medium">Added to wishlist!</span>
            </div>
          )}
        </div>
        {showLoginModal && (
          <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
            <Login1 />
          </LoginModal>
        )}
      </>
    )
  }

  // Default Grid View
  return (
    <>
      {/* Enhanced Product Added Popup */}
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
      <Link
        to={`/product/${product._id}`}
        className="group relative w-full max-w-xs bg-white border border-gray-200 rounded-sm p-4 text-left hover:shadow-md transition-all duration-300 overflow-hidden"
      >
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute rounded-sm top-3 left-3 bg-orange-100 text-orange-500 text-xs z-10 font-semibold px-2 py-0.5 ">
            -₹{Math.floor(product.price - product.actualPrice)}
          </div>
        )}

        {/* Image with Center Hover Icons */}
        <div className="relative w-full flex items-center justify-center mb-4">
          <img
            src={product.images?.[0]}
            alt={product.productName}
            className="max-h-full h-[255px] max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />

          {/* Center Hover Icons */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
            {/* Wishlist */}
            <button
              onClick={handleAddToWishlist}
              className="w-9 h-9 bg-[#dd67c7] text-white rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform"
            >
              <Heart
                size={16}
                className={`transition-colors ${isInWishlist ? "fill-red-500 stroke-red-500" : "text-white hover:text-red-500"}`}
              />
            </button>

            {/* Cart */}
            <button
              onClick={handleAddToCart}
              className="w-9 h-9 bg-[#dd67c7] text-white rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform"
            >
              {isInCart ? (
                <Check size={16} className="text-green-200" />
              ) : (
                <ShoppingCart size={16} className="text-white hover:text-[#9D3089]" />
              )}
            </button>
          </div>

        </div>

        {/* Text Section */}
        <div className="text-left space-y-2 mt-3">
          {/* Subcategory */}
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            {product.category?.name || "Product"}
          </p>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
            {product.productName}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            {product.price && product.price > product.actualPrice && (
              <span className="text-sm text-gray-400 line-through">₹{Math.floor(product.price)}</span>
            )}
            <span className="text-sm font-bold text-[#9D3089]">
              ₹{Math.floor(product.actualPrice)}
            </span>
          </div>
        </div>
      </Link>


      {showLoginModal && (
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
          <Login1 />
        </LoginModal>
      )}
    </>
  )

}

export default ProductCard
