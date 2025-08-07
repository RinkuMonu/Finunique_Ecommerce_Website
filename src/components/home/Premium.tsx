"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Premium = () => {
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [products, setProducts] = useState<any[]>([]);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/product/getproducts?referenceWebsite=${referenceWebsite}&category=smart watches`
        );
        const data = await res.json();

        if (Array.isArray(data.products)) {
          setProducts(data.products);
          console.log(data.products);
        } else {
          console.error("Unexpected products format:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [baseUrl, referenceWebsite]);

  return (
    <div className="bg-gray-50 py-6 px-4">
      <div className="flex justify-between items-center mb-3  mx-16 mt-10">
        <div>
          <h2 className="text-2xl font-bold">
            Premium Smart Watches- Get Instant Bank Discount
          </h2>
          {/* <p className="text-sm text-gray-600">Starting at Rs. 9999*</p> */}
        </div>
        <a
          href="/category/Smart%20Watches"
          className="text-sm text-indigo-600 font-semibold hover:underline"
        >
          View All →
        </a>
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
          0: {
            slidesPerView: 1.3,
          },
          480: {
            slidesPerView: 1.6,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
        className=" mx-16"
      >
        {products.map((item, index) => (
          <SwiperSlide key={index}>
            <Link to={`product/${item._id}`}>
              <div className="border relative rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition">
                <div className="inline-block absolute top-0 left-0 bg-[#BE457E] text-white text-xs font-semibold px-2 py-1 rounded-tl-md rounded-b-lg rounded-bl-none mb-3">
                  {item?.discount} % save
                </div>
                <div className="w-full h-48 flex items-center justify-center mb-3">
                  <img
                    src={
                      item?.images && item?.images?.length > 0
                        ? item.images[0]
                        : "/placeholder.svg?height=600&width=600"
                    }
                    alt={item?.productName}
                    className="max-h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-800 leading-tight line-clamp-2 mb-2 truncate">
                  {item?.productName}
                </h3>
                <div className="flex items-center gap-2 text-lg font-bold text-black">
                  {item?.actualPrice}
                </div>
                <div className="text-sm text-gray-500 line-through mt-1">
                  {item?.price}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Premium;
