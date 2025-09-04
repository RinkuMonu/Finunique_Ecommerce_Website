"use client";
import React, { useEffect, useState } from "react";
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import LoginModal from "../loginModal/LoginModal";
import Login1 from "../../pages/Login1";
import {
  removeItemFromCart,
  updateQuantity,
  addItemToCart,
} from "../../reduxslice/CartSlice";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
console.log(cartItems);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [localCart, setLocalCart] = useState<Product[]>([]);

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    if (!isLoggedIn) {
      const loadCart = () => {
        const cartData = localStorage.getItem("addtocart");
        setLocalCart(cartData ? JSON.parse(cartData) : []);
      };

      loadCart(); // Load once on mount

      // 👂 Listen for localStorage update
      window.addEventListener("guestCartUpdated", loadCart);

      return () => {
        window.removeEventListener("guestCartUpdated", loadCart);
      };
    }
  }, [isLoggedIn]);

  // Helper to update localStorage cart
  const updateLocalCart = (updated: Product[]) => {
    setLocalCart(updated);
    localStorage.setItem("addtocart", JSON.stringify(updated));
  };

  // Common handlers
  const handleIncrement = (id: string) => {
    if (isLoggedIn) {
      const item = cartItems.find((i) => i.id === id);
      if (item) {
        dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
      }
    } else {
      const updated = localCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      updateLocalCart(updated);
    }
  };

  const handleDecrement = (id: string) => {
    if (isLoggedIn) {
      const item = cartItems.find((i) => i.id === id);
      if (item && item.quantity > 1) {
        dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
      }
    } else {
      const updated = localCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      updateLocalCart(updated);
    }
  };

  const handleDelete = (id: string) => {
    if (isLoggedIn) {
      dispatch(removeItemFromCart(id));
    } else {
      const updated = localCart.filter((item) => item.id !== id);
      updateLocalCart(updated);
    }
  };

  const handleCheckout = () => {
    // const token = localStorage.getItem("userData");
    // if (!token) {
    //   setRedirectPath("/address");
    //   setShowLoginModal(true);
    //   return;
    // }
    navigate("/address");
    onClose();
  };

  const cartToDisplay = isLoggedIn ? cartItems : localCart;
  console.log(cartToDisplay);
  
  const total = cartToDisplay.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${isOpen ? "bg-opacity-50" : "bg-opacity-0 pointer-events-none"
          }`}
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(157, 48, 137, 0.1)" }}
              >
                <ShoppingCart
                  className="w-5 h-5"
                  style={{ color: "rgb(157 48 137)" }}
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Shopping Cart
                </h2>
                <p className="text-sm text-gray-500">
                  {cartToDisplay.length} items
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartToDisplay.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "rgba(157, 48, 137, 0.1)" }}
                >
                  <ShoppingCart
                    className="w-10 h-10"
                    style={{ color: "rgb(157 48 137)" }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Add some items to get started!
                </p>
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                  style={{ background: "rgb(157 48 137)" }}
                >
                  Continue Shopping
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-6 scrollbar-hide overflow-y-scroll">
                {cartToDisplay.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 p-5 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 "
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h3 className="text-gray-800 font-semibold text-base sm:text-lg leading-snug line-clamp-2 mb-1">
                          {item.name}
                        </h3>
                        {item.category && (
                          <p className="text-xs text-gray-500 mb-3">
                            {item.category}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm sm:text-base mt-auto">
                        <span className="font-semibold text-[rgb(157_48_137)]">
                          <span className="rupee">₹</span>{item?.price?.toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => handleDecrement(item.id)}
                            className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 transition"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 text-sm font-medium min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrement(item.id)}
                            className="px-3 py-2 hover:bg-gray-100 transition"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <span className="text-sm font-medium text-gray-700 flex justify-end">
                          Total: <span className="rupee">₹</span>
                          {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartToDisplay.length > 0 && (
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    Subtotal{" "}
                    <span className="text-gray-400">
                      ({cartToDisplay.length} items)
                    </span>
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    <span className="rupee">₹</span>{total.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>

                <div className="border-t border-dashed border-gray-300 pt-3 flex justify-between text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span><span className="rupee">₹</span>{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[rgb(157,48,137)] hover:bg-[rgb(137,38,120)] text-white text-sm font-semibold transition-all shadow-sm hover:shadow-md"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2 px-4 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                >
                  Continue Shopping
                </button>
              </div>

              <p className="text-center mt-4 text-xs text-gray-400">
                Shipping and taxes calculated at checkout
              </p>
            </div>
          )}
        </div>
      </div>

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        >
          <Login1
            redirectPath={redirectPath}
            onLoginSuccess={() => {
              setShowLoginModal(false);
              setRedirectPath(null);
            }}
          />
        </LoginModal>
      )}
    </>
  );
};

export default Cart;
