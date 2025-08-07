"use client"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeItemFromWishlist, clearWishlist, fetchWishlist } from "../reduxslice/WishlistSlice"
import { Trash2, Heart, ArrowLeft, ShoppingBag, Star, Eye } from "lucide-react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

const Wishlist = () => {
  const { items: wishlistItems, loading } = useSelector((state: any) => state.wishlist)
  const dispatch = useDispatch<any>()

  console.log("wishlist " , wishlistItems)
  useEffect(() => {
    dispatch(fetchWishlist())
  }, [dispatch])

  const handleRemove = (id: string) => {
    dispatch(removeItemFromWishlist(id)).then(() => {
      dispatch(fetchWishlist())
    })
  }

  const handleClear = () => {
    if (wishlistItems.length > 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to clear your entire wishlist?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, clear it!'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(clearWishlist());
          Swal.fire('Cleared!', 'Your wishlist has been cleared.', 'success');
        }
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={`${i < Math.floor(rating) ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'url("/abstract-pattern.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="container mx-auto py-12 px-4 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-8 border-b border-[#384D89]/20">
          <div>
            <h1 className="text-3xl font-bold mb-2 leading-tight flex items-center gap-3 bg-gradient-to-r from-[#A13C78] to-[#872D67] bg-clip-text text-transparent">
              <Heart className="fill-current text-[#A13C78]" size={28} />
              Your Wishlist
            </h1>
            <p className="text-[#2A4172] text-base">
              <span className="font-semibold text-[#A13C78]">{wishlistItems?.length || 0}</span>{" "}
              {wishlistItems?.length === 1 ? "item" : "items"} saved for later
            </p>
          </div>
          {wishlistItems && wishlistItems.length > 0 && (
            <div className="mt-4 md:mt-0">
              <button
                onClick={handleClear}
                className="inline-flex items-center space-x-2 text-[#2A4172] hover:text-[#681853] transition-colors font-medium px-4 py-2 rounded-xl border-2 border-[#384D89]/20 hover:border-[#A13C78]/50 hover:bg-[#A13C78]/10 shadow-sm hover:shadow-md text-sm group"
              >
                <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center shadow-lg border border-white/50">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-[#384D89] to-[#2A4172] text-white animate-pulse">
              <Heart className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-[#14263F] mb-2">Loading your wishlist...</h3>
            <p className="text-[#2A4172]">Please wait while we gather your saved items</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && (!wishlistItems || wishlistItems.length === 0) && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center shadow-lg border border-white/50">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-[#384D89]/20 to-[#2A4172]/20 text-[#384D89]">
              <Heart className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-[#14263F] mb-2">Your wishlist is empty</h3>
            <p className="text-[#2A4172] mb-6 max-w-md mx-auto text-sm">
              Start adding items you love! Click the heart icon on any product to save it here for later.
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#A13C78] to-[#872D67] text-white font-medium rounded-xl hover:from-[#872D67] hover:to-[#681853] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        )}

        {/* Wishlist Items */}
        {!loading && wishlistItems && wishlistItems.length > 0 && (
          <div className="space-y-6 ">
            {wishlistItems
              .filter((item: any) => item?.product)
              .map((item: any, index: number) => (
                <div
                  key={item?.product?._id}
                  className="sm:flex mx-auto w-full items-center gap-4 bg-white backdrop-blur-sm border border-white/50 shadow-lg rounded-xl py-6 px-4 transition-all duration-300 hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Product Image */}
                  <div className="relative md:w-36 md:h-36 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 border-2 border-[#384D89]/20">
                    <img
                      src={
                        item?.product?.images?.[0]
                          ? item?.product.images[0]
                          : "/diverse-products-still-life.png"
                      }
                      alt={item?.product?.productName || "No image"}
                      className="w-full h-48 md:h-full object-contain transition-transform duration-300 hover:scale-105"
                    />
                    {item?.product?.discount && (
                      <div
                        className="absolute top-1 left-1 text-white text-[10px] font-medium px-2 py-0.5 rounded shadow"
                        style={{ background: "#A13C78" }}
                      >
                        {item.product.discount}% OFF
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-col flex-grow min-w-0">
                    <h3 className="text-base font-semibold text-[#14263F] truncate">
                      {item?.product?.productName || "Unnamed Product"}
                    </h3>
                    <p className=" text-[#2A4172] line-clamp-2 mb-1">
                      {item?.product?.description ||
                        "Premium quality traditional wear crafted with authentic techniques and finest materials."}
                    </p>

                    <div className="flex items-center gap-1 mb-1">
                      <div className="flex">{renderStars(item?.product?.rating || 4)}</div>
                      <span className="text-[11px] text-[#2A4172]/70">(Reviews)</span>
                    </div>

                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-lg font-bold bg-gradient-to-r from-[#384D89] to-[#2A4172] bg-clip-text text-transparent">
                        <span className="rupee mb-1">₹</span>{item?.product?.actualPrice || "N/A"}
                      </span>
                      {item?.product?.price && item?.product?.price !== item?.product?.actualPrice && (
                        <span className=" text-[#2A4172]/60 line-through">
                          <span className="rupee">₹</span>{item.product.price}
                        </span>
                      )}
                    </div>
{/*
                    <p className="text-[11px] text-[#2A4172]">
                      Category:{" "}
                      <span className="font-medium text-[#A13C78]">
                        {item?.product?.category?.name || "Traditional Wear"}
                      </span>
                    </p> */}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end gap-2">
                    <Link
                      to={`/product/${item?.product?._id}`}
                      className="flex items-center gap-1 w-full text-white  font-semibold px-3 py-1.5 rounded-md bg-gradient-to-r from-[#A13C78] to-[#872D67] hover:from-[#872D67] hover:to-[#681853] shadow hover:shadow-md transition-all"
                    >
                    <div className="mx-auto inline-flex items-center">
                        <Eye size={14}  className="text-md me-1"/>
                      View
                    </div>
                    </Link>
                    <button
                      onClick={() => handleRemove(item?.product?._id)}
                      className="flex w-full items-center gap-1 px-3 py-1.5 border border-[#384D89]/30  text-[#384D89]  font-semibold rounded-md hover:bg-[#384D89] hover:text-white shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="mx-auto inline-flex items-center">
                      <Trash2 size={14} className="group-hover:scale-110 transition-transform" />
                      Remove
                    </div>
                    </button>
                  </div>
                </div>

              ))}
          </div>
        )}
        {/* Bottom Navigation */}
        {!loading && wishlistItems && wishlistItems.length > 0 && (
          <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-[#2A4172] hover:text-[#14263F] transition-colors font-medium px-5 py-2.5 rounded-xl border-2 border-[#384D89]/20 hover:border-[#384D89] hover:bg-[#384D89]/5 shadow-sm hover:shadow-md text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Continue Shopping</span>
            </Link>
            <div className="text-center">
              <p className="text-[#2A4172] mb-3 text-sm">Found something you love?</p>
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#A13C78] to-[#872D67] text-white font-semibold rounded-xl hover:from-[#872D67] hover:to-[#681853] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Explore More</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist
