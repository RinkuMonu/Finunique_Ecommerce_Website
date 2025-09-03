"use client";
import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  ShoppingCart,
  Star,
  X,
  Minus,
  Plus,
  CheckCircle,
  Zap,
  Truck,
} from "lucide-react";
import Arrivals from "../components/home/Arrivals";
import { useDispatch } from "react-redux";
import LoginModal from "../components/loginModal/LoginModal";
import { addItemToCart } from "../reduxslice/CartSlice";
import Login1 from "./Login1";
import { RatingModal } from "./reviewmodal";
import { FaChevronRight } from "react-icons/fa";

/* ================= Helpers ================= */
const clean = (v?: any) => (v ?? "").toString().trim();
const titleCase = (s: string) =>
  s.toLowerCase().split(" ").map(w => (w ? w[0].toUpperCase() + w.slice(1) : "")).join(" ");
const canonicalKey = (k: string) => {
  const key = (k || "").toLowerCase();
  const map: Record<string, string> = {
    ram: "RAM",
    memory: "RAM",
    color: "Color",
    colours: "Color",
    storage: "Storage",
    size: "Size",
    capacity: "Capacity",
    variant: "Variant",
  };
  return map[key] || titleCase(k);
};
const queryKeyFor = (k: string) => {
  const key = k.toLowerCase();
  if (key === "ram") return "ram";
  if (key === "color") return "color";
  if (key === "storage") return "storage";
  if (key === "size") return "size";
  if (key === "capacity") return "capacity";
  if (key === "variant") return "variant";
  return key;
};
const isAbsUrl = (u?: string) => !!u && /^https?:\/\//i.test(u || "");
const uniq = <T,>(arr: T[]) => Array.from(new Set(arr));

/* ================= Types ================= */
type RawVariant = {
  isDefault?: boolean;
  sku?: string;
  status?: string;
  inventory?: { totalStock?: number; lowStockThreshold?: number };
  pricing?: { mrp?: number; price?: number; currency?: string };
  options?: Record<string, string>;
  images?: string[];
  weight?: any;
  dimensions?: any;
};

type RawProduct = {
  _id: string;
  slug?: string;
  productName: string;
  description?: string;
  images: string[];
  price?: number;
  discount?: number;
  keyFeatures?: string[];
  rating?: { avg?: number; count?: number };
  attributesFlat?: Record<string, string>;
  specs?: Array<{ group?: string; key?: string; value?: string }>;
  variants?: RawVariant[];
  selectedVariant?: RawVariant;
  maxOrderQty?: number;
  minOrderQty?: number;
  category: { _id: string; name: string };
  [key: string]: any;
};

type Variant = {
  id: string;
  sku?: string;
  status: string;
  inStock: boolean;
  inventoryQty: number;
  price: number;
  mrp: number;
  discountPct: number;
  options: Record<string, string>;
  images: string[];
};

type Product = RawProduct & {
  variants: Variant[];
  allOptionKeys: string[];
};

