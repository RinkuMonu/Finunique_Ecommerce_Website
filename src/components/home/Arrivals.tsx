"use client"

import { useEffect, useState, useMemo } from "react"
import { Eye, Heart, ShoppingCart, Star, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addItemToWishlist } from "../../reduxslice/WishlistSlice"
import { addItemToCart } from "../../reduxslice/CartSlice"
import LoginModal from "../loginModal/LoginModal"
import Login1 from "../../pages/Login1"

type Variant = {
  sku: string
  options?: { color?: string; storage?: string }
  images?: string[]
  pricing?: { mrp?: number; price?: number; currency?: string }
  inventory?: { totalStock?: number; lowStockThreshold?: number }
  status?: string
  isDefault?: boolean
}

type Product = {
  _id: string
  productName: string
  category?: { name?: string }
  images?: string[]
  variants: Variant[]
  selectedVariant?: Variant
  description?: string
  rating?: { avg?: number; count?: number } | number
}

const Arrivals = ({ addToCart }: { addToCart: (product: any) => void }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [itemsPerSlide, setItemsPerSlide] = useState(4)
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Popups
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [addedProduct, setAddedProduct] = useState<any>(null)
  const [isWishlistPopupVisible, setIsWishlistPopupVisible] = useState(false)
  const [wishlistProduct, setWishlistProduct] = useState<any>(null)

  const dispatch = useDispatch()

  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE

  // Helpers
  const getDefaultVariant = (p: Product): Variant | null => {
    if (!p?.variants?.length) return null
    return p.selectedVariant || p.variants.find((v) => v.isDefault) || p.variants[0]
  }

  // Unique option lists for modal
  const availableColors = useMemo(() => {
    if (!selectedProduct) return []
    const set = new Set<string>()
    selectedProduct.variants?.forEach((v) => v.options?.color && set.add(v.options.color))
    return Array.from(set)
  }, [selectedProduct])

  const availableStorages = useMemo(() => {
    if (!selectedProduct) return []
    const set = new Set<string>()
    selectedProduct.variants?.forEach((v) => v.options?.storage && set.add(v.options.storage))
    return Array.from(set)
  }, [selectedProduct])

  const [chosenColor, setChosenColor] = useState<string | undefined>(undefined)
  const [chosenStorage, setChosenStorage] = useState<string | undefined>(undefined)

  // Responsive items per slide
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerSlide(1)
      else if (window.innerWidth < 1024) setItemsPerSlide(2)
      else if (window.innerWidth < 1280) setItemsPerSlide(3)
      else setItemsPerSlide(4)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-slide
  useEffect(() => {
    if (products.length === 0) return
    const maxSlides = Math.ceil(products.length / itemsPerSlide)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % maxSlides)
    }, 4000)
    return () => clearInterval(interval)
  }, [products.length, itemsPerSlide])

  // Body scroll lock for modal
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isModalOpen])

  // Fetch products (list)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseUrl}/product/getproducts?referenceWebsite=${referenceWebsite}`)
        const data = await res.json()
        
        if (Array.isArray(data.products)) {
          console.log(data.products);
          setProducts(data.products.slice(0,10))
        } else {
          console.error("Unexpected products format:", data)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }
    fetchProducts()
  }, [baseUrl, referenceWebsite])

  // Modal handlers
  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    const v = getDefaultVariant(product)
    setSelectedVariant(v)
    setChosenColor(v?.options?.color)
    setChosenStorage(v?.options?.storage)
    setQuantity(1)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedProduct(null)
      setSelectedVariant(null)
    }, 300)
  }

  const handleIncrease = () => setQuantity((prev) => prev + 1)
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev))

  // Variant change from option pills
  const updateVariantFromOptions = (color?: string, storage?: string) => {
    if (!selectedProduct) return
    const next = selectedProduct.variants.find(
      (v) =>
        (color ? v.options?.color === color : true) &&
        (storage ? v.options?.storage === storage : true)
    )
    if (next) setSelectedVariant(next)
  }

  // Wishlist
  const handleAddToWishlist = (product: Product) => {
    const isUserLoggedIn = !!localStorage.getItem("token")
    if (!isUserLoggedIn) {
      setShowLoginModal(true)
      return
    }
    dispatch(addItemToWishlist(product._id))
    setWishlistProduct(product)
    setIsWishlistPopupVisible(true)
    setTimeout(() => setIsWishlistPopupVisible(false), 3000)
  }

  // Cart
  const handleAddToCart = (product: Product, variantArg?: Variant | null) => {
    const token = localStorage.getItem("token")
    const v = variantArg || getDefaultVariant(product)

    const img = v?.images?.[0] || product.images?.[0] || ""
    const mrp = v?.pricing?.mrp ?? 0
    const price = v?.pricing?.price ?? 0

    // Ensure different variants are unique in cart
    const itemId = `${product._id}:${v?.sku || "default"}`

    const cartItem = {
      id: itemId,
      productId: product._id,
      sku: v?.sku,
      name: product.productName,
      image: img,
      category: product.category?.name || "Uncategorized",
      mrp,
      price,
      quantity,
      options: v?.options || {},
    }

    if (!token) {
      const existingCart = JSON.parse(localStorage.getItem("addtocart") || "[]")
      const idx = existingCart.findIndex((i: any) => i.id === itemId)
      if (idx !== -1) {
        existingCart[idx].quantity += quantity
      } else {
        existingCart.push(cartItem)
      }
      localStorage.setItem("addtocart", JSON.stringify(existingCart))
      window.dispatchEvent(new Event("guestCartUpdated"))
    } else {
      dispatch(addItemToCart(cartItem))
    }

    setAddedProduct({ productName: `${product.productName} (${v?.options?.color || ""} ${v?.options?.storage || ""})` })
    setIsPopupVisible(true)
    setTimeout(() => setIsPopupVisible(false), 3000)
    closeModal()
  }

  const renderStars = (ratingValue?: number | { avg?: number; count?: number }) => {
    const r = typeof ratingValue === "number" ? ratingValue : (ratingValue?.avg ?? 4)
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={`${i < Math.floor(r) ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`}
      />
    ))
  }

  const maxSlides = Math.ceil(products.length / itemsPerSlide)
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % maxSlides)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides)
  const goToSlide = (index: number) => setCurrentSlide(index)

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-left mb-12">
          <div className="md:flex justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Latest Products</h2>
              <p className="text-md text-gray-600 max-w-2xl">
                Discover our newest collection of premium products just added to our store
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 text-black underline font-medium md:px-6 py-3 rounded-md transition-colors duration-200"
            >
              <span>View All Products</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Arrows */}
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

          {/* Slides */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: maxSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div
                    className="grid gap-6"
                    style={{ gridTemplateColumns: `repeat(${itemsPerSlide}, 1fr)` }}
                  >
                    {products
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((product) => {
                        const v = getDefaultVariant(product)
                        const mrp = v?.pricing?.mrp ?? 0
                        const price = v?.pricing?.price ?? 0
                        const hasDiscount = mrp > price
                        const img = v?.images?.[0] || product.images?.[0] || ""

                        return (
                          <div
                            key={product._id + (v?.sku || "")}
                            className="group bg-white rounded-md border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden relative"
                          >
                            {/* Discount badge */}
                            {hasDiscount && (
                              <div className="absolute top-2 left-2 bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-0.5 rounded-sm z-10">
                                -<span className="rupee">₹</span>
                                {Math.floor(mrp - price)}
                              </div>
                            )}

                            {/* Image */}
                            <div className="relative aspect-square overflow-hidden bg-white">
                              <img
                                src={img}
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

                            {/* Info */}
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
                                {hasDiscount && (
                                  <span className="text-sm text-gray-400 line-through">
                                    <span className="rupee">₹</span>
                                    {mrp}
                                  </span>
                                )}
                                <span className="text-sm font-bold text-[#9D3089]">
                                  <span className="rupee">₹</span>
                                  {price}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
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
      {isModalOpen && selectedProduct && selectedVariant && (
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
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white p-6 border-b flex justify-between items-center rounded-t-2xl">
              <h3 className="text-2xl font-bold text-gray-900">{selectedProduct.productName}</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image */}
              <div className="flex items-center justify-center bg-gray-50 rounded-xl p-8">
                <img
                  className="rounded-xl object-contain max-h-[400px] shadow-lg"
                  src={selectedVariant?.images?.[0] || selectedProduct.images?.[0] || ""}
                  alt={selectedProduct.productName}
                />
              </div>

              {/* Details */}
              <div className="space-y-6">
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex">{renderStars(selectedProduct.rating as any)}</div>
                  <span className="text-sm text-gray-500">(Reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">
                    <span className="rupee">₹</span>
                    {selectedVariant?.pricing?.price ?? 0}
                  </span>
                  {!!selectedVariant?.pricing?.mrp &&
                    selectedVariant?.pricing?.mrp > (selectedVariant?.pricing?.price ?? 0) && (
                      <span className="text-lg text-gray-400 line-through">
                        <span className="rupee">₹</span>
                        {selectedVariant?.pricing?.mrp}
                      </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {selectedProduct.description ||
                    "Premium quality product crafted with attention to detail. Perfect for those who appreciate quality and style."}
                </p>

                {/* Variant Pickers */}
                <div className="space-y-4">
                  {availableColors.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Color</h4>
                      <div className="flex flex-wrap gap-2">
                        {availableColors.map((c) => (
                          <button
                            key={c}
                            onClick={() => {
                              setChosenColor(c)
                              updateVariantFromOptions(c, chosenStorage)
                            }}
                            className={`px-3 py-1 rounded-full border text-sm transition ${
                              chosenColor === c ? "bg-gray-900 text-white border-gray-900" : "border-gray-300"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {availableStorages.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Storage</h4>
                      <div className="flex flex-wrap gap-2">
                        {availableStorages.map((s) => (
                          <button
                            key={s}
                            onClick={() => {
                              setChosenStorage(s)
                              updateVariantFromOptions(chosenColor, s)
                            }}
                            className={`px-3 py-1 rounded-full border text-sm transition ${
                              chosenStorage === s ? "bg-gray-900 text-white border-gray-900" : "border-gray-300"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Meta */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-4 text-gray-900">Product Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Category</span>
                      <p className="font-medium">{selectedProduct.category?.name || "New Arrival"}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Variant</span>
                      <p className="font-medium">
                        {selectedVariant?.options?.color || "-"} {selectedVariant?.options?.storage || ""}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Availability</span>
                      <p className={`font-medium ${selectedVariant?.status === "IN_STOCK" ? "text-green-600" : "text-amber-600"}`}>
                        {selectedVariant?.status === "IN_STOCK" ? "In Stock" : "Limited"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Shipping</span>
                      <p className="font-medium">Free Delivery</p>
                    </div>
                  </div>
                </div>

                {/* Qty + Actions */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button className="px-3 py-2" onClick={handleDecrease}>-</button>
                    <div className="px-4">{quantity}</div>
                    <button className="px-3 py-2" onClick={handleIncrease}>+</button>
                  </div>

                  <div className="flex flex-1 flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleAddToCart(selectedProduct, selectedVariant)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      onClick={() => handleAddToCart(selectedProduct, selectedVariant)}
                      className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <span>Buy Now</span>
                    </button>
                  </div>
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
