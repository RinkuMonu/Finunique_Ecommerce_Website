"use client";
import { useEffect, useState, useRef, useCallback, memo } from "react";
import type React from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronRight,
  Smartphone,
  Cpu,
  User,
  Zap,
  Wind,
  ComputerIcon as Blender,
  Lightbulb,
  Flame,
  Fan,
  Refrigerator,
  Microwave,
  ChefHat,
  WashingMachine,
  CookingPotIcon as Stove,
  AirVentIcon as Vacuum,
  Monitor,
  Headphones,
  Camera,
  Gamepad2,
  Tablet,
  Watch,
  Speaker,
  ListFilter,
  ChevronDown,
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import logo from "../../assest/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchWishlist, clearWishlist } from "../../reduxslice/WishlistSlice";
import { FaHeart, FaUser } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";

interface NavbarProps {
  onCartClick: () => void;
  cartItemCount: number;
}

interface UserData {
  firstName: string;
  lastName?: string;
  email: string;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick, cartItemCount }) => {
  const dispatch = useDispatch();
  const wishlistCount = useSelector(
    (state: any) => state.wishlist.items.length
  );
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const cartItemsFromLocalStorage = JSON.parse(
    localStorage.getItem("addtocart") || "[]"
  );
  const totalCart = isLoggedIn
    ? cartItemCount
    : cartItemsFromLocalStorage.length;

  // State management
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(
    null
  );
  const [hoveredCategoryName, setHoveredCategoryName] = useState<string | null>(
    null
  );
  const [mobileSubcategoryOpen, setMobileSubcategoryOpen] = useState<
    string | null
  >(null);

  const [groupedCategories, setGroupedCategories] = useState<
    Record<string, any[]>
  >({});
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);

  // Refs
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  // Constants
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE;
  const primaryColor = "rgb(157 48 137)";

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
        setSearchOpen(false);
        setMobileSubcategoryOpen(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Category icon mappings
  const categoryIcons = {
    // Electronics
    smartphones: <Smartphone size={32} className="text-blue-500" />,
    smartphone: <Smartphone size={32} className="text-blue-500" />,
    laptops: <Monitor size={32} className="text-purple-600" />,
    laptop: <Monitor size={32} className="text-purple-600" />,
    headphones: <Headphones size={32} className="text-green-600" />,
    headphone: <Headphones size={32} className="text-green-600" />,
    cameras: <Camera size={32} className="text-orange-600" />,
    camera: <Camera size={32} className="text-orange-600" />,
    gaming: <Gamepad2 size={32} className="text-red-600" />,
    tablets: <Tablet size={32} className="text-cyan-600" />,
    tablet: <Tablet size={32} className="text-cyan-600" />,
    watches: <Watch size={32} className="text-pink-600" />,
    watch: <Watch size={32} className="text-pink-600" />,
    speakers: <Speaker size={32} className="text-indigo-600" />,
    speaker: <Speaker size={32} className="text-indigo-600" />,
    // Home Appliances
    "air conditioning": <Wind size={32} className="text-blue-500" />,
    blender: <Blender size={32} className="text-green-500" />,
    lighting: <Lightbulb size={32} className="text-yellow-500" />,
    "flat iron": <Flame size={32} className="text-orange-500" />,
    "electric fan": <Fan size={32} className="text-blue-400" />,
    fan: <Fan size={32} className="text-blue-400" />,
    heating: <Flame size={32} className="text-red-500" />,
    refrigerator: <Refrigerator size={32} className="text-cyan-500" />,
    microwave: <Microwave size={32} className="text-gray-600" />,
    "electric cooker": <ChefHat size={32} className="text-purple-500" />,
    cooker: <ChefHat size={32} className="text-purple-500" />,
    "washing machine": <WashingMachine size={32} className="text-indigo-500" />,
    "electric stove": <Stove size={32} className="text-red-600" />,
    stove: <Stove size={32} className="text-red-600" />,
    "vacuum cleaner": <Vacuum size={32} className="text-pink-500" />,
    vacuum: <Vacuum size={32} className="text-pink-500" />,
    // Default
    default: <Cpu size={32} className="text-gray-600" />,
  };

  const sidebarIcons = {
    "home appliance": <Wind size={20} className="text-blue-600" />,
    "gaming gears": <Gamepad2 size={20} className="text-red-600" />,
    "computers & laptop": <Monitor size={20} className="text-purple-600" />,
    "computer & peripherals": <Monitor size={20} className="text-purple-600" />,
    "smartphone & tablet": <Smartphone size={20} className="text-green-600" />,
    "mobile & tablet": <Smartphone size={20} className="text-green-600" />,
    "audio gears": <Headphones size={20} className="text-orange-600" />,
    cameras: <Camera size={20} className="text-cyan-600" />,
    default: <Cpu size={20} className="text-gray-600" />,
  };

  // Helper functions
  const getCategoryIcon = (categoryName: string) => {
    const key = categoryName.toLowerCase();
    return (
      categoryIcons[key as keyof typeof categoryIcons] || categoryIcons.default
    );
  };

  const getSidebarIcon = (categoryName: string) => {
    const key = categoryName.toLowerCase();
    return (
      sidebarIcons[key as keyof typeof sidebarIcons] || sidebarIcons.default
    );
  };

  const getDropdownIcon = (categoryName: string, index: number) => {
    const colors = [
      "text-blue-600 bg-blue-100",
      "text-green-600 bg-green-100",
      "text-purple-600 bg-purple-100",
      "text-orange-600 bg-orange-100",
      "text-red-600 bg-red-100",
      "text-cyan-600 bg-cyan-100",
      "text-pink-600 bg-pink-100",
      "text-indigo-600 bg-indigo-100",
      "text-yellow-600 bg-yellow-100",
      "text-teal-600 bg-teal-100",
    ];

    const colorClass = colors[index % colors.length];
    const iconMap = {
      smartphones: (
        <Smartphone size={20} className={colorClass.split(" ")[0]} />
      ),
      smartphone: <Smartphone size={20} className={colorClass.split(" ")[0]} />,
      laptops: <Monitor size={20} className={colorClass.split(" ")[0]} />,
      laptop: <Monitor size={20} className={colorClass.split(" ")[0]} />,
      tablets: <Tablet size={20} className={colorClass.split(" ")[0]} />,
      tablet: <Tablet size={20} className={colorClass.split(" ")[0]} />,
      headphones: <Headphones size={20} className={colorClass.split(" ")[0]} />,
      cameras: <Camera size={20} className={colorClass.split(" ")[0]} />,
      default: <Cpu size={20} className={colorClass.split(" ")[0]} />,
    };

    const key = categoryName.toLowerCase();
    const icon = (iconMap as any)[key] || iconMap.default;

    return (
      <></>
      // <div
      //   className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass.split(" ")[1]
      //     }`}
      // >
      //   {icon}
      // </div>
    );
  };

  // Event handlers
  const handleLogout = useCallback(() => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    setUser(null);
    window.dispatchEvent(new Event("storage"));
    dispatch(clearWishlist());
    navigate("/login");
    window.location.reload();
    setUserMenuOpen(false);
  }, [dispatch, navigate]);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const slugify = (text) =>
        text.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-');
      const filtered = categories.filter((cat) =>
        cat.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filtered.length > 0) {
        // Use first suggestion
        const firstSuggestion = filtered[0];
        handleCategorySelect(firstSuggestion);
        navigate(`/category/${encodeURIComponent(slugify(firstSuggestion))}`);
      } else if (searchQuery) {
        // Fallback to raw query
        navigate(`/category/${encodeURIComponent(slugify(searchQuery))}`);
      }

      setSearchQuery("");
      setSearchOpen(false);
    },
    [searchQuery, navigate, categories]
  );


  const handleCategorySelect = useCallback(
    (category: string) => {
      navigate(`/category/${category.toLowerCase()}`);
      setSearchQuery("");
      setMenuOpen(false);
      setIsCollectionOpen(false);
      setMobileSubcategoryOpen(null);
    },
    [navigate]
  );

  // Data fetching
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${baseUrl}/website/${referenceWebsite}`);
        const data = await res.json();
        const grouped: Record<string, any[]> = {};
        const categoryList: string[] = [];

        if (Array.isArray(data?.website?.categories)) {
          data.website.categories.forEach((item: any) => {
            const sub = item?.subcategory;
            if (!grouped[sub]) grouped[sub] = [];
            grouped[sub].push(item);
            categoryList.push(item.name);
          });
        }

        setGroupedCategories(grouped);
        setCategories(categoryList);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [baseUrl, referenceWebsite]);

  // User and scroll effects
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("userData");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        setUser(null);
      }
    };

    loadUser();
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchQuery("");
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        // setIsCollectionOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const slugify = (text) =>
    text.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-');

  // Component render functions
  const renderSearchResults = () => (
    <div className="absolute z-20 mt-2 w-full bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 max-h-60 overflow-y-auto">
      {categories
        .filter((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((cat) => (
          <div
            key={cat}
            className="px-6 py-4 cursor-pointer transition-all duration-300 flex items-center justify-between border-b last:border-b-0 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 group"
            onClick={() => handleCategorySelect(cat)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Cpu size={14} className="text-white" />
              </div>
              <span className="font-semibold text-sm text-gray-800 group-hover:text-blue-600 transition-colors">
                {cat}
              </span>
            </div>
          </div>
        ))}
    </div>
  );

  const renderUserMenu = () => (
    <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl overflow-hidden z-30 border border-gray-100">
      {user ? (
        <>
          <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-cyan-600">
            <button onClick={() => setUserMenuOpen(false)}>
              <Link to={"/profile"} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <FaUser color="white" size={18} />
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-white font-bold text-base">
                    {user?.firstName} {user?.lastName || ""}
                  </p>
                  <p className="text-blue-100 text-sm">{user.email}</p>
                </div>
              </Link>
            </button>
          </div>
          <div className="py-3">
            <Link
              to="/wishlist"
              className="block px-6 py-4 text-sm font-semibold transition-all hover:bg-gray-50 flex items-center gap-4 group"
              onClick={() => setUserMenuOpen(false)}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaHeart color="white" size={14} />
              </div>
              <div>
                <span className="block">Your Wishlist</span>
                <span className="text-xs text-gray-500">
                  {wishlistCount} items saved
                </span>
              </div>
            </Link>
          </div>
          <div className="py-3 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-6 py-4 text-sm font-semibold transition-all hover:bg-red-50 flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CiLogin color="white" size={18} />
              </div>
              <span className="group-hover:text-red-600 transition-colors">
                Sign out
              </span>
            </button>
          </div>
        </>
      ) : (
        <div className="p-6">
          <div className="text-center mb-4">
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <h3 className="font-bold text-lg text-gray-800">Welcome!</h3>
            <p className="text-sm text-gray-500">
              Sign in for the best experience
            </p>
          </div>
          <Link
            to="/login"
            className="block w-full text-center py-4 text-white font-bold transition-all hover:shadow-lg rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105"
            onClick={() => setUserMenuOpen(false)}
          >
            Login / Register
          </Link>
          <p className="text-xs text-center text-gray-400 mt-4">
            Join us for exclusive tech deals and faster checkout
          </p>
        </div>
      )}
    </div>
  );

  const renderMobileMenu = () => (
    <div className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white shadow-2xl z-50">
        <div className="flex flex-col h-full">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-cyan-600">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-all"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
            {user ? (
              <div className="flex items-center space-x-4 text-white">
                <Link to={"/profile"} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{user.firstName}</p>
                    <p className="text-sm opacity-80">Welcome back!</p>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="text-white">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <Zap size={20} />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Electronics & More</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Link
                    to="/login"
                    className="flex-1 bg-white bg-opacity-20 text-center py-3 rounded-xl font-semibold backdrop-blur-sm hover:bg-opacity-30 transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex-1 bg-white text-center py-3 rounded-xl font-semibold text-blue-600 hover:bg-gray-100 transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="py-6">
              <h3 className="px-6 py-2 text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100">
                Categories
              </h3>
              <div className="mt-4 space-y-1">
                {categories.map((item) => (
                  <Link
                    key={item}
                    to={`/category/${item.toLowerCase()}`}
                    className="flex items-center px-6 py-4 font-semibold transition-all hover:bg-blue-50 hover:text-blue-600 group"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="w-8 h-8 mr-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Smartphone size={14} className="text-white" />
                    </div>
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div className="py-6 border-t border-gray-100">
              <h3 className="px-6 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                Account
              </h3>
              <div className="mt-4">
                <Link
                  to="/wishlist"
                  className="flex items-center justify-between px-6 py-4 font-semibold transition-all hover:bg-pink-50 hover:text-pink-600 group"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 mr-3 rounded-lg bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Heart size={14} className="text-white" />
                    </div>
                    <span>Your Wishlist</span>
                  </div>
                  {wishlistCount > 0 && (
                    <span className="text-white text-xs px-3 py-1 rounded-full font-bold bg-gradient-to-r from-pink-500 to-red-500">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
            {user && (
              <div className="p-6 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full py-4 px-6 rounded-xl font-semibold transition-all border-2 border-gray-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCollectionDropdown = () => {
    const handleSubcategoryClick = (subcategory: string) => {
      if (isMobileView) {
        setMobileSubcategoryOpen(
          mobileSubcategoryOpen === subcategory ? null : subcategory
        );
      }
    };

    return (
      <div className="absolute left-0  h-96 overflow-y-auto top-full w-full min-w-[400px] lg:min-w-[1200px] bg-white rounded-b-md shadow-xl z-50 border border-t-0">
        <div className="flex flex-col lg:flex-row">
          {/* Category List - Left Panel */}
          <div className="w-full lg:w-1/4 bg-gray-50  lg:border-r  border-white">
            <div className="py-2">
              {Object.entries(groupedCategories).map(
                ([subcategory, items], index) => (
                  <div
                    key={index}
                    className={`px-4 py-3 my-4 mx-4 border-r-2 rounded-full cursor-pointer transition-colors duration-200 border-b border-gray-200 last:border-b-0  ${activeCategory === index ||
                      mobileSubcategoryOpen === subcategory
                      ? "bg-white text-blue-600 font-semibold shadow-sm rounded-full"
                      : "hover:bg-white hover:rounded-full hover:text-blue-600"
                      }`}
                    onMouseEnter={() =>
                      !isMobileView && setActiveCategory(index)
                    }
                    onClick={() => handleSubcategoryClick(subcategory)}
                  >
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`${activeCategory === index ||
                            mobileSubcategoryOpen === subcategory
                            ? "text-blue-600"
                            : "text-gray-600"
                            }`}
                        >
                          {getSidebarIcon(subcategory)}
                        </div>
                        <span className="text-sm font-medium">
                          {subcategory}
                        </span>
                      </div>
                      {isMobileView && (
                        <ChevronRight
                          className={`w-4 h-4 text-gray-400 transition-transform ${mobileSubcategoryOpen === subcategory
                            ? "rotate-90"
                            : ""
                            }`}
                        />
                      )}
                    </div>

                    {/* Mobile subcategory items */}
                    {isMobileView && mobileSubcategoryOpen === subcategory && (
                      <div className="mt-2 ml-10 space-y-2">
                        {items.map((item: any, itemIndex: number) => (
                          <Link
                            key={itemIndex}
                            to={`/category/${item.name}`}
                            className="block py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
                            onClick={() => {
                              setIsCollectionOpen(false);
                              setMobileSubcategoryOpen(null);
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Product Grid - Right Panel (Desktop only) */}
          {!isMobileView && (
            <div className="flex-1 p-4 lg:p-6 bg-white">
              {activeCategory !== null &&
                Object.values(groupedCategories)[activeCategory] ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {Object.values(groupedCategories)[activeCategory]?.map(
                    (item: any, index: number) => (
                      <Link
                        key={index}
                        to={`/category/${slugify(item.name)}`}
                        className="group flex flex-col items-center px-2 py-4 lg:p-4 rounded-lg hover:bg-gray-50 transition-all duration-200"
                        onClick={() => setIsCollectionOpen(false)}
                      >
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2 lg:mb-3 group-hover:bg-blue-50 transition-colors duration-300">
                          {item.image ? (
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
                            />
                          ) : (
                            getCategoryIcon(item.name)
                          )}
                        </div>
                        <div className="text-center">
                          <h3 className="font-semibold text-sm lg:text-base group-hover:text-blue-600 transition-colors duration-200 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {item.price ? `From $${item.price}` : "View Products"}
                          </p>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {categories.slice(0, 6).map((categoryName, index) => (
                    <Link
                      key={index}
                      to={`/category/${categoryName.toLowerCase()}`}
                      className="group flex flex-col items-center px-2 py-4 lg:p-4 rounded-lg hover:bg-gray-50 transition-all duration-200"
                      onClick={() => setIsCollectionOpen(false)}
                    >
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2 lg:mb-3 group-hover:bg-blue-50 transition-colors duration-300">
                        {getCategoryIcon(categoryName)}
                      </div>
                      <div className="text-center">
                        <h3 className="font-semibold text-sm lg:text-base group-hover:text-blue-600 transition-colors duration-200 mb-1">
                          {categoryName}
                        </h3>
                        <p className="text-xs text-gray-500">View Products</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    );
  };

  const renderSubcategoryDropdown = (subcategory: string, items: any[]) => (
    <div className="absolute left-0 top-[14px] mt-2 w-auto min-w-[300px] bg-white shadow-xl rounded-md z-50 border">
      <div className="p-4 lg:p-6">
        <div className="flex flex-col space-y-3 lg:space-y-4">
          {items.slice(0, 8).map((item: any, itemIndex: number) => (
            <Link
              to={`/category/${slugify(item.name)}`}
              key={itemIndex}
              className="flex items-center space-x-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
            >
              <img src={item.image} className="w-10 h-10 rounded-full"></img>
              {getDropdownIcon(item.name, itemIndex)}
              <div className="flex-1">
                <div className="font-medium  text-[#ca6296] transition-colors duration-200 text-sm lg:text-base">
                  {item.name}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {items.length > 8 && (
          <div className="mt-4 lg:mt-6 pt-3 lg:pt-4 border-t border-gray-200 text-center">
            <Link
              to={`/category/${subcategory.toLowerCase()}`}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All {subcategory}
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <nav
        className={`bg-white border-b border-gray-100 sticky top-0 z-40 shadow-none py-2 transition-all duration-300 ${isSticky ? "shadow-md" : ""
          }`}
        ref={navbarRef}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={logo || "/placeholder.svg"}
                alt="Logo"
                className="h-12 w-auto lg:h-16"
              />
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-4 lg:mx-8">
              <div className="relative w-full" ref={searchRef}>
                <form onSubmit={handleSearchSubmit} className="w-full">
                  <div className="relative">
                    <input
                      type="search"
                      className="w-full pl-6 pr-14 py-2 lg:py-3 text-sm border-2 border-gray-200 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white"
                      placeholder="Search for electronics, gadgets, accessories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all hover:scale-110"
                    >
                      <Search size={16} />
                    </button>
                  </div>
                  {searchQuery && renderSearchResults()}
                </form>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-2">
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-100 transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold">
                    {user ? user.firstName : "Account"}
                  </span>
                </button>
                {userMenuOpen && renderUserMenu()}
              </div>

              {/* Wishlist */}
              <button
                onClick={() => navigate("/wishlist")}
                className="relative p-2 lg:p-3 rounded-full text-gray-700 hover:bg-gray-100 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-100 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart size={16} className="text-white" />
                </div>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500 shadow-lg animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Cart */}
              <button
                onClick={onCartClick}
                className="relative p-2 lg:p-3 rounded-full text-gray-700 hover:bg-gray-100 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-100 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShoppingCart size={16} className="text-white" />
                </div>
                {totalCart > 0 && (
                  <span className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center bg-gradient-to-r from-green-100 to-emerald-500 shadow-lg animate-bounce">
                    {totalCart}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            <div className="flex lg:hidden items-center space-x-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
              >
                <Search size={20} />
              </button>
              <button
                onClick={onCartClick}
                className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
              >
                <ShoppingCart size={20} />
                {totalCart > 0 && (
                  <span className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500">
                    {totalCart}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {searchOpen && (
            <div className="lg:hidden pb-4">
              <div className="relative" ref={searchRef}>
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <input
                      type="search"
                      className="w-full pl-6 pr-14 py-3 text-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-gray-50"
                      placeholder="Search electronics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white"
                    >
                      <Search size={16} />
                    </button>
                  </div>
                  {searchQuery && renderSearchResults()}
                </form>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Category Navigation */}
      <div className="bg-gradient-to-br from-[#2a4172] to-[#dd45a8] border-b border-gray-200 p-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            {/* Browse All Collection Dropdown */}
            <div
              className="w-full lg:w-1/4 relative"
              onMouseEnter={() => !isMobileView && setIsCollectionOpen(true)}
              onMouseLeave={() => !isMobileView && setIsCollectionOpen(false)}
            >
              <button
                onClick={() =>
                  isMobileView && setIsCollectionOpen(!isCollectionOpen)
                }
                className="w-full text-white bg-[#c7588cc9] p-3 lg:p-4 cursor-pointer hover:bg-[#C7588C] transition-all duration-200 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  {/* <ListFilter size={20} /> */}
                  <span className="font-semibold text-white text-sm lg:text-base">
                    Browse All Category
                  </span>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-white transition-transform ${isCollectionOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Collection Dropdown */}
              {isCollectionOpen && renderCollectionDropdown()}
            </div>

            {/* Navigation Menu - Right side */}
            <div className="flex-1 py-3 lg:py-4">
              <div className="flex items-center justify-start lg:ms-20">
                <nav className="hidden xl:block">
                  <ul className="flex space-x-6 lg:space-x-8 items-center">
                    <li>
                      <Link
                        to={"/"}
                        className="font-medium text-white hover:text-[#f7f5f6] transition-colors duration-200 uppercase text-xs flex items-center gap-2"
                      >
                        {/* <img
                          src="./Digiimage/1.avif" // Replace with the correct path to your image
                          alt="Home Icon"
                          className="h-4 w-4 rounded-full" // Adjust size as needed
                        /> */}
                        HOME
                      </Link>
                    </li>
                    {Object.entries(groupedCategories)
                      .slice(0, 4)
                      .map(([subcategory, items], index) => (
                        <li
                          key={index}
                          className="relative group"
                          onMouseEnter={() =>
                            !isMobileView && setHoveredSubcategory(subcategory)
                          }
                          onMouseLeave={() =>
                            !isMobileView && setHoveredSubcategory(null)
                          }
                        >
                          <span className="font-medium text-white hover:text-[#f7f5f6] transition-colors duration-200 uppercase cursor-pointer text-xs flex items-center gap-2">
                            {/* <img
                              src={`/path/to/${subcategory}-icon.svg`} // Replace with the correct path to your image
                              alt={`${subcategory} Icon`}
                              className="h-4 w-4" // Adjust size as needed
                            /> */}
                            {subcategory}
                          </span>
                          {hoveredSubcategory === subcategory &&
                            renderSubcategoryDropdown(subcategory, items)}
                        </li>
                      ))}
                    <li
                      className="relative group font-medium text-white hover:text-[#f7f5f6] transition-colors duration-200 uppercase text-xs flex items-center gap-2 cursor-pointer"
                      onMouseEnter={() => !isMobileView && setHoveredSubcategory("more")}
                      onMouseLeave={() => !isMobileView && setHoveredSubcategory(null)}
                    >

                      More Product <ChevronDown size={18} />
                      {hoveredSubcategory === "more" && (
                        <div className="absolute -left-[150px] top-[12px] h-92 overflow-y-auto mt-2 w-auto min-w-[200px] bg-white shadow-xl rounded-md z-50 border" style={{ height: "80vh", overflowY: "auto" }}>
                          <div className="p-4">
                            <ul className="space-y-4">
                              {Object.entries(groupedCategories)
                                .slice(5)
                                .map(([subcategory, items], index) => {
                                  const uniqueItems = Array.from(
                                    new Map(
                                      items.map((item) => [
                                        item.name.toLowerCase(),
                                        item,
                                      ])
                                    ).values()
                                  );

                                  return uniqueItems.map((item, i) => (
                                    <li
                                      key={`${subcategory}-${i}`}
                                      onMouseEnter={() => setHoveredCategoryName(item.name)}
                                      onMouseLeave={() => setHoveredCategoryName(null)}
                                      className="relative group"
                                    >
                                      <Link
                                        to={`/category/${encodeURIComponent(
                                          slugify(item.name).toLowerCase()
                                        )}`}
                                        className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                      >
                                        <span className="text-sm font-medium text-gray-800 truncate">
                                          {item.name}
                                        </span>
                                      </Link>
                                    </li>
                                  ));
                                })}
                            </ul>
                          </div>
                        </div>
                      )}
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

          </div>
        </div>
      </div>
      {menuOpen && renderMobileMenu()}
    </>
  );
};

export default memo(Navbar);