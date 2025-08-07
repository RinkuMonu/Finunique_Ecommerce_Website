"use client"
import type React from "react"
import { useEffect, useState } from "react"
import {
  Eye,
  Heart,
  ShoppingCart,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  Zap,
  Cpu,
  Smartphone,
  Monitor,
  Headphones,
  Camera,
  Gamepad2,
  Tablet,
  Watch,
  Speaker,
  TrendingUp,
  Check,
  Plus,
  ArrowRight,
  Clock,
} from "lucide-react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addItemToWishlist } from "../../reduxslice/WishlistSlice"
import { addItemToCart } from "../../reduxslice/CartSlice"
import LoginModal from "../loginModal/LoginModal"
import Login1 from "../../pages/Login1"

const TrendingProducts = ({
  addToCart,
}: {
  addToCart: (product: any) => void
}) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [itemsPerSlide, setItemsPerSlide] = useState(4)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const dispatch = useDispatch()
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE

  // Popup States
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [addedProduct, setAddedProduct] = useState<any>(null)
  const [isWishlistPopupVisible, setIsWishlistPopupVisible] = useState(false)
  const [wishlistProduct, setWishlistProduct] = useState<any>(null)

  // Electronics category icons mapping
  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      smartphones: <Smartphone size={14} className="text-blue-600" />,
      laptops: <Monitor size={14} className="text-purple-600" />,
      headphones: <Headphones size={14} className="text-green-600" />,
      cameras: <Camera size={14} className="text-orange-600" />,
      gaming: <Gamepad2 size={14} className="text-red-600" />,
      tablets: <Tablet size={14} className="text-cyan-600" />,
      watches: <Watch size={14} className="text-pink-600" />,
      speakers: <Speaker size={14} className="text-indigo-600" />,
      default: <Cpu size={14} className="text-gray-600" />,
    }
    return iconMap[category.toLowerCase()] || iconMap.default
  }

  // Responsive items per slide
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2)
      } else if (window.innerWidth < 1280) {
        setItemsPerSlide(3)
      } else {
        setItemsPerSlide(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    if (products.length === 0) return
    const maxSlides = Math.ceil(products.length / itemsPerSlide)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % maxSlides)
    }, 5000)
    return () => clearInterval(interval)
  }, [products.length, itemsPerSlide])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isModalOpen])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseUrl}/product/getproducts?referenceWebsite=${referenceWebsite}`)
        const data = await res.json()
        if (Array.isArray(data.products)) {
          setProducts(data.products.slice(0, 12)) // Get 12 products for slider
        } else {
          console.error("Unexpected products format:", data)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }
    fetchProducts()
  }, [baseUrl, referenceWebsite])

  const openProductModal = (product: any) => {
    setSelectedProduct(product)
    setQuantity(1)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProduct(null), 300)
  }

  const handleIncrease = () => setQuantity((prev) => prev + 1)
  const handleDecrease = () => quantity > 1 && setQuantity((prev) => prev - 1)

  const handleAddToCart = (product: any) => {
    const token = localStorage.getItem("token")
    const cartItem = {
      id: product._id,
      name: product.productName,
      image: product.images?.[0] || "",
      category: product.category?.name || "Uncategorized",
      price: product.actualPrice || product.price,
      quantity,
    }

    if (!token) {
      // Get existing cart or initialize empty array
      const existingCart = JSON.parse(localStorage.getItem("addtocart") || "[]")
      // Check if product already in cart
      const existingProductIndex = existingCart.findIndex((item: any) => item.id === product._id)
      if (existingProductIndex !== -1) {
        // Product exists – increase quantity
        existingCart[existingProductIndex].quantity += quantity
      } else {
        // New product – add to cart
        existingCart.push(cartItem)
      }
      // Save updated cart back to localStorage
      localStorage.setItem("addtocart", JSON.stringify(existingCart))
      window.dispatchEvent(new Event("guestCartUpdated"))
    } else {
      // User is logged in – use Redux
      dispatch(addItemToCart(cartItem))
    }

    // UI feedback
    setAddedProduct(product)
    setIsPopupVisible(true)
    setTimeout(() => {
      setIsPopupVisible(false)
    }, 3000)
    closeModal()
  }

  const handleAddToWishlist = (product: any) => {
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
        size={12}
        className={`${i < Math.floor(rating) ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`}
      />
    ))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const calculateSavings = (originalPrice: number, actualPrice: number) => {
    return originalPrice - actualPrice
  }

  const maxSlides = Math.ceil(products.length / itemsPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const Image_BaseURL = import.meta.env.VITE_API_BASE_URL_IMAGE

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Modern Header */}
        <div className="flex justify-between align-middle">
        <div className="text-left mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Popular Electronics</h2>
          <p className="text-md text-gray-600">
            Discover the most popular electronics and gadgets loved by our customers
          </p>
        </div>
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 underline text-blue-900 rounded-lg transition-colors duration-200"
          >
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>
        </div>
        

        {/* Products Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center -ml-6 hover:shadow-xl transition-all duration-200 border border-gray-100"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center -mr-6 hover:shadow-xl transition-all duration-200 border border-gray-100"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>

          {/* Slider Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {Array.from({ length: maxSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div
                    className="grid gap-6"
                    style={{
                      gridTemplateColumns: `repeat(${itemsPerSlide}, 1fr)`,
                    }}
                  >
                    {products
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((product, index) => (
                        <div
                        key={product._id}
                        onMouseEnter={() => setHoveredProduct(product._id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                        className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                      >
                        {/* Product Image Container */}
                        <div className="relative aspect-square bg-gray-50 overflow-hidden">
                          <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.productName}
                          />
                      
                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.discount && (
                              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md" style={{ width: "max-content" }}>
                                -{product.discount}%
                              </span>
                            )}
                          </div>
                      
                          {/* Action Buttons */}
                          <div className="absolute top-3 right-3 flex flex-col gap-2">
                            <button
                              onClick={() => handleAddToWishlist(product)}
                              className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200"
                            >
                              <Heart size={16} className="text-gray-600 hover:text-red-500" />
                            </button>
                            <button
                              onClick={() => openProductModal(product)}
                              className={`w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 ${
                                hoveredProduct === product._id ? "opacity-100" : "opacity-0"
                              }`}
                            >
                              <Eye size={16} className="text-gray-600" />
                            </button>
                          </div>
                      
                          {/* Quick Add to Cart Overlay */}
                          <div
                            className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 transition-all duration-300 ${
                              hoveredProduct === product._id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                            }`}
                          >
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="w-full bg-white text-gray-900 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                              <Plus size={16} />
                              Quick Add
                            </button>
                          </div>
                        </div>
                      
                        {/* Product Info */}
                        <div className="p-4 flex-grow">
                          {/* Category & Brand */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5">
                              {getCategoryIcon(product.category?.name || "default")}
                              <span className="text-xs text-gray-500 font-medium">{product.category?.name || "Electronics"}</span>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">Brand</span>
                          </div>
                      
                          {/* Product Name */}
                          <Link
                            to={`/product/${product._id}`}
                            className="block text-gray-900 font-medium text-sm mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200 leading-5"
                          >
                            {product.productName}
                          </Link>
                      
                          {/* Rating & Reviews */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">{renderStars(product.rating || 4)}</div>
                            <span className="text-xs text-gray-500 font-medium">4.5</span>
                            <span className="text-xs text-gray-400">(2.1k reviews)</span>
                          </div>
                      
                          {/* Price Section */}
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xl font-bold text-gray-900">{formatPrice(product.actualPrice)}</span>
                              {product.price && product.price !== product.actualPrice && (
                                <span className="text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
                              )}
                            </div>
                            {product.price && product.price !== product.actualPrice && (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-green-600 font-medium">
                                  Save {formatPrice(calculateSavings(product.price, product.actualPrice))}
                                </span>
                                <span className="text-xs text-gray-500">({product.discount}% off)</span>
                              </div>
                            )}
                          </div>
                      
                          {/* Stock & Delivery Info */}
                          <div className="flex items-center justify-between mb-4 text-xs">
                            <span className="text-green-600 font-medium flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              In Stock
                            </span>
                            <span className="text-gray-500">Free delivery</span>
                          </div>
                        </div>
                      
                        {/* Add to Cart Button at the Bottom */}
                        <div className="p-4">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="w-full bg-[#cf769f] hover:bg-[#BE457E] text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                          >
                            <ShoppingCart size={16} />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                      
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-200 rounded-full ${
                  currentSlide === index ? "w-8 h-2 bg-[#BE457E]" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
       
      </div>

      {/* Success Popups */}
      {isPopupVisible && addedProduct && (
        <div className="fixed top-6 right-6 bg-green-500 text-white p-4 rounded-lg shadow-xl z-50 max-w-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Check size={18} />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Added to Cart!</h4>
              <p className="text-sm opacity-90 line-clamp-1">{addedProduct.productName}</p>
            </div>
            <button onClick={() => setIsPopupVisible(false)} className="text-white/80 hover:text-white">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {isWishlistPopupVisible && wishlistProduct && (
        <div className="fixed top-6 right-6 bg-pink-500 text-white p-4 rounded-lg shadow-xl z-50 max-w-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Heart size={18} />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">Added to Wishlist!</h4>
              <p className="text-sm opacity-90 line-clamp-1">{wishlistProduct.productName}</p>
            </div>
            <button onClick={() => setIsWishlistPopupVisible(false)} className="text-white/80 hover:text-white">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Product Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={closeModal}>
          <div
            className={`relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
              isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-2xl font-bold text-gray-900">{selectedProduct.productName}</h3>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="flex items-center justify-center bg-gray-50 rounded-xl p-8">
                <img
                  className="max-h-96 object-contain"
                  src={selectedProduct.images || "/placeholder.svg"}
                  alt={selectedProduct.productName}
                />
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">{renderStars(selectedProduct.rating || 4)}</div>
                  <span className="font-medium">{selectedProduct.rating || 4.5}</span>
                  <span className="text-gray-500">(2.1k reviews)</span>
                </div>

                {/* Price */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-bold text-gray-900">{formatPrice(selectedProduct.actualPrice)}</span>
                    {selectedProduct.price && selectedProduct.price !== selectedProduct.actualPrice && (
                      <span className="text-xl text-gray-500 line-through">{formatPrice(selectedProduct.price)}</span>
                    )}
                  </div>
                  {selectedProduct.discount && (
                    <span className="text-green-600 font-medium">
                      Save {formatPrice(calculateSavings(selectedProduct.price, selectedProduct.actualPrice))} (
                      {selectedProduct.discount}% off)
                    </span>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedProduct.description ||
                      "Experience cutting-edge technology with this premium electronic device. Featuring advanced specifications and innovative design for the modern tech enthusiast."}
                  </p>
                </div>

                {/* Specifications */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <span className="ml-2 font-medium">{selectedProduct.category?.name || "Electronics"}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Warranty:</span>
                      <span className="ml-2 font-medium text-green-600">2 Years</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Shipping:</span>
                      <span className="ml-2 font-medium">Free Delivery</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Stock:</span>
                      <span className="ml-2 font-medium text-green-600">In Stock</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Zap size={18} />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLoginModal && (
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
          <Login1 />
        </LoginModal>
      )}
    </section>
  )
}

export default TrendingProducts
