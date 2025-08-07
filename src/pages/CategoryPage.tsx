"use client"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Sliders, X, ChevronDown, ChevronUp } from "lucide-react"
import ProductCard from "../components/products/ProductCard"

export default function CategoryPage() {
  let initialMinPrice = 0
  let initialMaxPrice = 50000
  const { category } = useParams()
  const catagory1 = category
    ?.replace(/-/g, " ")      // step 1: replace all hyphens with space
    .replace(/\band\b/g, "&"); // step 2: replace 'and' (as a full word) with '&'

  const [products, setProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [priceRange, setPriceRange] = useState([initialMinPrice, initialMaxPrice])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [openSections, setOpenSections] = useState({ price: true, sizes: true })
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL']


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams({
          referenceWebsite,
          ...(catagory1 && { category: catagory1 }),
          minPrice: priceRange[0].toString(),
          maxPrice: priceRange[1].toString(),
          sortBy: sortBy === "price-low" ? "actualPrice" :
            sortBy === "price-high" ? "actualPrice" :
              "createdAt",
          sortOrder: sortBy === "oldest" ? "asc" :
            sortBy === "price-low" ? "asc" :
              "desc",
          page: "1",
          limit: "100",
        })

        const res = await fetch(`${baseUrl}/product/getproducts?${queryParams.toString()}`)
        const data = await res.json()

        if (Array.isArray(data.products)) {
          setProducts(data.products)
        } else {
          console.error("Unexpected products format:", data)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [baseUrl, referenceWebsite, catagory1, priceRange, sortBy])

  useEffect(() => {
    const filtered = products.filter((product) => {
      const priceMatch = product.actualPrice >= priceRange[0] && product.actualPrice <= priceRange[1]
      if (selectedSizes.length === 0) return priceMatch
      if (!product.size) return false
      return priceMatch && selectedSizes.includes(product.size.toUpperCase())
    })

    const sorted = filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.actualPrice - b.actualPrice
        case "price-high":
          return b.actualPrice - a.actualPrice
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    setFilteredProducts(sorted)
  }, [products, priceRange, sortBy, selectedSizes])

  const handleSizeChange = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const resetFilters = () => {
    setPriceRange([initialMinPrice, initialMaxPrice])
    setSelectedSizes([])
    setSortBy("newest")
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-10">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-80">
            <div className="sticky top-24 space-y-6 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#1B2E4F]">Filters</h2>
                <X className="w-4 h-4 text-gray-400 cursor-pointer lg:hidden" />
              </div>

              {/* Price Filter */}
              <div>
                <div
                  onClick={() => toggleSection("price")}
                  className="flex justify-between items-center cursor-pointer mb-3"
                >
                  <h3 className="text-sm font-medium text-gray-800">Price Range</h3>
                  {openSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                {openSections.price && (
                  <div className="space-y-4">
                    {/* Price display */}
                    <div className="flex justify-between items-center px-4 py-2 text-sm bg-gray-100 rounded-lg border text-gray-700">
                      <span><span className="rupee">₹</span>{priceRange[0].toLocaleString()}</span>
                      <span className="text-xs text-gray-400">to</span>
                      <span><span className="rupee">₹</span>{priceRange[1].toLocaleString()}</span>
                    </div>

                    {/* Range sliders */}
                    <div className="relative pt-2">
                      <div className="relative h-1 bg-gray-200 rounded-full">
                        <div
                          className="absolute h-1 rounded-full"
                          style={{
                            background: "rgb(157 48 137)",
                            left: `${(priceRange[0] / initialMaxPrice) * 100}%`,
                            width: `${((priceRange[1] - priceRange[0]) / initialMaxPrice) * 100}%`,
                          }}
                        />
                      </div>

                      <input
                        type="range"
                        min={initialMinPrice}
                        max={initialMaxPrice}
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            Math.min(Number(e.target.value), priceRange[1] - 1),
                            priceRange[1],
                          ])
                        }
                        className="absolute top-2 w-full h-1 bg-transparent appearance-none cursor-pointer range-slider z-10"
                      />
                      <input
                        type="range"
                        min={initialMinPrice}
                        max={initialMaxPrice}
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            Math.max(Number(e.target.value), priceRange[0] + 1),
                          ])
                        }
                        className="absolute top-2 w-full h-1 bg-transparent appearance-none cursor-pointer range-slider z-10"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Size Filter */}
              {/* <div>
                <div
                  onClick={() => toggleSection("sizes")}
                  className="flex justify-between items-center cursor-pointer mb-3"
                >
                  <h3 className="text-sm font-medium text-gray-800">Sizes</h3>
                  {openSections.sizes ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                {openSections.sizes && (
                  <div className="grid grid-cols-3 gap-2">
                    {sizeOptions.map((size) => (
                      <label
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={`text-sm text-center px-2.5 py-1.5 rounded border cursor-pointer transition-all ${selectedSizes.includes(size)
                            ? "bg-[#9D3089] text-white border-[#9D3089]"
                            : "bg-white text-gray-700 border-gray-300 hover:border-[#9D3089]"
                          }`}
                      >
                        {size}
                      </label>
                    ))}
                  </div>
                )}
              </div> */}

              {/* Reset Button */}
              <button
                onClick={resetFilters}
                className="w-full mt-2 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </aside>


          {/* Main Product Grid */}
          <section className="flex-1">
            <div className="overflow-hidden">
              <div className="flex justify-between">
                <div className="lfet">
                  <h1 className="text-md font-bold capitalize" style={{ color: "#1B2E4F" }}>
                    {catagory1 || "All Products"}
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Showing <span className="text-purple-700 font-semibold">{filteredProducts.length}</span> accurated pieces
                  </p>
                </div>
                <div className="flex justify-end mb-6">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border px-4 py-2 rounded-md text-sm focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                  <div className="mb-4">
                    <Sliders className="w-10 h-10 mx-auto text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No products found</h3>
                  <p className="text-gray-500">Try changing your filters to see other options.</p>
                </div>
              ) : (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </div>

          </section>
        </div>
      </div>

      {/* Slider Custom CSS */}
      <style jsx>{`
        .range-slider::-webkit-slider-thumb {
    appearance: none;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background: #9d3089;
    cursor: pointer;
    border: 3px solid white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 2;
  }

  .range-slider::-moz-range-thumb {
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background: #9d3089;
    cursor: pointer;
    border: 3px solid white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  .range-slider::-webkit-slider-track,
  .range-slider::-moz-range-track {
    background: transparent;
  }
      `}</style>
    </div>
  )
}