/* ================= Component ================= */
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE as string;
  const baseUrl = import.meta.env.VITE_API_BASE_URL as string;
  const Image_BaseURL = import.meta.env.VITE_API_BASE_URL_IMAGE as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<RawProduct[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [mainImage, setMainImage] = useState<string>("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isRatingModalOpen, setRatingModalOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [addedProduct, setAddedProduct] = useState<any>(null);
  const [review, setReview] = useState<any[]>([]);
  const [gettoken, settoken] = useState<string | null>(null);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  /* ---------- Zoom ---------- */
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const zoomTimeoutRef = useRef<any>(null);

  const imgSrc = (u?: string) =>
    !u ? "/placeholder.svg?height=600&width=600" : isAbsUrl(u) ? u : `${Image_BaseURL}${u}`;

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={18}
        className={i < Math.floor(rating) ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-400"}
      />
    ));

  /* ---------- Reviews ---------- */
  useEffect(() => {
    const token = localStorage.getItem("token");
    settoken(token);
    const fetchReview = async () => {
      try {
        const response = await fetch(`${baseUrl}/sendreview/${id}`);
        const data = await response.json();
        setReview(data);
      } catch {
        setReview([]);
      }
    };
    if (id) fetchReview();
  }, [id, isRatingModalOpen, baseUrl]);

  /* ---------- Product fetch + normalize ---------- */
  useEffect(() => {
    const normalize = (raw: RawProduct): Product => {
      const list = Array.isArray(raw.variants) ? raw.variants : [];
      const normalized: Variant[] = list.map((v, idx) => {
        const price = Number(v.pricing?.price ?? 0);
        const mrp = Number(v.pricing?.mrp ?? price);
        const discountPct = mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;
        const inStock = v?.status === "IN_STOCK" || (v?.inventory?.totalStock ?? 0) > 0;

        const options: Record<string, string> = {};
        Object.entries(v.options || {}).forEach(([k, val]) => {
          const key = canonicalKey(k);
          if (val != null) options[key] = clean(String(val));
        });

        const id =
          v.sku ||
          `${Object.entries(options).map(([k, vv]) => `${k}:${vv}`).join("|") || "var"}_${idx}`;

        return {
          id,
          sku: v.sku,
          status: v.status || (inStock ? "IN_STOCK" : "OUT_OF_STOCK"),
          inStock,
          inventoryQty: Number(v?.inventory?.totalStock ?? 0),
          price,
          mrp,
          discountPct,
          options,
          images: Array.isArray(v.images) && v.images.length ? v.images : [],
        };
      });

      if (!normalized.length) {
        normalized.push({
          id: "default",
          sku: undefined,
          status: "IN_STOCK",
          inStock: true,
          inventoryQty: 9999,
          price: Number(raw.price ?? 0),
          mrp: Number(raw.price ?? 0),
          discountPct: 0,
          options: {},
          images: raw.images || [],
        });
      }

      const allOptionKeys = uniq(normalized.flatMap(nv => Object.keys(nv.options || {})));
      return { ...raw, variants: normalized, allOptionKeys };
    };

    const fetchProduct = async () => {
      try {
        // read query selections (color, storage, ram...)
        const q: Record<string, string> = {};
        searchParams.forEach((val, key) => {
          const ck = canonicalKey(key);
          q[ck] = clean(val);
        });

        const qs = new URLSearchParams({
          referenceWebsite, // API ke liye
          ...(Object.keys(q).length
            ? Object.fromEntries(Object.entries(q).map(([ck, val]) => [queryKeyFor(ck), val]))
            : {}),
        });

        const res = await fetch(`${baseUrl}/product/getproduct/${id}?${qs.toString()}`);
        const data = await res.json();
        const raw: RawProduct | undefined = data?.product;
        if (!raw) {
          setProduct(null);
          setMainImage("/placeholder.svg?height=600&width=600");
          return;
        }

        const np = normalize(raw);
        setProduct(np);

        // pick default
        let base: Variant | null = null;
        if (raw.selectedVariant) {
          base =
            np.variants.find(v => v.sku && v.sku === raw.selectedVariant?.sku) ||
            np.variants.find(v => {
              const rv = raw.selectedVariant!;
              return Object.entries(rv.options || {}).every(([k, val]) => {
                const ck = canonicalKey(k);
                return v.options?.[ck] === clean(String(val));
              });
            }) || null;
        }
        if (!base && raw.variants?.length) {
          const defIdx = raw.variants.findIndex(rv => rv?.isDefault);
          base = defIdx >= 0 ? np.variants[defIdx] : null;
        }
        if (!base) base = np.variants[0] || null;

        // try URL
        const urlSel: Record<string, string> = {};
        searchParams.forEach((val, key) => {
          const ck = canonicalKey(key);
          urlSel[ck] = clean(val);
        });
        const byUrl =
          np.variants.find(v =>
            np.allOptionKeys.every(k => !urlSel[k] || v.options?.[k] === urlSel[k])
          ) || null;

        const finalVariant = byUrl || base;

        if (finalVariant) {
          setSelectedOptions({ ...finalVariant.options });
          setSelectedVariant(finalVariant);
          const firstImage = finalVariant.images?.[0] || raw.images?.[0];
          setMainImage(imgSrc(firstImage));
        } else {
          setSelectedOptions({});
          setSelectedVariant(null);
          setMainImage(imgSrc(raw.images?.[0]));
        }

        // URL sanitize if invalid combo
        if (Object.keys(urlSel).length && !byUrl && finalVariant) {
          const next = new URLSearchParams();
          Object.entries(finalVariant.options).forEach(([ck, val]) => {
            next.set(queryKeyFor(ck), val);
          });
          setSearchParams(next, { replace: true });
        }
      } catch (err) {
        console.error("Error loading product:", err);
        setProduct(null);
        setMainImage("/placeholder.svg?height=600&width=600");
      }
    };

    if (id) fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, baseUrl, referenceWebsite, searchParams]);

  /* ---------- Option logic ---------- */
  const getAllowedValues = (key: string): string[] => {
    if (!product) return [];
    const otherKeys = product.allOptionKeys.filter(k => k !== key);
    const allowed = new Set<string>();
    product.variants.forEach(v => {
      const ok = otherKeys.every(k => {
        const sel = selectedOptions[k];
        return !sel || v.options?.[k] === sel;
      });
      if (ok && v.options?.[key]) allowed.add(v.options[key]);
    });
    return Array.from(allowed);
  };

  const findMatchingVariant = (sel: Record<string, string>): Variant | null => {
    if (!product) return null;
    const exact = product.variants.find(v =>
      product.allOptionKeys.every(k => !sel[k] || v.options?.[k] === sel[k])
    );
    if (exact) return exact;

    let best: { v: Variant; score: number } | null = null;
    for (const v of product.variants) {
      const score = product.allOptionKeys.reduce(
        (acc, k) => acc + (sel[k] && v.options?.[k] === sel[k] ? 1 : 0),
        0
      );
      if (!best || score > best.score) best = { v, score };
    }
    return best?.v || null;
  };

  // ---- yeh function HI sab karega: state update + URL params sync ----
  const syncUrlFromSelection = (sel: Record<string, string>, replace = false) => {
    const nextParams = new URLSearchParams();
    Object.entries(sel).forEach(([ck, val]) => {
      if (val) nextParams.set(queryKeyFor(ck), val);
    });
    setSearchParams(nextParams, { replace });
  };

  const selectAndSync = (partial: Record<string, string>) => {
    const nextSel = { ...selectedOptions, ...partial };
    setSelectedOptions(nextSel);

    const match = findMatchingVariant(nextSel);
    setSelectedVariant(match || null);

    const img = (match?.images?.[0] || product?.images?.[0]);
    if (img) setMainImage(imgSrc(img));

    // URL me saare selected options bhejo
    syncUrlFromSelection(nextSel, false);
  };

  // Individual option click (e.g., Color=red)
  const onSelectOption = (key: string, value: string) => {
    selectAndSync({ [key]: value });
  };

  // Other variants card click -> saare options ek saath
  const handleChooseVariant = (v: Variant) => {
    selectAndSync(v.options);
  };

  /* ---------- Quantity ---------- */
  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => quantity > 1 && setQuantity(prev => prev - 1);

  /* ---------- Cart ---------- */
  const handleAddToCart = (p: Product | RawProduct) => {
    const token = localStorage.getItem("token");
    const price =
      selectedVariant?.price ?? (product?.variants?.[0]?.price || Number(p?.price ?? 0));
    const image =
      selectedVariant?.images?.[0] ||
      product?.images?.[0] ||
      "/placeholder.svg?height=600&width=600";

    const cartItem = {
      id: (p as any)._id,
      name: (p as any).productName,
      image: imgSrc(image),
      category: (p as any).category?.name || "Uncategorized",
      price,
      quantity,
      sku: selectedVariant?.sku,
      options: selectedOptions,
    };

    if (!token) {
      const existingCart = JSON.parse(localStorage.getItem("addtocart") || "[]");
      const idx = existingCart.findIndex(
        (it: any) =>
          it.id === (p as any)._id &&
          JSON.stringify(it.options || {}) === JSON.stringify(selectedOptions)
      );
      if (idx !== -1) existingCart[idx].quantity += quantity;
      else existingCart.push(cartItem);
      localStorage.setItem("addtocart", JSON.stringify(existingCart));
      window.dispatchEvent(new Event("guestCartUpdated"));
    } else {
      dispatch(addItemToCart(cartItem));
    }

    setAddedProduct(p);
    setIsPopupVisible(true);
    setTimeout(() => setIsPopupVisible(false), 3000);
  };

  const handleBuyNow = () => {
    const isUserLoggedIn = !!localStorage.getItem("token");
    if (!isUserLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (product) {
      handleAddToCart(product);
    }
  };

  /* ---------- Zoom handlers ---------- */
  const handleMouseMove = (e: any) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = 50;
    setZoomPosition({ x, y });
  };
  const handleMouseEnter = () => {
    if (zoomTimeoutRef.current) clearTimeout(zoomTimeoutRef.current);
    setIsZooming(true);
  };
  const handleMouseLeave = () => {
    zoomTimeoutRef.current = setTimeout(() => setIsZooming(false), 80);
  };

  /* ---------- Derived ---------- */
  const displayPrice = selectedVariant?.price ?? (product?.variants?.[0]?.price ?? 0);
  const displayMrp =
    selectedVariant?.mrp ?? (product?.variants?.[0]?.mrp ?? product?.price ?? displayPrice);
  const displayDiscountPct =
    displayMrp > 0 ? Math.max(0, Math.round(((displayMrp - displayPrice) / displayMrp) * 100)) : 0;

  const maxStock = selectedVariant?.inventoryQty ?? product?.maxOrderQty ?? 99;

  /* ---------- Other variants list ---------- */
  const otherVariants = (product?.variants || []).filter(v => v.id !== selectedVariant?.id);

  /* ---------- Related (kept) ---------- */
  let relatedProductsFiltered = allProducts.filter(
    (p) => p._id !== id && p.category?._id === product?.category?._id
  );
  if (relatedProductsFiltered.length < 4) {
    const otherProducts = allProducts.filter(
      (p) => p._id !== id && !relatedProductsFiltered.some((rp) => rp._id === p._id)
    );
    relatedProductsFiltered = [...relatedProductsFiltered, ...otherProducts].slice(0, 4);
  }

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-2xl font-semibold text-gray-700">
        Loading product details...
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-8 lg:gap-12 items-start">
        {/* Left: Images */}
        <div className="md:sticky top-4 flex flex-col items-center p-4">
          <div className="flex gap-6 w-full max-w-6xl">
            <div
              className="relative w-full max-w-xl rounded-2xl overflow-hidden border-2 border-[#2A4172]/20 bg-white shadow-sm group"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative flex gap-6 w-full max-w-6xl">
                <img
                  src={mainImage || "/placeholder.svg?height=600&width=600"}
                  alt={product?.productName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 p-4"
                />
                {displayDiscountPct > 0 && (
                  <div className="absolute top-4 right-4 bg-[#A13C78] text-white px-3 py-1 rounded-full text-sm font-bold shadow-md animate-pulse">
                    {displayDiscountPct}% OFF
                  </div>
                )}
              </div>
            </div>

            {isZooming && (
              <div className="hidden lg:block absolute top-5 right-[-320px] w-[300px] h-[300px] border-2 border-[#83225c]/30 rounded-xl overflow-hidden bg-white shadow-inner z-10">
                <div
                  className="absolute w-full h-full bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: `url(${mainImage || "/placeholder.svg?height=600&width=600"})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundSize: "200%",
                  }}
                />
              </div>
            )}
          </div>

          {/* Thumbs */}
          <div className="mt-6 w-full">
            <div className="flex space-x-3 pb-2 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#A13C78]/30 scrollbar-track-gray-100/50 ">
              {(product?.images?.length ? product.images : [mainImage]).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(imgSrc(img))}
                  className={`flex-shrink-0 w-20 h-20 m-2 rounded-lg overflow-hidden border-3 transition-all duration-300 snap-center ${
                    mainImage === imgSrc(img)
                      ? "border-[#380d27] ring-2 ring-[#83225c]"
                      : "border-gray-200 hover:border-[#C1467F]"
                  }`}
                >
                  <img
                    src={imgSrc(img)}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover hover:opacity-90"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="space-y-6">
          {/* Header */}
          <div className="mb-6 flex items-center">
            <ul className="space-y-2">
              <li className="flex items-center ">
                <span className="text-gray-800 font-medium text-[15px]">Category </span>
                <FaChevronRight className="w-3 h-3 text-[#616664] mt-1 mx-2 flex-shrink-0" />
                <span className="text-[#2A4172] text-[13px]">{product.category?.name}</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-[#1B2E4F] mb-2">{product.productName}</h1>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex mr-2">{renderStars(product?.rating?.avg || 4)}</div>
              <span className="text-sm text-[#2A4172] ml-1">({review?.length} Reviews)</span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm font-medium text-[#3ae698] flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />{" "}
                {selectedVariant?.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-[#F5F7FA] rounded-xl p-5 mb-4">
            <div className="flex flex-wrap items-baseline gap-1">
              <span className="text-3xl font-bold text-[#A13C78]">
                <span className="rupee mb-1">₹</span> {product?.actualPrice?.toFixed()}
              </span>
              {displayMrp > displayPrice && (
                <span className="text-xl text-[#2A4172] line-through">
                  <span className="rupee">₹</span>
                  {Number(displayMrp).toFixed()}
                </span>
              )}
              {displayDiscountPct > 0 && (
                <span className="ml-2 px-3 py-1 bg-[#A13C78]/10 text-[#A13C78] rounded-full text-sm font-bold">
                  Save {displayDiscountPct}%
                </span>
              )}
            </div>
            {displayMrp > displayPrice && (
              <div className="mt-2 text-sm text-[#2A4172]">
                You save: <span className="rupee">₹</span>{(product?.price - product?.actualPrice)?.toFixed(2)}
              </div>
            )}
          </div>

          {/* Options (click => URL sync) */}
          {product.allOptionKeys.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#1B2E4F] mb-3">Available Options</h3>

              {product.allOptionKeys.map((optKey) => {
                const values = uniq(
                  product.variants.map(v => v.options?.[optKey]).filter(Boolean) as string[]
                );
                const allowed = getAllowedValues(optKey);
                return (
                  <div key={optKey} className="mb-3">
                    <div className="text-[13px] text-[#2A4172] mb-1 font-medium">{optKey}</div>
                    <div className="flex flex-wrap gap-2">
                      {values.map((val) => {
                        const isSelected = selectedOptions[optKey] === val;
                        const isDisabled = !allowed.includes(val);
                        return (
                          <button
                            key={val}
                            onClick={() => onSelectOption(optKey, val)}
                            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all
                              ${isSelected
                                ? "bg-[#1B2E4F] text-white border-[#1B2E4F]"
                                : "bg-white text-[#2A4172] border-gray-300 hover:border-[#1B2E4F]"}
                              ${isDisabled ? "opacity-50" : "cursor-pointer"}`}
                            title={isDisabled ? "Not available with current selection" : val}
                          >
                            {val}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Other Variants (click => send ALL params like color+storage) */}
          {otherVariants.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#1B2E4F] mb-3">Other Variants</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[selectedVariant, ...otherVariants].filter(Boolean).map((v, idx) => {
                  const active = v?.id === selectedVariant?.id;
                  const label = product.allOptionKeys
                    .map(k => v?.options?.[k])
                    .filter(Boolean)
                    .join(" • ");
                  return (
                    <button
                      key={`${v?.id}-${idx}`}
                      onClick={() => v && handleChooseVariant(v)}
                      className={`flex items-center gap-4 w-full text-left rounded-2xl border p-3
                        ${active ? "border-[#1B2E4F] bg-[#F5F7FA]" : "border-gray-200 hover:border-[#1B2E4F]"}`}
                    >
                      <img
                        src={imgSrc(v?.images?.[0] || product.images?.[0])}
                        alt="variant"
                        className="w-14 h-14 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-[#1B2E4F]">{label || v?.sku}</div>
                        <div className="text-xs text-[#2A4172]">
                          ₹{Number(v?.price || 0).toFixed()}{" "}
                          {v && v.mrp > (v.price || 0) ? (
                            <span className="line-through ml-1">₹{Number(v.mrp).toFixed()}</span>
                          ) : null}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#1B2E4F] font-medium">Quantity:</span>
            </div>
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-fit shadow-sm">
              <button
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-[#2A4172] text-lg font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Decrease quantity"
              >
                <Minus size={18} />
              </button>
              <span className="px-5 py-2 text-lg font-medium text-[#1B2E4F]">{quantity}</span>
              <button
                onClick={handleIncrease}
                disabled={quantity >= maxStock}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-[#2A4172] text-lg font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Increase quantity"
              >
                <Plus size={18} />
              </button>
            </div>
            {selectedVariant && (selectedVariant.inventoryQty ?? 0) < 10 && (
              <div className="text-xs text-[#A13C78] mt-2">
                Hurry! Only {selectedVariant.inventoryQty} left in stock.
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={() => handleAddToCart(product)}
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[#2A4172] hover:bg-[#1B2E4F] text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[#A13C78] hover:bg-[#872D67] text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95"
            >
              <Zap size={20} className="mr-1" />
              Buy Now
            </button>
          </div>

          {/* Delivery Info */}
          <div className="bg-[#F0F4F9] border border-[#2A4172]/20 rounded-xl p-4 mb-6">
            <div className="flex items-start">
              <Truck className="w-5 h-5 text-[#A13C78] mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-[#1B2E4F] mb-1">Free Delivery</h4>
                <p className="text-sm text-[#2A4172]">
                  Get free delivery on this item. Expected delivery in 2-4 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-20 p-6 rounded-xl border-2 border-[#2A4172]/20 shadow-inner bg-white">
        <div className="flex flex-wrap border-b-2 border-[#2A4172]/20 ">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-8 py-2 text-xl font-bold transition-all duration-300 w-full sm:w-auto ${
              activeTab === "description"
                ? "border-b-4 border-[#A13C78] text-[#1B2E4F]"
                : "text-[#2A4172] hover:text-[#A13C78]"
            }`}
          >
            Description
          </button>
          <div className="flex justify-between gap-6 w-full sm:w-auto sm:flex-grow">
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-8 py-2 text-xl font-bold transition-all duration-300 w-full sm:w-auto ${
                activeTab === "reviews"
                  ? "border-b-4 border-[#A13C78] text-[#1B2E4F]"
                  : "text-[#2A4172] hover:text-[#A13C78]"
              }`}
            >
              Reviews
            </button>
            {activeTab === "reviews" && gettoken && (
              <button
                onClick={() => setRatingModalOpen(true)}
                className="ml-auto py-2 px-3 text-sm font-semibold transition-all duration-300
              text-gray-700 hover:text-white hover:bg-[#2A4172] bg-[#b3cafc]
              focus:outline-none focus:ring-2 focus:ring-[#A13C78] focus:ring-opacity-50
              rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mb-2
              "
              >
                <div className="flex items-center justify-center gap-2">
                  <Star className="w-3 h-3" />
                  Rate Product
                </div>
              </button>
            )}
          </div>
        </div>

        <div className="py-8 text-[#2A4172] text-lg leading-relaxed">
          {activeTab === "description" ? (
            <div>
              <h3 className="text-xl font-bold mb-5 text-[#1B2E4F]">Product Overview</h3>
              {product?.description ? (
                <div
                  className="prose prose-sm max-w-none mb-5 text-sm text-[#2A4172]"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              ) : null}
              {Array.isArray(product?.keyFeatures) && product.keyFeatures.length > 0 ? (
                <ul className="list-disc list-inside space-y-3 text-sm text-[#2A4172]">
                  {product.keyFeatures.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              ) : (
                <ul className="list-disc list-inside space-y-3 text-sm text-[#2A4172]">
                  <li>High-performance processor for demanding tasks</li>
                  <li>Durable and sleek design with premium finishes</li>
                  <li>Intuitive UI for effortless navigation</li>
                  <li>Long-lasting battery life</li>
                  <li>Wi-Fi 6, Bluetooth 5.2</li>
                </ul>
              )}
            </div>
          ) : (
            <div>
              <h3 className=" font-bold mb-5 text-xl text-[#1B2E4F]">Customer Reviews</h3>
              {review?.length > 0 ? (
                <div className="space-y-8 text-sm">
                  {review?.map((reviewItem: any) => (
                    <div key={reviewItem?.id} className="border-b border-[#2A4172]/20 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-2 gap-3">
                        <span className="flex justify-center items-center gap-2 font-semibold text-[#1B2E4F] mr-3">
                          <Star size={16} className="text-[#A13C78]" />
                          {reviewItem?.user?.firstName} {reviewItem?.user?.lastName}
                        </span>
                        <div className="flex">{renderStars(reviewItem?.rating)}</div>
                      </div>
                      <p className="text-sm text-[#2A4172]/80 mb-3">{reviewItem?.date}</p>
                      <p className="text-[#2A4172] leading-relaxed">{reviewItem?.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#2A4172] text-sm">No reviews yet. Be the first to share your experience!</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals + Toast */}
      {showLoginModal && (
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
          <Login1 />
        </LoginModal>
      )}
      {isPopupVisible && addedProduct && (
        <div
          className="fixed top-4 right-4 bg-green-100 text-green-700 p-4 rounded-lg shadow-lg z-50 transition-transform transform translate-x-0 opacity-100 flex items-center gap-3"
          style={{ transition: "transform 0.5s ease, opacity 0.5s ease" }}
        >
          <ShoppingCart size={20} className="text-green-600" />
          <div className="flex-grow">
            <span className="text-sm font-semibold">Product Added to Cart</span>
            <p className="mt-1 text-xs text-gray-600">{addedProduct?.productName}</p>
          </div>
          <button onClick={() => setIsPopupVisible(false)} className="text-gray-500 hover:text-gray-700">
            <X size={18} />
          </button>
        </div>
      )}

      <Arrivals addToCart={handleAddToCart} />
      {isRatingModalOpen && (
        <RatingModal isOpen={isRatingModalOpen} onClose={() => setRatingModalOpen(false)} />
      )}
    </div>
  );
};

export default ProductDetails;
