"use client"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Sliders, X, ChevronDown, ChevronUp } from "lucide-react"
import ProductCard from "../components/products/ProductCard"

export default function CategoryByProduct() {
  let initialMinPrice = 0
  let initialMaxPrice = 30000

  const { slug } = useParams()
  const { state } = useLocation()
  // ✅ Convert slug to proper subcategory name
  const catagory1 = slug
    ?.replace(/-/g, " ")      // replace hyphens with spaces
    .replace(/\band\b/gi, "&") // replace 'and' with '&'
    .replace(/\b\w/g, c => c.toUpperCase()) // capitalize each word

const subcategoryName = state?.subcategoryName;
  const [products, setProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [priceRange, setPriceRange] = useState([initialMinPrice, initialMaxPrice])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [openSections, setOpenSections] = useState({ price: true, sizes: true })
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  // ✅ Fetch products when catagory1 changes
  useEffect(() => {
    const fetchProducts = async () => {
       if (!subcategoryName) return;
       
      try {
        const res = await fetch(`${baseUrl}/product/getproduct/subcategory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subcategory: subcategoryName,
            referenceWebsite,
          }),
        })

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

    if (catagory1) {
      fetchProducts()
    }
  }, [baseUrl, referenceWebsite, subcategoryName])

  // ✅ Apply filters & sorting
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
                    <div className="flex justify-between items-center px-4 py-2 text-sm bg-gray-100 rounded-lg border text-gray-700">
                      <span><span className="rupee">₹</span>{priceRange[0].toLocaleString()}</span>
                      <span className="text-xs text-gray-400">to</span>
                      <span><span className="rupee">₹</span>{priceRange[1].toLocaleString()}</span>
                    </div>

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
                    Showing <span className="text-purple-700 font-semibold">{filteredProducts.length}</span> products
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
    </div>
  )
}
