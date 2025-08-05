"use client";

import type React from "react";

import { useEffect, useState } from "react";
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
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToWishlist } from "../../reduxslice/WishlistSlice";
import { addItemToCart } from "../../reduxslice/CartSlice";
import LoginModal from "../loginModal/LoginModal";
import Login1 from "../../pages/Login1";

const TrendingProducts = ({
  addToCart,
}: {
  addToCart: (product: any) => void;
}) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dispatch = useDispatch();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;

  // Popup States
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [addedProduct, setAddedProduct] = useState<any>(null);
  const [isWishlistPopupVisible, setIsWishlistPopupVisible] = useState(false);
  const [wishlistProduct, setWishlistProduct] = useState<any>(null);

  // Electronics category icons mapping
  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      smartphones: <Smartphone size={16} className="text-cyan-400" />,
      laptops: <Monitor size={16} className="text-blue-400" />,
      headphones: <Headphones size={16} className="text-purple-400" />,
      cameras: <Camera size={16} className="text-green-400" />,
      gaming: <Gamepad2 size={16} className="text-red-400" />,
      tablets: <Tablet size={16} className="text-yellow-400" />,
      watches: <Watch size={16} className="text-pink-400" />,
      speakers: <Speaker size={16} className="text-indigo-400" />,
      default: <Cpu size={16} className="text-cyan-400" />,
    };
    return iconMap[category.toLowerCase()] || iconMap.default;
  };

  // Responsive items per slide
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else if (window.innerWidth < 1280) {
        setItemsPerSlide(3);
      } else {
        setItemsPerSlide(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (products.length === 0) return;
    const maxSlides = Math.ceil(products.length / itemsPerSlide);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % maxSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [products.length, itemsPerSlide]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/product/getproducts?referenceWebsite=${referenceWebsite}`
        );
        const data = await res.json();
        if (Array.isArray(data.products)) {
          setProducts(data.products.slice(0, 12)); // Get 12 products for slider
        } else {
          console.error("Unexpected products format:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [baseUrl, referenceWebsite]);

  const openProductModal = (product: any) => {
    setSelectedProduct(product);
    setQuantity(1);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => quantity > 1 && setQuantity((prev) => prev - 1);

  const handleAddToCart = (product: any) => {
    const token = localStorage.getItem("token");
    const cartItem = {
      id: product._id,
      name: product.productName,
      image: product.images?.[0] || "",
      category: product.category?.name || "Uncategorized",
      price: product.actualPrice || product.price,
      quantity,
    };

    if (!token) {
      // Get existing cart or initialize empty array
      const existingCart = JSON.parse(
        localStorage.getItem("addtocart") || "[]"
      );
      // Check if product already in cart
      const existingProductIndex = existingCart.findIndex(
        (item: any) => item.id === product._id
      );
      if (existingProductIndex !== -1) {
        // Product exists – increase quantity
        existingCart[existingProductIndex].quantity += quantity;
      } else {
        // New product – add to cart
        existingCart.push(cartItem);
      }
      // Save updated cart back to localStorage
      localStorage.setItem("addtocart", JSON.stringify(existingCart));
      window.dispatchEvent(new Event("guestCartUpdated"));
    } else {
      // User is logged in – use Redux
      dispatch(addItemToCart(cartItem));
    }

    // UI feedback
    setAddedProduct(product);
    setIsPopupVisible(true);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 3000);
    closeModal();
  };

  const handleAddToWishlist = (product: any) => {
    const isUserLoggedIn = !!localStorage.getItem("token");
    if (!isUserLoggedIn) {
      setShowLoginModal(true); // Trigger login modal
      return;
    }
    dispatch(addItemToWishlist(product._id));
    setWishlistProduct(product);
    setIsWishlistPopupVisible(true);
    setTimeout(() => {
      setIsWishlistPopupVisible(false);
    }, 3000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={`${
          i < Math.floor(rating)
            ? "fill-yellow-400 stroke-yellow-400"
            : "stroke-gray-300"
        }`}
      />
    ));
  };

  const maxSlides = Math.ceil(products.length / itemsPerSlide);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const Image_BaseURL = import.meta.env.VITE_API_BASE_URL_IMAGE;

  return (
    <section className="py-16 px-4 bg-gray-50">
      {/* Remove the complex background tech elements and replace with simple background */}

      <div className="max-w-7xl mx-auto">
        {/* Simplified Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp size={16} />
            <span>Trending Products</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Electronics
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most popular electronics and gadgets loved by our
            customers
          </p>
        </div>

        {/* Products Slider */}
        <div className="relative">
          {/* Enhanced Navigation Arrows */}
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
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {Array.from({ length: maxSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div
                    className="grid gap-8"
                    style={{
                      gridTemplateColumns: `repeat(${itemsPerSlide}, 1fr)`,
                    }}
                  >
                    {products
                      .slice(
                        slideIndex * itemsPerSlide,
                        (slideIndex + 1) * itemsPerSlide
                      )
                      .map((product, index) => (
                       <div
  key={product._id}
  onMouseEnter={() => setHoveredProduct(product._id)}
  onMouseLeave={() => setHoveredProduct(null)}
  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group relative"
  style={{ 
    animationDelay: `${index * 100}ms`,
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
  }}
>
  {/* Product Image Container */}
  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
    <img
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      src={`${Image_BaseURL}${product.images[0]}`}
      alt={product.productName}
    />

    {/* Discount Badge */}
    {product.discount && (
      <div className="absolute top-4 left-4 bg-[#C1467F] text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
        -{product.discount}% OFF
      </div>
    )}

    {/* Action Buttons */}
    <div className="absolute top-4 right-4 flex flex-col gap-2">
      {/* Wishlist Button */}
         <button
                              onClick={() => handleAddToWishlist(product)}
                              className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                            >
                              <Heart
                                size={16}
                                className="text-gray-600 hover:text-red-500"
                              />
                            </button> 

      {/* Quick View Button */}
      <button
        onClick={() => openProductModal(product)}
        className={`w-10 h-10 bg-white/90 rounded-full shadow-md flex items-center justify-center transition-all duration-300 hover:bg-[#384D89] hover:scale-110 ${
          hoveredProduct === product._id
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"
        }`}
      >
        <Eye size={18} className="text-gray-600 group-hover:text-white" />
      </button>
    </div>
  </div>

  {/* Product Info */}
  <div className="p-5">
    {/* Category */}
    <div className="mb-2">
      <span className="inline-block text-xs font-semibold text-[#2A4172] bg-[#2A4172]/10 px-3 py-1 rounded-full">
        {product.category?.name || "Electronics"}
      </span>
    </div>

    {/* Product Name */}
    <Link
      to={`/product/${product._id}`}
      className="block text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-[#384D89] transition-colors duration-200"
    >
      {product.productName}
    </Link>

    {/* Rating */}
    <div className="flex items-center mb-3">
      <div className="flex items-center mr-2">
        {renderStars(product.rating || 4)}
      </div>
      <span className="text-sm text-gray-500">(4.5)</span>
    </div>

    {/* Price */}
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-baseline space-x-2">
        <span className="text-xl font-bold text-[#1B2E4F]">
          ₹{product.actualPrice}
        </span>
        {product.price && product.price !== product.actualPrice && (
          <span className="text-sm text-gray-500 line-through">
            ₹{product.price}
          </span>
        )}
      </div>
      <div className="text-xs font-medium bg-[#14263F]/10 text-[#14263F] px-2 py-1 rounded-full">
        In Stock
      </div>
    </div>

    {/* Add to Cart Button */}
    <button
      onClick={() => handleAddToCart(product)}
      className="w-full bg-gradient-to-r from-[#A13C78] to-[#C1467F] hover:from-[#872D67] hover:to-[#A13C78] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-[#C1467F]/30"
    >
      <ShoppingCart size={18} className="text-white" />
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

          {/* Enhanced Slider Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentSlide === index ? "bg-blue-600 w-6" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Enhanced View All Button */}
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
            <button
              onClick={() => setIsPopupVisible(false)}
              className="ml-4 hover:scale-110 transition-transform"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {isWishlistPopupVisible && wishlistProduct && (
        <div className="fixed top-6 right-6 bg-gradient-to-r from-pink-500 to-red-600 text-white p-6 rounded-2xl shadow-2xl z-50 transition-all duration-500 transform translate-x-0 opacity-100 border border-white/20 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Heart size={18} />
              </div>
              <div>
                <span className="font-bold">Added to Wishlist!</span>
                <p className="text-sm opacity-90">
                  {wishlistProduct.productName}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsWishlistPopupVisible(false)}
              className="ml-4 hover:scale-110 transition-transform"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Product Modal */}
      {isModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          onClick={closeModal}
        >
          <div
            className={`relative bg-white/95 backdrop-blur-xl rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-500 border border-gray-200/50 ${
              isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl p-8 border-b border-gray-200/50 flex justify-between items-center rounded-t-3xl">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-cyan-900 bg-clip-text text-transparent">
                {selectedProduct.productName}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors p-3 rounded-2xl hover:bg-gray-100/50 hover:scale-110"
              >
                <X size={28} />
              </button>
            </div>
            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-3xl p-8 border border-gray-200/50">
                <img
                  className="rounded-2xl object-contain max-h-[500px] shadow-2xl"
                  src={`${Image_BaseURL}${selectedProduct.images[0]}`}
                  alt={selectedProduct.productName}
                />
              </div>
              <div className="space-y-8">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="flex mr-3">
                      {renderStars(selectedProduct.rating || 4)}
                    </div>
                    <span className="text-sm text-gray-500 font-medium">
                      (4.5 Reviews)
                    </span>
                  </div>
                  <div className="flex items-center mb-8">
                    <span className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mr-4">
                      ₹{selectedProduct.actualPrice}
                    </span>
                    {selectedProduct.price &&
                      selectedProduct.price !== selectedProduct.actualPrice && (
                        <span className="text-xl text-gray-400 line-through">
                          ₹{selectedProduct.price}
                        </span>
                      )}
                  </div>
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    {selectedProduct.description ||
                      "Experience cutting-edge technology with this premium electronic device. Featuring advanced specifications and innovative design for the modern tech enthusiast."}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-6 border border-gray-200/50">
                  <h4 className="text-xl font-bold mb-6 text-gray-900">
                    Tech Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">
                        Category
                      </span>
                      <span className="font-semibold text-gray-900">
                        {selectedProduct.category?.name || "Electronics"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">Brand</span>
                      <span className="font-semibold text-gray-900">
                        Premium Tech
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">
                        Warranty
                      </span>
                      <span className="font-semibold text-green-600">
                        2 Years
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-sm mb-1">
                        Availability
                      </span>
                      <span className="font-semibold text-green-600 flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                        In Stock
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-cyan-500/25 hover:scale-105"
                  >
                    <ShoppingCart size={20} />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-2xl hover:scale-105"
                  >
                    <Zap size={20} />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        >
          <Login1 />
        </LoginModal>
      )}
    </section>
  );
};

export default TrendingProducts;
