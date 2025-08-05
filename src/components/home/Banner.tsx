"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/autoplay"
import "swiper/css/effect-fade"

interface APIBanner {
  _id: string
  bannerName: string
  description: string
  deviceType: string
  images: string[]
  position: string
}

const Banner: React.FC = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE
  const [banners, setBanners] = useState<APIBanner[]>([])
  const [deviceType, setDeviceType] = useState<"mobile" | "desktop">("desktop")
  const [categories, setCategories] = useState<string[]>([])
  const [isNewArrival, setIsNewArrival] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  console.log(banners, "banneres ")

  // ✅ Detect "new arrivals" banner
  useEffect(() => {
    const hasNewArrivalBanner = banners.some((banner) => banner.description === "newArrival")
    setIsNewArrival(hasNewArrivalBanner)
  }, [banners])

  // ✅ Fetch categories
  useEffect(() => { 
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseUrl}/website/${referenceWebsite}`)
        const data = await res.json()
        if (Array.isArray(data.website?.categories)) {
          setCategories(data.website.categories.map((cat: any) => cat.name))
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }
    fetchCategories()
  }, [baseUrl, referenceWebsite])

  // ✅ Correct API call for newArrival
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${baseUrl}/products?referenceWebsite=${referenceWebsite}`
        if (isNewArrival) {
          url += `&newArrival=true`
        }
        console.log("🟢 Fetching products from:", url)
      } catch (err) {
        console.error("Failed to fetch products", err)
      }
    }
    fetchProducts()
  }, [isNewArrival])

  // ✅ Device type detection
  useEffect(() => {
    const checkDevice = () => {
      const isMobile = window.innerWidth <= 768
      setDeviceType(isMobile ? "mobile" : "desktop")
    }
    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  // ✅ Fetch banners based on device
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const endpoint = deviceType === "mobile" ? "mobile" : "desktop"
        const res = await fetch(`${baseUrl}/banners/${endpoint}?referenceWebsite=${referenceWebsite}`)
        const data = await res.json()
        const filtered = (data.banners || []).filter((item: APIBanner) => item.deviceType === deviceType)
        setBanners(filtered)
      } catch (err) {
        console.error("Failed to fetch banners", err)
      }
    }
    fetchBanners()
  }, [deviceType])

  if (banners.length === 0) return null


  const Image_BaseURL = import.meta.env.VITE_API_BASE_URL_IMAGE;
console.log(banners)

  return (
    <section className="relative w-full overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20"></div>
        {/* <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="tech-grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M0 5h10M5 0v10" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-grid)" />
        </svg> */}
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-1000 opacity-40"></div>
        <div className="absolute bottom-20 left-1/4 w-2.5 h-2.5 bg-purple-400 rounded-full animate-ping delay-2000 opacity-50"></div>
        <div className="absolute bottom-32 right-1/3 w-1 h-1 bg-green-400 rounded-full animate-pulse delay-3000 opacity-60"></div>
      </div>

      <div className="relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          speed={1000}
          pagination={{
            clickable: true,
            dynamicBullets: false,
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`
            },
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          className="w-full h-auto electronics-banner"
        >
          {banners.map((item, index) => (
            <SwiperSlide key={item._id}>
              <div className="relative w-full h-auto group">
                {/* Image with overlay effects */}
                <div className="relative overflow-hidden">
                  <img

                    // src={`https://api.jajamblockprints.com${item.images[0]}`}
                              src={item.images[0]}

                    alt={item.bannerName}
                    className="w-full h-auto object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-105"
                    loading="eager"
                  />

                  {/* Tech Overlay Effects */}
                  {/* <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div> */}

                  {/* Animated Tech Lines */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60 animate-pulse delay-1000"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-center text-white z-20 px-4">
                  <div className="w-full max-w-4xl text-center space-y-8">
                    {/* Slide Counter */}
                    <div className="absolute top-8 right-8 hidden md:flex items-center space-x-2 bg-black/30 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="text-xs font-mono text-white/80">
                        {String(index + 1).padStart(2, "0")} / {String(banners.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20 z-20">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ease-out"
            style={{
              width: `${((currentSlide + 1) / banners.length) * 100}%`,
            }}
          ></div>
        </div>

        {/* Enhanced Swiper Styles */}
        <style jsx global>{`
          .electronics-banner {
            --swiper-theme-color: #00f5ff;
          }

          .electronics-banner .swiper-pagination {
            bottom: 30px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: auto !important;
            display: flex !important;
            justify-content: center !important;
            gap: 12px !important;
          }

          .electronics-banner .custom-bullet {
            width: 12px !important;
            height: 12px !important;
            background: rgba(255, 255, 255, 0.3) !important;
            border: 2px solid rgba(0, 245, 255, 0.5) !important;
            border-radius: 50% !important;
            opacity: 1 !important;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
            cursor: pointer !important;
            position: relative !important;
            overflow: hidden !important;
          }

          .electronics-banner .custom-bullet::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(45deg, #00f5ff, #0080ff);
            border-radius: 50%;
            opacity: 0;
            transition: opacity 0.4s ease;
          }

          .electronics-banner .custom-bullet:hover {
            transform: scale(1.2) !important;
            border-color: #00f5ff !important;
            box-shadow: 0 0 20px rgba(0, 245, 255, 0.4) !important;
          }

          .electronics-banner .custom-bullet:hover::before {
            opacity: 0.3;
          }

          .electronics-banner .swiper-pagination-bullet-active {
            width: 40px !important;
            border-radius: 8px !important;
            background: linear-gradient(90deg, #00f5ff, #0080ff) !important;
            border-color: #00f5ff !important;
            box-shadow: 0 0 25px rgba(0, 245, 255, 0.6) !important;
            transform: scale(1.1) !important;
          }

          .electronics-banner .swiper-pagination-bullet-active::before {
            opacity: 1;
          }

          /* Fade transition enhancements */
          .electronics-banner .swiper-slide {
            transition: opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1) !important;
          }

          .electronics-banner .swiper-slide-active {
            z-index: 2 !important;
          }

          /* Custom scrollbar for mobile */
          @media (max-width: 768px) {
            .electronics-banner .swiper-pagination {
              bottom: 20px !important;
            }
            
            .electronics-banner .custom-bullet {
              width: 10px !important;
              height: 10px !important;
            }
            
            .electronics-banner .swiper-pagination-bullet-active {
              width: 30px !important;
            }
          }

          /* Animation keyframes */
          @keyframes slideInFromBottom {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-in {
            animation: slideInFromBottom 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .fade-in {
            animation-name: fadeIn;
          }

          .slide-in-from-bottom-4 {
            animation-name: slideInFromBottom;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </div>
    </section>
  )
}

export default Banner
