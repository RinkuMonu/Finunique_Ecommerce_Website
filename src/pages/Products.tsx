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
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [priceRange, setPriceRange] = useState([initialMinPrice, initialMaxPrice]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [moreProduct, setMoreProduct] = useState(15);
  const [openSections, setOpenSections] = useState({
    price: true,
    brands: true,
    subcategories: false,
  });
  const [subcategories, setSubcategories] = useState<Record<string, any[]>>({});
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseUrl}/product/getproducts?referenceWebsite=${referenceWebsite}`);
        
        const data = await res.json()
        console.log("Fetched products ....................:", data);
    
        if (Array.isArray(data.products)) {
          setProducts(data.products);
          setFilteredProducts(data.products); // Initialize filtered products with all products
        } else {
          console.error("Unexpected products format:", data)
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [baseUrl, referenceWebsite]);

  useEffect(() => {
    const filtered = products.filter((product) => {
      // Price filter
      const priceMatch =
        product.actualPrice >= priceRange[0] &&
        product.actualPrice <= priceRange[1];

      // Brand filter
      const brandMatch = selectedBrands.length === 0 ||
        (product.Brand && selectedBrands.includes(product.Brand.toUpperCase()));

      // Category filter
      const categoryMatch = selectedCategories.length === 0 ||
        (product.category && selectedCategories.includes(product.category._id));

      return priceMatch && brandMatch && categoryMatch;
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
  }, [products, priceRange, sortBy, selectedBrands, selectedCategories]);

  const handleBrandChange = (Brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(Brand) ? prev.filter((s) => s !== Brand) : [...prev, Brand]
    );
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [categoryId] // Only select one category at a time
    );
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const resetFilters = () => {
    setPriceRange([initialMinPrice, initialMaxPrice]);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSortBy("newest");
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 100) {
        setMoreProduct((prev) => prev + 15);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseUrl}/website/${referenceWebsite}`);
        const data = await res.json();
        const grouped: Record<string, any[]> = {};
        const categories: string[] = [];

        if (Array.isArray(data?.website?.categories)) {
          data.website.categories.forEach((item: any) => {
            const sub = item?.subcategory;
            if (!grouped[sub]) grouped[sub] = [];
            grouped[sub].push(item);
            if (!categories.includes(sub)) {
              categories.push(sub);
            }
          });
        }
        setSubcategories(grouped);
        setCategoryList(categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [baseUrl, referenceWebsite]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <div className="">
              <h1 className="text-md md:text-md font-bold capitalize" style={{ color: "#1B2E4F" }}>
                {category?.replace(/-/g, " ") || "All Products"}
              </h1>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                Discover our curated collection of{" "}
                <span className="font-semibold" style={{ color: "rgb(157 48 137)" }}>
                  {filteredProducts.length}
                </span>{" "}
                authentic traditional pieces
              </p>
            </div>


          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
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
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md border ${viewMode === "grid"
                  ? "bg-[#9D3089] text-white border-[#9D3089]"
                  : "bg-white text-gray-600 border-gray-300"
                  }`}
                title="Grid View"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM13 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM13 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md border ${viewMode === "list"
                  ? "bg-[#9D3089] text-white border-[#9D3089]"
                  : "bg-white text-gray-600 border-gray-300"
                  }`}
                title="List View"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M4 6h12M4 10h12M4 14h12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
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
                    {/* Display values */}
                    <div className="flex justify-between items-center px-4 py-2 text-sm bg-gray-100 rounded-lg border text-gray-700">
                      <span><span className="rupee">₹</span>{priceRange[0].toLocaleString()}</span>
                      <span className="text-xs text-gray-400">to</span>
                      <span><span className="rupee">₹</span>{priceRange[1].toLocaleString()}</span>
                    </div>

                    {/* Range Slider */}
                    <div className="relative pt-2">
                      <div className="relative h-1 bg-gray-200 rounded-full">
                        <div
                          className="absolute h-1 rounded-full"
                          style={{
                            background: "#9D3089",
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
              <div>
                <div
                  onClick={() => toggleSection("sizes")}
                  className="flex justify-between items-center cursor-pointer mb-3"
                >
                  <h3 className="text-sm font-medium text-gray-800">Sizes</h3>
                  {openSections.sizes ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                {openSections.sizes && (
                  <div className="grid grid-cols-3 gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
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
              </div>

              {/* Reset Button */}
              <button
                onClick={resetFilters}
                className="w-full mt-2 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </aside>


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
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.slice(0, moreProduct).map((product) => (
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