"use client"
import { useState } from "react"
import type React from "react"

import { Eye, Heart, ShoppingCart, Star, X } from "lucide-react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addItemToWishlist } from "../../reduxslice/WishlistSlice"
import { addItemToCart } from "../../reduxslice/CartSlice"
import LoginModal from "../loginModal/LoginModal"; // adjust the path accordingly
import Login1 from "../../pages/Login1";
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
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isWishlistPopupVisible, setIsWishlistPopupVisible] = useState(false);
      const [wishlistProduct, setWishlistProduct] = useState<any>(null);
  const dispatch = useDispatch()
   
  // const handleAddToCart = (e: React.MouseEvent) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //     const isUserLoggedIn = !!localStorage.getItem("token");

  //   if (!isUserLoggedIn) {
  //     setShowLoginModal(true); // Trigger login modal
  //     return;
  //   }
  //   dispatch(
  //     addItemToCart({
  //       id: product._id,
  //       name: product.productName,
  //       image: product.images?.[0] || "",
  //       category: product.category?.name || "Uncategorized",
  //       price: product.actualPrice,
  //       quantity: 1,
  //     }),
  //   )
  // }

  const handleAddToCart = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();

  const token = localStorage.getItem("token");

  const cartItem = {
    id: product._id,
    name: product.productName,
    image: product.images?.[0] || "",
    category: product.category?.name || "Uncategorized",
    price: product.actualPrice,
    quantity: 1,
  };

  if (!token) {
    // Guest user: Use localStorage
    const existingCart = JSON.parse(localStorage.getItem("addtocart") || "[]");

    const existingIndex = existingCart.findIndex((item: any) => item.id === product._id);

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
};

  // const handleAddToWishlist = (e: React.MouseEvent) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   dispatch(addItemToWishlist(product._id))
  // }

    const handleAddToWishlist = (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
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
        size={12}
        className={`${i < Math.floor(rating) ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`}
      />
    ))
  }

  return (
   <>
       <Link to={`/product/${product._id}`} className="group block">
      <div
        className="bg-white rounded-xl shadow-sm overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {/* Main Image */}
          <img
            src={`http://api.jajamblockprints.com${product.images}`}
            alt={product.productName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Second Image on Hover */}
          {product.images?.[1] && (
            <img
              src={`http://localhost:5008/api${product.images} ` || "/placeholder.svg"}
              alt={`${product.productName} - View 2`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* Discount Badge */}
          {product.discount && (
            <div
              className="absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded-full z-10"
              style={{ background: "rgb(157 48 137)" }}
            >
              {product.discount}% OFF
            </div>
          )}

          {/* Action Buttons */}
          <div
            className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
            }`}
          >
            <button
              onClick={handleAddToCart}
              className="bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
              style={{ color: "rgb(157 48 137)" }}
              title="Add to Cart"
            >
              <ShoppingCart size={16} />
            </button>
            <button
              onClick={handleAddToWishlist}
              className="bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
              style={{ color: "rgb(157 48 137)" }}
              title="Add to Wishlist"
            >
              <Heart size={16} />
            </button>
            <Link
              to={`/product/${product._id}`}
              className="bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
              style={{ color: "rgb(157 48 137)" }}
              title="Quick View"
            >
              <Eye size={16} />
            </Link>
          </div>
  {isWishlistPopupVisible && wishlistProduct && (
        <div
          className="fixed top-4 right-4 bg-yellow-100 text-yellow-500 p-4 rounded-lg shadow-lg z-50 transition-transform transform translate-x-0 opacity-100"
          style={{
            transition: "transform 0.5s ease, opacity 0.5s ease",
          }}
        >
          <div className="flex justify-between items-center">
            <span className="text-[12px]">Product Added to Wishlist</span>
            <button onClick={() => setIsWishlistPopupVisible(false)}>
              <X size={20} />
            </button>
          </div>
          <p className="mt-2 text-[12px]">{wishlistProduct.productName}</p>
        </div>
      )}
          {/* Quick Add to Cart Overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 transition-all duration-300 ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            <button
              onClick={handleAddToCart}
              className="w-full text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105"
              style={{ background: "rgb(157 48 137)" }}
            >
              ADD TO CART
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Brand */}
          {product.brand && <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.brand}</p>}

          {/* Product Name */}
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm leading-tight">{product.productName}</h3>

          {/* Category */}
          <p className="text-xs text-gray-500 mb-2">{product.category?.name || "Traditional Wear"}</p>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex mr-2">{renderStars(product.rating || 4)}</div>
            <span className="text-xs text-gray-500">({Math.floor(Math.random() * 50) + 10})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold" style={{ color: "rgb(157 48 137)" }}>
                ₹{product.actualPrice.toLocaleString()}
              </span>
              {product.price && product.price !== product.actualPrice && (
                // <span className="text-sm text-gray-400 line-through">₹{product.price.toLocaleString()}</span>
                <span className="text-sm text-gray-400 line-through">₹{product.price.toFixed(0)}</span>
                
              )}
            </div>
            {product.discount && <span className="text-xs font-medium text-green-600">Save {product.discount}%</span>}
          </div>
        </div>
      </div>
    </Link>
     {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        >
          <Login1 />
        </LoginModal>
      )}
   </>
  )
}

export default ProductCard;
