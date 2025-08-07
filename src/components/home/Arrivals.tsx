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
console.log(selectedProduct);

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
        <div className="text-left mb-12">
          <div className="md:flex justify-between">
            <div className="right">
            <h2 className="text-xl font-bold text-gray-900">Latest Products</h2>
          <p className="text-md text-gray-600 max-w-2xl">
            Discover our newest collection of premium products just added to our store
          </p>
            </div>

          <Link
            to="/products"
            className="inline-flex items-center space-x-2  text-black underline font-medium md:px-6 py-3 rounded-md transition-colors duration-200"
          >
            <span>View All Products</span>
            <ChevronRight size={16} />
          </Link>
          </div>

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
                     className="group bg-white rounded-md border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden"
                   >
                     {/* Discount badge */}
                     {product.price && product.actualPrice && (
                       <div className="absolute top-2 left-2 bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-0.5 rounded-sm z-10">
                         -<span className="rupee">₹</span>{Math.floor(product.price - product.actualPrice)}
                       </div>
                     )}

                     {/* Product image with hover icons */}
                     <div className="relative aspect-square overflow-hidden bg-white">
                       <img
                         src={product.images[0]}
                         alt={product.productName}
                         className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                       />

                       {/* Hover Icons */}
                       <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5">
                         <button
                           onClick={() => handleAddToWishlist(product)}
                           className="w-10 h-10 bg-pink-400 text-white rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform"
                         >
                           <Heart size={18} />
                         </button>
                         <button
                           onClick={() => openProductModal(product)}
                           className="w-10 h-10 bg-pink-400 text-white rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform"
                         >
                           <ShoppingCart size={18} />
                         </button>
                       </div>
                     </div>

                     {/* Product Info */}
                     <div className="p-4">
                       <p className="text-xs text-gray-400 uppercase font-medium tracking-wide mb-1">
                         {product.category?.name || "Category"}
                       </p>

                       <Link
                         to={`/product/${product._id}`}
                         className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2 hover:text-[#9D3089] transition-colors duration-200"
                       >
                         {product.productName}
                       </Link>

                       <div className="mt-2 flex items-center gap-2">
                         {product.price && product.price > product.actualPrice && (
                           <span className="text-sm text-gray-400 line-through"><span className="rupee">₹</span>{product.price}</span>
                         )}
                         <span className="text-sm font-bold text-[#9D3089]"><span className="rupee">₹</span>{product.actualPrice}</span>
                       </div>
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
                  src={selectedProduct?.images[0] }
                  alt={selectedProduct?.productName}
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
                  <span className="text-3xl font-bold text-gray-900"><span className="rupee">₹</span>{selectedProduct.actualPrice}</span>
                  {selectedProduct.price && selectedProduct.price !== selectedProduct.actualPrice && (
                    <span className="text-lg text-gray-400 line-through"><span className="rupee">₹</span>{selectedProduct.price}</span>
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