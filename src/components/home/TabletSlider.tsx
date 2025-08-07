"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// const tablets = [
//   {
//     tag: '4G Tablet with 128GB',
//     title: 'Redmi Pad SE 22.09 cm (8.7 inch) Tablet 4 GB RAM, 128 GB...',
//     image: './Digiimage/11.avif',
//     price: 1500,
//     mrp: 1800,
//     discount: '44%',
//     rating: 2,
//     reviews: 10,
//   },
//   {
//     tag: '₹2k Instant CB + 6m NCEMI',
//     title: 'Apple iPad A16 11th Gen 2025 (11 inch) Wi-Fi Tablet...',
//     image: './Digiimage/12.avif',
//     price: 1500,
//     mrp: 1900,
//     discount: '7%',
//     rating: 4,
//     reviews: 93,
//   },
//   {
//     tag: '₹2k Instant CB + 6m NCEMI',
//     title: 'OnePlus Pad Go 11.35" 8GB RAM, 128GB...',
//     image: './Digiimage/13.avif',
//     price: 2100,
//     mrp: 2400,
//     discount: '15%',
//     rating: 2,
//     reviews: 34,
//   },
//   {
//     tag: '5.5k Instant CB +6m NCEMI',
//     title: 'Samsung Galaxy Tab A9+ 11" WiFi Tablet...',
//     image: './Digiimage/14.avif',
//     price: 1700,
//     mrp: 2100,
//     discount: '34%',
//     rating: 2,
//     reviews: 38,
//   },
//   {
//     tag: '5% CB : HDFC / SBI CC',
//     title: 'Lenovo Idea Tab Pro 12.7" WiFi Tablet with Pen...',
//     image: './Digiimage/15.avif',
//     price: 1900,
//     mrp: 2200,
//     discount: '43%',
//     rating: 4,
//     reviews: 102,
//   },
//   {
//     tag: '5.5k Instant CB +6m NCEMI',
//     title: 'Samsung Galaxy Tab WiFi + 5G Tablet...',
//     image: './Digiimage/16.avif',
//     price: 2000,
//     mrp: 2500,
//     discount: '35%',
//     rating: 3,
//     reviews: 43,
//   },
// ];

const TabletSlider = () => {
  const [tablets, setTablets] = useState()
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const slugify = (text) =>
    text.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-');
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const calculateSavings = (originalPrice: number, actualPrice: number) => {
    return originalPrice - actualPrice
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/product/getproducts?referenceWebsite=${referenceWebsite}&category=${encodeURIComponent("tablets & ereaders")}&minPrice=9999`
        );
        const data = await res.json();
        if (Array.isArray(data.products)) {
          setTablets(data.products);
          console.log(data.products);
        } else {
          console.error("Unexpected products format:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 py-6 px-4">
      <div className="flex justify-between items-center mb-3  mx-20">
        <div>
          <h2 className="text-2xl font-bold">Best Selling Tablets</h2>
          {/* <p className="text-sm text-gray-600">Starting at Rs. 9999*</p> */}
        </div>
        <Link to={`/category/${slugify("Tablets-and-eReaders")}`} className="text-sm text-indigo-600 font-semibold hover:underline">View All →</Link>
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
        className=' mx-20'
      >
        {tablets?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="border relative rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition">
              <div className="inline-block absolute top-0 left-0 bg-[#BE457E] text-white text-xs font-semibold px-2 py-1 rounded-tl-md rounded-b-lg rounded-bl-none mb-3">
                {item?.discount} % save
              </div>
              <div className="w-full h-48 flex items-center justify-center mb-3">
                <img src={item.images[0]} alt={item.title} className="max-h-full object-contain" />
              </div>
              <h3 className="text-sm font-medium text-gray-800 leading-tight line-clamp-2 mb-2">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 text-lg font-bold text-black">
                ₹ {Math.floor(item.price)}
              </div>
              {item?.price && item?.price !== item?.actualPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-600 font-medium">
                    Save {formatPrice(calculateSavings(item?.price, item?.actualPrice))}
                  </span>
                  <span className="text-xs text-gray-500">({item?.discount}% off)</span>
                </div>
              )}
              <div className="text-sm text-gray-500 line-through mt-1">₹ {Math.floor(item?.price)}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TabletSlider;
