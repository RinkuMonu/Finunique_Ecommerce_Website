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
  listView?: boolean
}

const ProductCard = ({ product, listView }: ProductCardProps) => {
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


if (listView) {
    return (
      <div className="flex gap-4">
        <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
          <img
            // src={`http://api.jajamblockprints.com${product.images}`}
                    src={`${Image_BaseURL}${product.images[0]}`}

            alt={product.productName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between flex-grow">
          <h3 className="font-semibold text-sm text-gray-800 line-clamp-2">
            {product.productName}
          </h3>
          <p className="text-xs text-gray-500">
            {product.category?.name || "Traditional Wear"}
          </p>
          <div className="flex items-center gap-1 text-yellow-400">
            {renderStars(product.rating || 4)}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-[#9D3089] text-sm">
              ₹{product.actualPrice.toLocaleString()}
            </span>
            <button
              onClick={handleAddToCart}
              className="text-xs text-white bg-[#9D3089] px-3 py-1 rounded hover:bg-[#7c226b]"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid View
  return (
    <div className="space-y-2">
      <div className="rounded-xl overflow-hidden bg-gray-100">
        <img
          src={`http://api.jajamblockprints.com${product.images}`}
          alt={product.productName}
          className="w-full h-52 object-cover"
        />
      </div>
      <h3 className="font-semibold text-sm text-gray-800 line-clamp-2">
        {product.productName}
      </h3>
      <p className="text-xs text-gray-500">
        {product.category?.name || "Traditional Wear"}
      </p>
      <div className="flex items-center gap-1 text-yellow-400">
        {renderStars(product.rating || 4)}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="font-bold text-[#9D3089] text-sm">
          ₹{product.actualPrice.toLocaleString()}
        </span>
        <button
          onClick={handleAddToCart}
          className="text-xs text-white bg-[#9D3089] px-3 py-1 rounded hover:bg-[#7c226b]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};


export default ProductCard;
