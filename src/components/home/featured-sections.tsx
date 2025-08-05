"use client"
import { ArrowRight, Watch, Monitor, Tablet, Smartphone, Gamepad2, Camera, Headphones, Plane, Cpu } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

const FeaturedSections = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [itemsPerSlide, setItemsPerSlide] = useState(8)

  const categories = [
    {
      image: "./Digiimage/1.avif",
      name: "Tablet",
      path: "/category/tablet",
      icon: <Tablet size={48} className="text-blue-500" />,
    },
    {
      image: "/placeholder.svg?height=120&width=120&text=Smartphones",
      name: "Smartphone",
      path: "/category/smartphone",
      icon: <Smartphone size={48} className="text-green-500" />,
    },
    {
      image: "/placeholder.svg?height=120&width=120&text=Game+Controller",
      name: "Game Console",
      path: "/category/gaming",
      icon: <Gamepad2 size={48} className="text-orange-500" />,
    },
    {
      image: "/placeholder.svg?height=120&width=120&text=Camera",
      name: "Camera",
      path: "/category/camera",
      icon: <Camera size={48} className="text-gray-600" />,
    },
    {
      image: "/placeholder.svg?height=120&width=120&text=Smartwatch",
      name: "Smartwatch",
      path: "/category/smartwatch",
      icon: <Watch size={48} className="text-yellow-500" />,
    },
    {
      image: "/placeholder.svg?height=120&width=120&text=Drone",
      name: "Drone & Flycam",
      path: "/category/drone",
      icon: <Plane size={48} className="text-blue-400" />,
    },
    {
      image: "/placeholder.svg?height=120&width=120&text=Headphones",
      name: "Audio",
      path: "/category/audio",
      icon: <Headphones size={48} className="text-black" />,
    },
    {
      image: "/placeholder.svg?height=120&width=120&text=Computer",
      name: "Computer",
      path: "/category/computer",
      icon: <Monitor size={48} className="text-gray-800" />,
    },
    {
      image: "/placeholder.svg?height=120&width=120&text=Gaming+Laptop",
      name: "Gaming Laptop",
      path: "/category/gaming-laptop",
      icon: <Monitor size={48} className="text-red-500" />,
    },
    {
      image: "/placeholder.svg?height=120&width=120&text=Accessories",
      name: "Accessories",
      path: "/category/accessories",
      icon: <Cpu size={48} className="text-purple-500" />,
    },
    {
      image: "/placeholder.svg?height=120&width=120&text=Smart+Home",
      name: "Smart Home",
      path: "/category/smart-home",
      icon: <Monitor size={48} className="text-green-600" />,
    },
    {
      image: "/placeholder.svg?height=120&width=120&text=Wearables",
      name: "Wearables",
      path: "/category/wearables",
      icon: <Watch size={48} className="text-pink-500" />,
    },
  ]

  // Responsive items per slide
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(2)
      } else if (window.innerWidth < 768) {
        setItemsPerSlide(4)
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(6)
      } else {
        setItemsPerSlide(8)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    const maxSlides = Math.ceil(categories.length / itemsPerSlide)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % maxSlides)
    }, 4000) // Auto-slide every 4 seconds

    return () => clearInterval(interval)
  }, [categories.length, itemsPerSlide])

  const maxSlides = Math.ceil(categories.length / itemsPerSlide)

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="py-12 px-4 ">
      <div className="max-w-7xl mx-auto">
        {/* Category Icons Slider - Matching the provided image */}
        <div className="relative mb-12">
          {/* Slider Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {Array.from({ length: maxSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div
                    className="grid gap-4"
                    style={{
                      gridTemplateColumns: `repeat(${itemsPerSlide}, 1fr)`,
                    }}
                  >
                    {categories
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((category, index) => (
                        <Link key={`${slideIndex}-${index}`} to={category.path} className="group block">
                          <div className="bg-white rounded-md shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1">
                            {/* Image Section */}
                            <div className="relative h-32  flex items-center justify-center p-6">
                              {/* <div className="w-20 h-20 flex items-center justify-center">{category.icon}</div> */}
                              <div className="w-20 h-20 flex items-center justify-center">
                                <img 
                                  src={category.image}
                                />
                              </div>
                              {/* Hover overlay */}
                              <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Content Section */}
                            <div className="p-4 text-center">
                              <h3 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors duration-200">
                                {category.name}
                              </h3>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Dots */}
          <div className="flex justify-center mt-6 space-x-2">
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

        {/* Main Featured Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* New Arrivals - Watches */}
          <div className="lg:col-span-1 bg-white ">
            {/* Watch Display */}
          
              <img src="./Digiimage/banner-1_900x.webp" className="rounded-2xl shadow-sm " />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Special Deals */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200" style={{backgroundImage:"url(./Digiimage/banner-2_900x.webp)", backgroundPosition: "center",
                 backgroundRepeat: "no-repeat"}}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                    SPECIAL DEALS
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">CYBER MONDAY SALE</h2>
                  <p className="text-gray-600 mb-6">
                    Up to <span className="text-red-600 font-bold">50% Discount</span>, no Promo Code Needed
                  </p>
                  <Link
                    to="/product"
                    className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Shop Now
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
                
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Smart Speaker */}
              <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 rounded-2xl p-8 text-center">
                {/* <div className="w-32 h-32 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-6">
                  <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Speaker</h3>
                <p className="text-sm text-gray-600">Voice Assistant</p> */}
                <img src="./Digiimage/banner-3_580x.jpg" />
              </div>

              {/* Projector */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto bg-gray-700 rounded-lg shadow-lg flex items-center justify-center mb-6">
                    <div className="w-12 h-8 bg-gray-600 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-4">4K Projector</h3>
                  <Link
                    to="/"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium text-sm"
                  >
                    Learn More
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedSections
