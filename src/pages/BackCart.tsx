import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeItemFromCart, updateQuantity } from "../reduxslice/CartSlice";
import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const ShoppingCart: React.FC<{ cartItems: CartItem[] }> = ({ cartItems }) => {
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalAfterDiscount = Math.max(0, total - discount);

  const handleIncrement = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrement = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
    }
  };

  const handleDelete = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const applyCoupon = () => {
    if (coupon.toLowerCase() === "save10") {
      const newDiscount = total * 0.1;
      setDiscount(newDiscount);
      alert("Coupon applied successfully! 10% discount added.");
    } else {
      alert("Invalid coupon code.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'url("/abstract-pattern.png")', backgroundSize: "cover", backgroundPosition: "center" }}></div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#384D89] to-[#2A4172] flex items-center justify-center shadow-lg">
              <ShoppingBag className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-[#14263F] mb-4">Your cart is empty</h2>
            <p className="text-[#2A4172] mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#A13C78] to-[#872D67] text-white font-medium rounded-lg hover:from-[#872D67] hover:to-[#681853] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'url("/abstract-pattern.png")', backgroundSize: "cover", backgroundPosition: "center" }}></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="mb-8 pb-6 border-b border-[#384D89]/10">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/products" className="inline-flex items-center px-4 py-2 text-sm text-[#2A4172] hover:text-[#14263F] hover:bg-white/70 rounded-lg transition-all duration-200 backdrop-blur-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#384D89] to-[#2A4172] bg-clip-text text-transparent mb-2">Shopping Cart</h1>
            <p className="text-[#2A4172] text-base">
              <span className="font-semibold text-[#A13C78]">{cartItems.length}</span> {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6 min-h-[1000px]">
            {/* Cart Items */}
            {cartItems.map((item, index) => (
              <div key={item.id} className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1 group">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden bg-gradient-to-br from-[#f8f9ff] to-[#f0f2ff] border border-gray-200 shadow-sm">
                        <img src={item?.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="flex-grow space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[#14263F] mb-3 leading-tight">{item.name}</h3>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-[#A13C78]/10 to-[#C1467F]/10 text-[#872D67] border border-[#A13C78]/20">✓ In Stock</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                        <div className="space-y-1">
                          <div className="text-xl font-bold bg-gradient-to-r from-[#384D89] to-[#2A4172] bg-clip-text text-transparent">₹{item.price.toLocaleString()}</div>
                          <div className="text-sm text-[#2A4172]/60 line-through">₹{(item.price * 2.1).toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#384D89] to-[#2A4172] p-6 rounded-t-3xl">
                <h2 className="text-xl font-bold text-white">Order Summary</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2A4172]">Subtotal</span>
                    <span className="font-semibold text-[#14263F]">₹{total.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#2A4172]">Discount</span>
                      <span className="text-[#A13C78] font-semibold">-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2A4172]">Tax</span>
                    <span className="font-semibold text-[#14263F]">₹0.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-[#14263F]">Total</span>
                      <span className="bg-gradient-to-r from-[#384D89] to-[#2A4172] bg-clip-text text-transparent">₹{totalAfterDiscount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-[#A13C78]/10 to-[#C1467F]/10 p-4 rounded-xl border border-[#A13C78]/20">
                  <p className="text-sm text-[#872D67] italic">Shipping fees will be calculated at checkout</p>
                </div>
                <div className="space-y-4">
                  <Link to="/address" className="block w-full py-4 px-6 bg-gradient-to-r from-[#A13C78] to-[#872D67] text-white text-center font-semibold rounded-lg hover:from-[#872D67] hover:to-[#681853] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5">
                    Proceed to Checkout
                  </Link>
                  <Link to="/products" className="block w-full py-4 px-6 border border-gray-300 text-[#384D89] text-center font-semibold rounded-lg hover:bg-[#384D89] hover:text-white transition-all duration-300">
                    Continue Shopping
                  </Link>
                </div>
                <div className="text-xs text-[#2A4172] flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Secure checkout guaranteed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;