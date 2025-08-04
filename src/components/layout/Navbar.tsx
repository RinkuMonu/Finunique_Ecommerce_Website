"use client"
import { useEffect, useState, useRef, useCallback, memo } from "react"
import { Search, Heart, ShoppingCart, Menu, X, ChevronDown, Smartphone, Cpu, User } from "lucide-react"
import { Link } from "react-router-dom"
import logo from "../../assest/logo.jpg"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchWishlist, clearWishlist } from "../../reduxslice/WishlistSlice"
import { FaHeart, FaUser } from "react-icons/fa"
import { CiLogin } from "react-icons/ci"

const Navbar: React.FC<NavbarProps> = ({ onCartClick, cartItemCount }) => {
  const dispatch = useDispatch()
  const wishlistCount = useSelector((state: any) => state.wishlist.items.length)
  const navigate = useNavigate()
  const isLoggedIn = !!localStorage.getItem("token")

  const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem("addtocart") || "[]")
  const totalCart = isLoggedIn ? cartItemCount : cartItemsFromLocalStorage.length

  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)

  const searchRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const moreMenuRef = useRef<HTMLDivElement>(null)

  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE

  const handleLogout = useCallback(() => {
    localStorage.removeItem("userData")
    localStorage.removeItem("token")
    setUser(null)
    window.dispatchEvent(new Event("storage"))
    dispatch(clearWishlist())
    navigate("/login")
    window.location.reload()
    setUserMenuOpen(false)
  }, [dispatch, navigate])

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
      setSearchOpen(false)
    }
  }, [searchQuery, navigate])

  const handleCategorySelect = useCallback((category: string) => {
    navigate(`/category/${category.toLowerCase()}`)
    setSearchQuery("")
    setMoreMenuOpen(false)
    setMenuOpen(false)
  }, [navigate])

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

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("userData")
        setUser(storedUser ? JSON.parse(storedUser) : null)
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
        setUser(null)
      }
    }
    loadUser()
    const handleScroll = () => setIsSticky(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("storage", loadUser)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("storage", loadUser)
    }
  }, [])

  useEffect(() => {
    dispatch(fetchWishlist())
  }, [dispatch])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchQuery("")
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const renderSearchResults = () => (
    <div className="absolute z-20 mt-2 w-full bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 max-h-60 overflow-y-auto">
      {categories
        .filter((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((cat, index) => (
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
  )

  const renderUserMenu = () => (
    <div className="absolute right-0 mt-3 w-72 bg-white shadow-lg rounded-2xl overflow-hidden z-30 border border-gray-100">
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
                <span className="text-xs text-gray-500">{wishlistCount} items saved</span>
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
              <span className="group-hover:text-red-600 transition-colors">Sign out</span>
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
            <p className="text-sm text-gray-500">Sign in for the best experience</p>
          </div>
          <Link
            to="/login"
            className="block w-full text-center py-4 text-white font-bold transition-all hover:shadow-lg rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105"
            onClick={() => setUserMenuOpen(false)}
          >
            Login / Register
          </Link>
          <p className="text-xs text-center text-gray-400 mt-4">Join us for exclusive tech deals and faster checkout</p>
        </div>
      )}
    </div>
  )

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
              <h3 className="px-6 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">Account</h3>
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
  )

  return (
    <>
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-lg py-2">
        <div className="container mx-auto px-10">
          <div className="flex items-center justify-between h-18">
            <Link to="/" className="flex items-center space-x-3">
              <img src={logo || "/placeholder.svg"} alt="Logo" className="h-20 w-25 rounded" />
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full" ref={searchRef}>
                <form onSubmit={handleSearchSubmit} className="w-full">
                  <div className="relative">
                    <input
                      type="search"
                      className="w-full pl-6 pr-14 py-3 text-sm border-2 border-gray-200 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white"
                      placeholder="Search for electronics, gadgets, accessories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all hover:scale-110"
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
                  <span className="text-sm font-semibold">{user ? user.firstName : "Account"}</span>
                </button>
                {userMenuOpen && renderUserMenu()}
              </div>

              {/* Wishlist */}
              <button
                onClick={() => navigate("/wishlist")}
                className="relative p-3 rounded-full text-gray-700 hover:bg-gray-100 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-100 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart size={16} className="text-white" />
                </div>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500 shadow-lg animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Cart */}
              <button
                onClick={onCartClick}
                className="relative p-3 rounded-full text-gray-700 hover:bg-gray-100 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-100 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShoppingCart size={16} className="text-white" />
                </div>
                {totalCart > 0 && (
                  <span className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center bg-gradient-to-r from-green-100 to-emerald-500 shadow-lg animate-bounce">
                    {totalCart}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            <div className="flex lg:hidden items-center space-x-4">
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
                      className="w-full pl-6 pr-14 py-4 text-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all bg-gray-50"
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
      <div className="hidden lg:block bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-3 py-4">
          {categories.length > 4 && (
              <div className="relative" ref={moreMenuRef}>
                <button
                  onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-black hover:font-bold hover:bg-white hover:rounded-sm transition-all group"
                >
                  <span>Browse All Collection</span>

                  <div className=" flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ChevronDown
                      size={12}
                      className={`text-black transition-transform ${moreMenuOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>
                <div
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-80 bg-white shadow-lg rounded-2xl border border-gray-100 z-50 ${moreMenuOpen ? 'block' : 'hidden'}`}
                  onMouseLeave={() => setMoreMenuOpen(false)}
                >
                  <div className="p-6">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">More Categories</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {categories.slice(6).map((item) => (
                        <Link
                          key={item}
                          to={`/category/${item.toLowerCase()}`}
                          className="flex items-center space-x-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all group"
                          onClick={() => handleCategorySelect(item)}
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 rounded-sm text-sm font-semibold text-gray-700 hover:font-blod hover:bg-white transition-all group"
            >
              Home
            </Link>
            {categories.slice(0, 4).map((item) => (
              <Link
                key={item}
                to={`/category/${item.toLowerCase()}`}
                className="flex items-center space-x-2 px-4 py-2 rounded-sm gap-2 text-[12px] font-semibold text-gray-700 hover:font-bold hover:bg-white transition-all group"
              >
                {item}
              </Link>
            ))}
            
          </div>
        </div>
      </div>

      {menuOpen && renderMobileMenu()}
    </>
  )
}

export default memo(Navbar)
