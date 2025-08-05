"use client"

import { useEffect, useState } from "react"
import { Eye, Heart, ShoppingCart, Star, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addItemToWishlist } from "../../reduxslice/WishlistSlice"
import { addItemToCart } from "../../reduxslice/CartSlice"
import LoginModal from "../loginModal/LoginModal"
import Login1 from "../../pages/Login1"

const Arrivals = ({ addToCart }: { addToCart: (product: any) => void }) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [itemsPerSlide, setItemsPerSlide] = useState(4)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const dispatch = useDispatch()

  // Popup States
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [addedProduct, setAddedProduct] = useState<any>(null)
  const [isWishlistPopupVisible, setIsWishlistPopupVisible] = useState(false)
  const [wishlistProduct, setWishlistProduct] = useState<any>(null)

  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE
  const Image_BaseURL = import.meta.env.VITE_API_BASE_URL_IMAGE

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
    }, 4000)
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
        const res = await fetch(
          `${baseUrl}/product/getproducts?referenceWebsite=${referenceWebsite}`
        )
        const data = await res.json()
        if (Array.isArray(data.products)) {
          setProducts(data.products.slice(5, 17)) // Get 12 products for slider
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={`${i < Math.floor(rating) ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`}
      />
    ))
  }

  const handleAddToWishlist = (product: any) => {
    const isUserLoggedIn = !!localStorage.getItem("token")
    if (!isUserLoggedIn) {
      setShowLoginModal(true)
      return
    }
    dispatch(addItemToWishlist(product._id))
    setWishlistProduct(product)
    setIsWishlistPopupVisible(true)
    setTimeout(() => {
      setIsWishlistPopupVisible(false)
    }, 3000)
  }

  // const baseUrl = import.meta.env.VITE_API_BASE_URL
  // const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseUrl}/product/getproducts?referenceWebsite=${referenceWebsite}`)
        const data = await res.json()
        if (Array.isArray(data.products)) {
          setProducts(data.products.slice(5, 17))
        } else {
          console.error("Unexpected products format:", data)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }
    fetchProducts()
  }, [baseUrl, referenceWebsite])

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

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Modern Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            <span>New Arrivals</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our newest collection of premium products just added to our store
          </p>
        </div>

        {/* Products Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
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
          </button>

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
                    className="grid gap-6"
                    style={{
                      gridTemplateColumns: `repeat(${itemsPerSlide}, 1fr)`,
                    }}
                  >
                    {products.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((product) => (
                      <div
                        key={product._id}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300 group"
                        onMouseEnter={() => setHoveredProduct(product._id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        {/* Product Image Container */}
                        <div className="relative aspect-square overflow-hidden bg-gray-50">
                          <img
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            src={`${Image_BaseURL}${product.images}`}
                            alt={product.productName}
                          />

                          {/* New Badge */}
                          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                            NEW
                          </div>

                          {/* Discount Badge */}
                          {product.discount && (
                            <div className="absolute top-3 left-3 mt-8 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                              -{product.discount}%
                            </div>
                          )}

                          {/* Wishlist Button */}
                          <button
                            onClick={() => handleAddToWishlist(product)}
                            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                          >
                            <Heart size={16} className="text-gray-600 hover:text-red-500" />
                          </button>

                          {/* Quick View Button */}
                          <button
                            onClick={() => openProductModal(product)}
                            className={`absolute bottom-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-200 ${
                              hoveredProduct === product._id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                            }`}
                          >
                            <Eye size={16} className="text-gray-600" />
                          </button>
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                          {/* Category */}
                          <div className="flex items-center mb-2">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {product.category?.name || "New Arrival"}
                            </span>
                          </div>

                          {/* Product Name */}
                          <Link
                            to={`/product/${product._id}`}
                            className="block text-gray-900 font-medium text-sm mb-2 line-clamp-2 hover:text-green-600 transition-colors duration-200"
                          >
                            {product.productName}
                          </Link>

                          {/* Rating */}
                          <div className="flex items-center mb-3">
                            <div className="flex items-center mr-2">{renderStars(product.rating || 4)}</div>
                            <span className="text-xs text-gray-500">(Reviews)</span>
                          </div>

                          {/* Price */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-gray-900">₹{product.actualPrice}</span>
                              {product.price && product.price !== product.actualPrice && (
                                <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                              )}
                            </div>
                            <div className="text-xs text-green-600 font-medium">In Stock</div>
                          </div>

                          {/* Add to Cart Button */}
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
                          >
                            <ShoppingCart size={16} />
                            <span>Add to Cart</span>
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
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentSlide === index ? "bg-blue-600 w-8 shadow-lg" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors duration-200"
          >
            <span>View All Products</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      {/* Success Popups */}
      {isPopupVisible && addedProduct && (
        <div className="fixed top-6 right-6 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <ShoppingCart size={16} />
              <div>
                <span className="font-medium text-sm">Added to Cart!</span>
                <p className="text-xs opacity-90">{addedProduct.productName}</p>
              </div>
            </div>
            <button onClick={() => setIsPopupVisible(false)} className="ml-3 hover:scale-110 transition-transform">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {isWishlistPopupVisible && wishlistProduct && (
        <div className="fixed top-6 right-6 bg-pink-500 text-white p-4 rounded-lg shadow-lg z-50 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart size={16} />
              <div>
                <span className="font-medium text-sm">Added to Wishlist!</span>
                <p className="text-xs opacity-90">{wishlistProduct.productName}</p>
              </div>
            </div>
            <button
              onClick={() => setIsWishlistPopupVisible(false)}
              className="ml-3 hover:scale-110 transition-transform"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className={`relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
              isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white p-6 border-b flex justify-between items-center rounded-t-2xl">
              <h3 className="text-2xl font-bold text-gray-900">{selectedProduct.productName}</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="flex items-center justify-center bg-gray-50 rounded-xl p-8">
                <img
                  className="rounded-xl object-contain max-h-[400px] shadow-lg"
                  src={`${Image_BaseURL}${selectedProduct.images}`}
                  alt={selectedProduct.productName}
                />
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex">{renderStars(selectedProduct.rating || 4)}</div>
                  <span className="text-sm text-gray-500">(Reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">₹{selectedProduct.actualPrice}</span>
                  {selectedProduct.price && selectedProduct.price !== selectedProduct.actualPrice && (
                    <span className="text-lg text-gray-400 line-through">₹{selectedProduct.price}</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {selectedProduct.description ||
                    "Premium quality product crafted with attention to detail. Perfect for those who appreciate quality and style."}
                </p>

                {/* Product Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-4 text-gray-900">Product Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Category</span>
                      <p className="font-medium">{selectedProduct.category?.name || "New Arrival"}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Brand</span>
                      <p className="font-medium">Premium Brand</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Availability</span>
                      <p className="font-medium text-green-600">In Stock</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Shipping</span>
                      <p className="font-medium">Free Delivery</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Buy Now</span>
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

export default Arrivals