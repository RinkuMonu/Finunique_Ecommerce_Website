"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Sliders, X, ChevronDown, ChevronUp } from "lucide-react";
import ProductCard from "../components/products/ProductCard";

const initialMinPrice = 0;
const initialMaxPrice = 50000;
const BrandOptions = [];
export default function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<[]>([]);
  const [priceRange, setPriceRange] = useState([
    initialMinPrice,
    initialMaxPrice,
  ]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [openSections, setOpenSections] = useState({
    price: true,
    brands: true,
  });
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/product/getproducts?referenceWebsite=${referenceWebsite}`
        );
        const data = await res.json();
        if (Array.isArray(data.products)) {
          setProducts(data.products);
          console.log(data);
        } else {
          console.error("Unexpected products format:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [baseUrl, referenceWebsite]);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const priceMatch =
        product.actualPrice >= priceRange[0] &&
        product.actualPrice <= priceRange[1];
      if (selectedBrands.length === 0) return priceMatch;

      // If product has no Brand property, don't show it when Brands are selected
      if (!product.Brand) return false;

      // Only show products that match selected Brands
      return priceMatch && selectedBrands.includes(product.Brand.toUpperCase());
    });

    const sorted = filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.actualPrice - b.actualPrice;
        case "price-high":
          return b.actualPrice - a.actualPrice;
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "popularity":
          return (b.popularity || 0) - (a.popularity || 0);
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

    setFilteredProducts(sorted);
  }, [products, priceRange, sortBy, selectedBrands]);

  const handleBrandChange = (Brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(Brand) ? prev.filter((s) => s !== Brand) : [...prev, Brand]
    );
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const resetFilters = () => {
    setPriceRange([initialMinPrice, initialMaxPrice]);
    setSelectedBrands([]);
    setSortBy("newest");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold capitalize mb-4"
            style={{ color: "#1B2E4F" }}
          >
            {category?.replace(/-/g, " ") || "All Products"}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of{" "}
            <span
              className="font-semibold"
              style={{ color: "rgb(157 48 137)" }}
            >
              {filteredProducts.length}
            </span>{" "}
            authentic traditional pieces
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            {/* <button
              onClick={resetFilters}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors font-medium px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-white"
            >
              <X className="h-4 w-4" />
              <span>Reset</span>
            </button> */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md border ${
                  viewMode === "grid"
                    ? "bg-[#9D3089] text-white border-[#9D3089]"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
                title="Grid View"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM13 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM13 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md border ${
                  viewMode === "list"
                    ? "bg-[#9D3089] text-white border-[#9D3089]"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
                title="List View"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M4 6h12M4 10h12M4 14h12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* <button
              onClick={() => {}}
              className="flex items-center space-x-2 text-white px-6 py-2.5 rounded-lg transition-colors font-medium"
              style={{ background: "rgb(157 48 137)" }}
            >
              <Sliders className="h-4 w-4" />
              <span>Filters</span>
            </button> */}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 space-y-6 `}>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold" style={{ color: "#1B2E4F" }}>
                Filters
              </h2>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Price Range */}
            <div className="border-b border-gray-200 pb-6">
              <div
                className="flex justify-between items-center cursor-pointer mb-4"
                onClick={() => toggleSection("price")}
              >
                <h3 className="font-semibold text-gray-800">Price Range</h3>
                {openSections.price ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </div>
              {openSections.price && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">
                      ₹{priceRange[0].toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500">to</span>
                    <span className="text-sm font-medium text-gray-700">
                      ₹{priceRange[1].toLocaleString()}
                    </span>
                  </div>

                  <div className="relative pt-2">
                    <div className="relative h-1 bg-gray-200 rounded-full">
                      <div
                        className="absolute h-1 rounded-full"
                        style={{
                          background: "rgb(157 48 137)",
                          left: `${(priceRange[0] / initialMaxPrice) * 100}%`,
                          width: ` ${
                            ((priceRange[1] - priceRange[0]) /
                              initialMaxPrice) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    <input
                      type="range"
                      min={initialMinPrice}
                      max={initialMaxPrice}
                      value={priceRange[0]}
                      onChange={(e) => {
                        const value = Math.min(
                          Number(e.target.value),
                          priceRange[1] - 1
                        );
                        setPriceRange([value, priceRange[1]]);
                      }}
                      className="absolute top-2 w-full h-1 bg-transparent appearance-none cursor-pointer range-slider"
                    />
                    <input
                      type="range"
                      min={initialMinPrice}
                      max={initialMaxPrice}
                      value={priceRange[1]}
                      onChange={(e) => {
                        const value = Math.max(
                          Number(e.target.value),
                          priceRange[0] + 1
                        );
                        setPriceRange([priceRange[0], value]);
                      }}
                      className="absolute top-2 w-full h-1 bg-transparent appearance-none cursor-pointer range-slider"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">
                        Min Price
                      </label>
                      <input
                        type="number"
                        min={initialMinPrice}
                        max={initialMaxPrice}
                        value={priceRange[0]}
                        onChange={(e) => {
                          const value = Number(e.target.value) || 0;
                          if (value <= priceRange[1])
                            setPriceRange([value, priceRange[1]]);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                        placeholder="Min"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">
                        Max Price
                      </label>
                      <input
                        type="number"
                        min={initialMinPrice}
                        max={initialMaxPrice}
                        value={priceRange[1]}
                        readOnly
                        onChange={(e) => {
                          const value =
                            Number(e.target.value) || initialMaxPrice;
                          if (value >= priceRange[0])
                            setPriceRange([priceRange[0], value]);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {BrandOptions.map((Brand) => (
                <label
                  key={Brand}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(Brand)}
                      onChange={() => handleBrandChange(Brand)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        selectedBrands.includes(Brand)
                          ? "border-purple-600 bg-purple-600"
                          : "border-gray-300 group-hover:border-purple-400"
                      }`}
                    >
                      {selectedBrands.includes(Brand) && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {Brand}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={resetFilters}
              className="w-full py-3 text-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Reset All Filters
            </button>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-200">
                  <Sliders className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Try adjusting your filters or explore other categories to find
                  your perfect piece.
                </p>
                {/* <button
                  onClick={resetFilters}
                  className="px-6 py-3 text-white rounded-lg font-medium transition-colors hover:shadow-lg"
                  style={{ background: "rgb(157 48 137)" }}
                >
                  Reset All Filters
                </button> */}
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="border rounded-xl p-4 shadow-sm"
                  >
                    <ProductCard product={product} listView={true} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Custom CSS for range sliders */}
      <style jsx>{`
        .range-slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: rgb(157 48 137);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          position: relative;
          z-index: 2;
        }

        .range-slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: rgb(157 48 137);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .range-slider::-webkit-slider-track {
          background: transparent;
        }

        .range-slider::-moz-range-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}
