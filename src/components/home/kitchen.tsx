"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, CheckCircle, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../reduxslice/CartSlice";

const Kitchen = () => {
  const [tablets, setTablets] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [addedProduct, setAddedProduct] = useState<any>(null);

  const dispatch = useDispatch();
  const quantity = 1;

  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const slugify = (text: string) =>
    text.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateSavings = (originalPrice: number, actualPrice: number) => {
    return originalPrice - actualPrice;
  };

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
      // Guest cart
      const existingCart = JSON.parse(localStorage.getItem("addtocart") || "[]");
      const existingIndex = existingCart.findIndex(
        (item: any) => item.id === product._id
      );

      if (existingIndex !== -1) {
        existingCart[existingIndex].quantity += quantity;
      } else {
        existingCart.push(cartItem);
      }

      localStorage.setItem("addtocart", JSON.stringify(existingCart));
      window.dispatchEvent(new Event("guestCartUpdated"));
    } else {
      // Logged-in cart
      dispatch(addItemToCart(cartItem));
    }

    // Show popup feedback
    setAddedProduct(product);
    setIsPopupVisible(true);
    setTimeout(() => setIsPopupVisible(false), 3000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/product/getproducts?referenceWebsite=${referenceWebsite}&category=${encodeURIComponent(
            "Cooking Appliances"
          )}`
        );
        const data = await res.json();

        if (Array.isArray(data.products)) {
          setTablets(data.products);
        } else {
          console.error("Unexpected products format:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);


  if (tablets.length == 0) {
    return;
  }

  return (
    <>
      {/* Popup */}
      {isPopupVisible && addedProduct && (
        <div className="fixed top-6 right-6 bg-white shadow-lg rounded-lg p-4 flex items-center gap-3 border-l-4 border-green-500 z-50 animate-slideIn">
          <CheckCircle className="text-green-500" size={24} />
          <div>
            <p className="text-sm font-medium">
              {addedProduct.productName} added to cart!
            </p>
          </div>
        </div>
      )}

      <div className="bg-gray-50 py-6 px-4">
        <div className="flex justify-between items-center mb-3 mx-20">
          <div>
            <h2 className="text-2xl font-bold">
              Your Kitchen’s Coolest Upgrade
            </h2>
          </div>
          <Link
            to={`/category/${slugify("Cooking Appliances")}`}
            className="text-sm text-indigo-600 font-semibold hover:underline"
          >
            View All →
          </Link>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={3}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1.3 },
            480: { slidesPerView: 1.6 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="mx-20"
        >
          {tablets?.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="border relative rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
                onMouseEnter={() => setHoveredProduct(item._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {item?.discount && (
                  <div className="inline-block z-50 absolute top-0 left-0 bg-[#BE457E] text-white text-xs font-semibold px-2 py-1 rounded-tl-md rounded-b-lg">
                    {item.discount}% save
                  </div>
                )}

                <div className="w-full h-48 flex items-center justify-center mb-3 relative">
                  <img
                    src={item.images[0]}
                    alt={item.productName}
                    className="max-h-full object-contain"
                  />
                  {/* Quick Add Overlay */}
                  <div
                    className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-all duration-300 ease-in-out
    ${hoveredProduct === item._id
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                      }`}
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(item);
                      }}
                      className="w-full bg-[#BE457E]  font-medium py-2 px-4 rounded-lg text-white flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>
                </div>

                <Link to={`/product/${item._id}`}>
                  <h3 className="text-sm font-medium text-gray-800 leading-tight line-clamp-2 mb-2 truncate hover:underline">
                    {item.productName}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 text-lg font-bold text-black">
                  {formatPrice(item.variants[0].pricing?.price)}
                </div>
                {item?.variants[0].pricing && item?.variants[0].pricing?.price !== item?.variants[0].pricing?.mrp && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-600 font-medium">
                      Save{" "}
                      {formatPrice(
                        calculateSavings(item?.variants[0]?.pricing?.mrp, item?.variants[0].pricing?.price)
                      )}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({item?.discount}% off)
                    </span>
                  </div>
                )}
                <div className="text-sm text-gray-500 line-through mt-1">
                  ₹ {Math.floor(item?.variants[0].pricing?.price)}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Kitchen;
