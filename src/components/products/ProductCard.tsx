"use client"
import { useState } from "react"
import type React from "react"
import { Heart, ShoppingCart, Star, Zap } from "lucide-react"
import { useDispatch } from "react-redux"
import { addItemToWishlist } from "../../reduxslice/WishlistSlice"
import { addItemToCart } from "../../reduxslice/CartSlice"
import LoginModal from "../loginModal/LoginModal"
import Login1 from "../../pages/Login1"

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
  const [isPopupVisible, setIsPopupVisible] = useState(false)  
    const [addedProduct, setAddedProduct] = useState<any>(null)
  
  const imageUrl = import.meta.env.VITE_API_BASE_URL_IMAGE;
  const [isHovered, setIsHovered] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isWishlistPopupVisible, setIsWishlistPopupVisible] = useState(false)
  const [wishlistProduct, setWishlistProduct] = useState<any>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const dispatch = useDispatch()

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
    setTimeout(() => {
      setIsPopupVisible(false)
    }, 3000)
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
      <div className="group flex gap-4 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#9D3089]/40">
        {/* Image Section */}
        <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
          )}
          <img
            src={`${product.images}`}
            alt={product.productName}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
          />
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow-sm backdrop-blur-sm">
              -{discountPercentage}%
            </div>
          )}
          <button
            onClick={handleAddToWishlist}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90  rounded-full flex items-center justify-center shadow hover:scale-110 transition-all duration-300"
          >
            <Heart size={16} className="text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-between flex-grow min-w-0">
          <div className="space-y-1.5">
            <h3 className="font-semibold text-sm text-gray-800 leading-snug line-clamp-2 group-hover:text-[#9D3089] transition-colors duration-200">
              {product.productName}
            </h3>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              {product.category?.name || "Traditional Wear"}
            </p>
            <div className="flex items-center gap-1">
              {renderStars(product.rating || 4)}
              <span className="text-xs text-gray-500 ml-1">({product.rating || 4.0})</span>
            </div>
          </div>

          {/* Price + Cart Button */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#9D3089] text-base">₹{product.actualPrice.toLocaleString()}</span>
              {product.price && product.price > product.actualPrice && (
                <span className="text-xs text-gray-400 line-through">₹{product.price.toLocaleString()}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="group/btn relative overflow-hidden bg-gradient-to-r from-[#9D3089] to-[#7c226b] text-white px-4 py-2 rounded-xl font-medium text-xs lg:text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"

            >
              <span className="relative z-10 flex items-center gap-2">
                <ShoppingCart size={14} />
                Add to Cart
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#7c226b] to-[#9D3089] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        {/* Wishlist Popup */}
        {isWishlistPopupVisible && (
          <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-slide-in">
            <Heart size={16} className="fill-current" />
            <span className="text-sm font-medium">Added to wishlist!</span>
          </div>
        )}
      </div>
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
      <div
        className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-[#9D3089]/50 overflow-hidden hover:-translate-y-1 "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative rounded-2xl overflow-hidden bg-gray-100 w-full h-[100px] sm:h-[350px] lg:h-[280px]">

          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-2xl" />
          )}
          <img
            src={`${product.images}`}
            alt={product.productName}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-2xl ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 backdrop-blur-md">
              <Zap size={12} className="stroke-white" />
              -{discountPercentage}%
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleAddToWishlist}
            className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-300 z-50"
          >

          
            <Heart size={18} className="text-gray-600 hover:text-red-500 transition-colors" />
          </button>

          {/* Quick Action (for Grid Hover) */}
          <div className={`absolute inset-0 bg-black/10 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
            <div className="absolute bottom-4 left-4 right-4">
              <button
                onClick={handleAddToCart}
                className={`w-full bg-white text-gray-800 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:bg-white flex items-center justify-center gap-2 ${
                  isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <ShoppingCart size={16} />
                Quick Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 leading-relaxed group-hover:text-[#9D3089] transition-colors duration-200">
              {product.productName}
            </h3>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              {product.category?.name || "Traditional Wear"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">{renderStars(product.rating || 4)}</div>
            <span className="text-xs text-gray-500 font-medium">({product.rating || 4.0})</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col">
              <span className="font-bold text-[#9D3089] text-lg">₹{product.actualPrice.toLocaleString()}</span>
              {product.price && product.price > product.actualPrice && (
                <span className="text-xs text-gray-400 line-through">₹{product.price.toLocaleString()}</span>
              )}
            </div>
              <button
                onClick={handleAddToCart}
                className="group/btn relative overflow-hidden bg-gradient-to-r from-[#9D3089] to-[#7c226b] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 min-w-[120px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <ShoppingCart size={16} />
                  Add to Cart
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#7c226b] to-[#9D3089] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </button>

          </div>
        </div>

        {/* Wishlist Popup */}
        {isWishlistPopupVisible && (
          <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-slide-in">
            <Heart size={16} className="fill-current" />
            <span className="text-sm font-medium">Added to wishlist!</span>
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

export default ProductCard
