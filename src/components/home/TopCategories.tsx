"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Package, Star, ChevronRight, Sparkle } from "lucide-react"

const styleMap: Record<string, any> = {
  "Kalmkari Print Fabric": {
    count: "320+ Products",
    image: "/saree1.webp",
    trending: true,
    bgColor: "#384D89",
  },
  "Cotton mal mal saree": {
    count: "450+ Products",
    image: "/saree2.webp",
    trending: false,
    bgColor: "#2A4172",
  },
  "Chanderi Silk saree": {
    count: "180+ Products",
    image: "/saree3.webp",
    trending: true,
    bgColor: "#1B2E4F",
  },
  "Maheswari Silk saree": {
    count: "210+ Products",
    image: "/saree4.webp",
    trending: false,
    bgColor: "#14263F",
  },
  "Kota Doriya Saree": {
    count: "380+ Products",
    image: "/saree5.webp",
    trending: true,
    bgColor: "#A13C78",
  },
  "Cotton Suit": {
    count: "150+ Products",
    image: "/saree6.webp",
    trending: false,
    bgColor: "#872D67",
  },
  "Sanganeri Print Fabric": {
    count: "160+ Products",
    image: "/saree7.webp",
    trending: true,
    bgColor: "#681853",
  },
  "Dabu Print Fabric": {
    count: "140+ Products",
    image: "/saree8.webp",
    trending: false,
    bgColor: "#C1467F",
  },
  "Bagru Print": {
    count: "130+ Products",
    image: "/saree9.webp",
    trending: false,
    bgColor: "#384D89",
  },
  "Cotton Suit In Kota": {
    count: "170+ Products",
    image: "/saree10.webp",
    trending: true,
    bgColor: "#2A4172",
  },
  "Chanderi Silk Suits": {
    count: "190+ Products",
    image: "/saree11.webp",
    trending: false,
    bgColor: "#1B2E4F",
  },
}

export default function TopCategories() {
  const [categories, setCategories] = useState<string[]>([])
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseUrl}/website/${referenceWebsite}`)
        const data = await res.json()
        if (Array.isArray(data.website?.categories)) {
          const categoryNames = data.website.categories.map((cat: any) => cat.name)
          setCategories(categoryNames)
        } else {
          console.warn("Categories not found in response:", data)
          setCategories(["Suits", "Sarees", "Fabrics", "Men's Wear", "Women's Wear", "Accessories"])
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error)
        setCategories(["Suits", "Sarees", "Fabrics", "Men's Wear", "Women's Wear", "Accessories"])
      }
    }
    fetchCategories()
  }, [baseUrl, referenceWebsite])

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Simple Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span
              className="flex gap-2 align-center text-sm font-semibold px-4 py-2 rounded-full text-[#ff9f43]"
              style={{ backgroundColor: "#fff0e1" }}
            ><Sparkle className="w-5" />
              Shop Categories
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ color: "#1B2E4F" }}>
            Browse Our Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of premium products across different categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {categories.map((name, index) => {
            const styles = styleMap[name] || {
              count: "100+ Products",
              image: "/saree12.webp",
              trending: false,
              bgColor: "#384D89",
            }

            const isHovered = hoveredCard === name

            return (
              <Link
                key={name}
                to={`/category/${name.toLowerCase()}`}
                className="group"
                onMouseEnter={() => setHoveredCard(name)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300 transform hover:-translate-y-1">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={styles.image || "/placeholder.svg"}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-300"
                      style={{ backgroundColor: styles.bgColor }}
                    />

                    {/* Trending Badge */}
                    {styles.trending && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Trending
                      </div>
                    )}

                    {/* Product Count */}
                    <div className="absolute top-3 right-3 bg-white/90 text-gray-700 text-xs font-medium px-2 py-1 rounded">
                      {styles.count}
                    </div>

                    {/* Hover Actions */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center space-x-4 transition-all duration-300 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:scale-110 transition-transform">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {name}
                      </h3>
                      {/* <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: styles.bgColor }}
                      >
                        {index + 1}
                      </div> */}
                    </div>

                    {/* <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      Premium collection of {name.toLowerCase()} with authentic craftsmanship
                    </p> */}

                    {/* Stats */}
                    {/* <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Package size={14} />
                        <span>{styles.count.split("+")[0]}+ items</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="fill-yellow-400 stroke-yellow-400" />
                        <span>4.8</span>
                      </div>
                    </div> */}

                    {/* Shop Now Button */}
                    {/* <div className="flex items-center justify-between">
                      <span
                        className="font-medium group-hover:underline transition-all"
                        style={{ color: styles.bgColor }}
                      >
                        Shop Now
                      </span>
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                        style={{ color: styles.bgColor }}
                      />
                    </div> */}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Simple Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Categories", value: categories.length.toString(), color: "#384D89" },
            { label: "Products", value: "2000+", color: "#A13C78" },
            { label: "Rating", value: "4.8/5", color: "#2A4172" },
            { label: "Customers", value: "10K+", color: "#C1467F" },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
