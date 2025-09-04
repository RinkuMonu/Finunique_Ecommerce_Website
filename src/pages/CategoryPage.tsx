"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Sliders, X, ChevronDown, ChevronUp } from "lucide-react";
import ProductCard from "../components/products/ProductCard";

/** ---------- helpers ---------- */
const clean = (v?: any) =>
  (v ?? "")
    .toString()
    .trim()
    .replace(/\s+/g, " ");

const titleCase = (s: string) =>
  s
    .toLowerCase()
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");

const splitValues = (val: string) =>
  val
    .split(/[,/|]/)
    .map((v) => clean(v))
    .filter(Boolean);

type RawVariant = {
  isDefault?: boolean;
  pricing?: { mrp?: number; price?: number; currency?: string };
  status?: string;
  inventory?: { totalStock?: number };
  options?: Record<string, string>;
};

type RawProduct = {
  _id: string;
  productName: string;
  slug: string;
  images?: string[];
  brand?: any;
  category?: any;
  rating?: { avg?: number; count?: number };
  createdAt?: string;
  attributesFlat?: Record<string, string>;
  specs?: Array<{ group?: string; key?: string; value?: string }>;
  variants?: RawVariant[];
  status?: string;
  [key: string]: any;
};

type Normalized = RawProduct & {
  actualPrice: number;
  mrp: number;
  discountPct: number;
  inStock: boolean;
  brandName: string | null;
  categoryName: string | null;
  featuresMap: Record<string, string[]>;
};

export default function CategoryPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // ------- route params -------
  const { category } = useParams();
  const catagory1 = category?.replace(/-/g, " ").replace(/\band\b/g, "&");

  // ------- env -------
  const referenceWebsite = import.meta.env.VITE_REFERENCE_WEBSITE as string;
  const baseUrl = import.meta.env.VITE_API_BASE_URL as string;

  // ------- ui states -------
  const [openSections, setOpenSections] = useState<any>({
    price: true,
    brand: true,
    rating: true,
    discount: true,
    availability: true,
    color: true,
    storage: true,
  });

  // ------- brand list (separate API) -------
  const [brandList, setBrandList] = useState<
    Array<{ _id: string; name: string; slug: string; logo?: string; status?: string }>
  >([]);
  const [brandsLoading, setBrandsLoading] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      setBrandsLoading(true);
      try {
        // adjust if your brand API uses a different base
        const res = await fetch(`${baseUrl}/brand/getbrand?referenceWebsite=${referenceWebsite}`);
        const data = await res.json();
        const list = Array.isArray(data?.data) ? data.data : [];
        const active = list.filter((b: any) => (b?.status || "").toUpperCase() === "ACTIVE");
        active.sort((a: any, b: any) => (a.name || "").localeCompare(b.name || ""));
        setBrandList(active);
      } catch (e) {
        console.error("Brand fetch error:", e);
        setBrandList([]);
      } finally {
        setBrandsLoading(false);
      }
    };
    fetchBrands();
  }, [baseUrl, referenceWebsite]);

  // ------- data states -------
  const [items, setItems] = useState<Normalized[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageMeta, setPageMeta] = useState({
    total: 0,
    currentPage: 1,
    pageSize: 24,
    totalPages: 1,
  });

  // ------- filter states (mirrors URL) -------
  const initialMinPrice = Number(searchParams.get("minPrice") || 0);
  const initialMaxPrice = Number(searchParams.get("maxPrice") || 5_000_000);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialMinPrice,
    initialMaxPrice,
  ]);

  const [sortBy, setSortBy] = useState<string>(searchParams.get("sortBy") || "newest");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    (searchParams.get("brand") || "").split(",").filter(Boolean)
  );
  const [minRating, setMinRating] = useState<number | null>(
    searchParams.get("ratingGte") ? Number(searchParams.get("ratingGte")) : null
  );
  const [minDiscount, setMinDiscount] = useState<number | null>(
    searchParams.get("discountGte") ? Number(searchParams.get("discountGte")) : null
  );
  const [inStockOnly, setInStockOnly] = useState<boolean>(
    (searchParams.get("inStock") || "") === "true"
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    (searchParams.get("color") || "").split(",").filter(Boolean)
  );
  const [selectedStorages, setSelectedStorages] = useState<string[]>(
    (searchParams.get("storage") || "").split(",").filter(Boolean)
  );

  // Dynamic facets selected: read keys like features[RAM], features[Display]
  const initialSelectedDynamic = useMemo(() => {
    const sel: Record<string, string[]> = {};
    searchParams.forEach((val, key) => {
      const m = key.match(/^features\[(.+)\]$/);
      if (m) sel[m[1]] = val.split(",").filter(Boolean);
    });
    return sel;
  }, []); // only on first render

  const [selectedDynamic, setSelectedDynamic] =
    useState<Record<string, string[]>>(initialSelectedDynamic);

  // ------- URL sync helpers -------
  const updateURLParams = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(patch).forEach(([k, v]) => {
      if (v === null || v === "" || v === "NaN") next.delete(k);
      else next.set(k, v);
    });
    navigate({ pathname: `/category/${category}`, search: `?${next.toString()}` }, { replace: true });
    setSearchParams(next, { replace: true });
  };

  const csvOrNull = (arr: string[]) => (arr.length ? arr.join(",") : null);

  // ------- build server query from URL -------
  const buildQueryParams = () => {
    const qp = new URLSearchParams();
    qp.set("referenceWebsite", referenceWebsite);
    if (catagory1) qp.set("subcategory", catagory1);

    const page = Number(searchParams.get("page") || pageMeta.currentPage || 1);
    const limit = Number(searchParams.get("limit") || pageMeta.pageSize || 24);
    qp.set("page", String(page));
    qp.set("limit", String(limit));

    const sortVal = searchParams.get("sortBy") || "newest";
    const sortMap: Record<string, { sortBy: string; sortOrder: "asc" | "desc" }> = {
      "price-low": { sortBy: "price", sortOrder: "asc" },
      "price-high": { sortBy: "price", sortOrder: "desc" },
      newest: { sortBy: "createdAt", sortOrder: "desc" },
      oldest: { sortBy: "createdAt", sortOrder: "asc" },
    };
    const s = sortMap[sortVal] || sortMap["newest"];
    qp.set("sortBy", s.sortBy);
    qp.set("sortOrder", s.sortOrder);

    const minPrice = Number(searchParams.get("minPrice") || priceRange[0]);
    const maxPrice = Number(searchParams.get("maxPrice") || priceRange[1]);
    qp.set("minPrice", String(minPrice));
    qp.set("maxPrice", String(maxPrice));

    const brand = searchParams.get("brand") || csvOrNull(selectedBrands);
    if (brand) qp.set("brand", brand);

    const ratingGte = searchParams.get("ratingGte") || (minRating != null ? String(minRating) : "");
    if (ratingGte) qp.set("ratingGte", ratingGte);

    const discountGte =
      searchParams.get("discountGte") || (minDiscount != null ? String(minDiscount) : "");
    if (discountGte) qp.set("discountGte", discountGte);

    const inStock = searchParams.get("inStock") || (inStockOnly ? "true" : "");
    if (inStock) qp.set("inStock", inStock);

    const color = searchParams.get("color") || csvOrNull(selectedColors);
    if (color) qp.set("color", color);

    const storage = searchParams.get("storage") || csvOrNull(selectedStorages);
    if (storage) qp.set("storage", storage);

    Object.entries(selectedDynamic).forEach(([facet, values]) => {
      if (!values || !values.length) return;
      qp.set(`[${facet}]`, values.join(","));
    });

    return qp;
  };

  // ------- fetch products whenever URL changes -------
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const qp = buildQueryParams();
        const url = `${baseUrl}/product/getproducts?${qp.toString()}`;
        const res = await fetch(url);
        const data = await res.json();

        const rawList: RawProduct[] =
          (data?.products?.products as RawProduct[]) ??
          (data?.products as RawProduct[]) ??
          [];

        const normalized: Normalized[] = rawList.map((p) => {
          const variants = Array.isArray(p.variants) ? p.variants : [];
          const def = variants.find((v) => v?.isDefault) || variants[0] || ({} as RawVariant);

          const price = Number(def?.pricing?.price ?? 0);
          const mrp = Number(def?.pricing?.mrp ?? price);
          const discountPct = mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;

          const inStock =
            def?.status === "IN_STOCK" ||
            (def?.inventory?.totalStock ?? 0) > 0 ||
            p?.status === "ACTIVE";

          const brandName = (typeof p.brand === "object" ? p.brand?.name : p.brand) ?? null;
          const categoryName =
            (typeof p.category === "object" ? p.category?.name : p.category) ?? null;

          // features map for facets
          const featuresMap: Record<string, string[]> = {};
          if (Array.isArray(p.specs)) {
            p.specs.forEach((s: any) => {
              const k = titleCase(clean(s?.key || ""));
              const v = clean(s?.value || "");
              if (!k || !v) return;
              const values = splitValues(v);
              if (!featuresMap[k]) featuresMap[k] = [];
              featuresMap[k].push(...values);
            });
          }
          if (p.attributesFlat) {
            Object.entries(p.attributesFlat).forEach(([k, v]) => {
              const key = titleCase(clean(k));
              const values = splitValues(clean(v as string));
              if (!key || !values.length) return;
              if (!featuresMap[key]) featuresMap[key] = [];
              featuresMap[key].push(...values);
            });
          }
          if (def?.options) {
            Object.entries(def.options).forEach(([k, v]) => {
              const key = titleCase(clean(k));
              const values = splitValues(clean(v as string));
              if (!key || !values.length) return;
              if (!featuresMap[key]) featuresMap[key] = [];
              featuresMap[key].push(...values);
            });
          }
          Object.keys(featuresMap).forEach((k) => {
            featuresMap[k] = Array.from(new Set(featuresMap[k]));
          });

          return {
            ...p,
            actualPrice: price,
            mrp,
            discountPct,
            inStock,
            brandName,
            categoryName,
            featuresMap,
          };
        });

        setItems(normalized);

        const pgn = data?.pagination || {};
        setPageMeta({
          total: Number(pgn.totalDocuments || normalized.length || 0),
          currentPage: Number(pgn.currentPage || Number(searchParams.get("page") || 1)),
          pageSize: Number(pgn.pageSize || Number(searchParams.get("limit") || 24)),
          totalPages: Number(pgn.totalPages || 1),
        });
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, baseUrl, referenceWebsite, category]);

  // ------- facets (from current items + brandList) -------
  const facets = useMemo(() => {
    const uniq = (arr: (string | null | undefined)[]) =>
      Array.from(new Set(arr.filter(Boolean) as string[]));

    // Brands from separate API
    const brands = brandList.map((b) => b.name);
    const brandCounts = brands.reduce<Record<string, number>>((acc, b) => {
      acc[b] = items.filter(
        (p) => (p.brandName || "").toLowerCase() === (b || "").toLowerCase()
      ).length;
      return acc;
    }, {});

    // Colors/Storage from features
    const colors = uniq(items.flatMap((p) => p.featuresMap?.["Color"] || []));
    const storages = uniq(items.flatMap((p) => p.featuresMap?.["Storage"] || []));

    // Dynamic facets from specs/variants
    const dynamicFacetValues: Record<string, Set<string>> = {};
    items.forEach((p) => {
      const fmap = p.featuresMap || {};
      Object.entries(fmap).forEach(([facet, values]) => {
        if (!dynamicFacetValues[facet]) dynamicFacetValues[facet] = new Set<string>();
        (values as string[]).forEach((v) => dynamicFacetValues[facet].add(v));
      });
    });

    const hideKeys = new Set(["Brand", "Color", "Size", "Storage"]);
    const dynamicFacetsOrdered = Object.keys(dynamicFacetValues)
      .filter((k) => !hideKeys.has(k))
      .sort();

    return { brands, brandCounts, colors, storages, dynamicFacetValues, dynamicFacetsOrdered };
  }, [items, brandList]);

  // ------- handlers (update URL => fetch) -------
  const toggleSection = (section: string) =>
    setOpenSections((prev: any) => ({ ...prev, [section]: !prev[section] }));

  const applyPrice = (min: number, max: number) => {
    setPriceRange([min, max]);
    updateURLParams({ minPrice: String(min), maxPrice: String(max), page: "1" });
  };

  const toggleCSVParam = (
    key: string,
    value: string,
    current: string[],
    setter: (v: string[]) => void
  ) => {
    const exists = current.includes(value);
    const next = exists ? current.filter((x) => x !== value) : [...current, value];
    setter(next);
    updateURLParams({ [key]: csvOrNull(next), page: "1" });
  };

  const setRadioParam = (key: string, value: number | null) => {
    if (value == null) updateURLParams({ [key]: null, page: "1" });
    else updateURLParams({ [key]: String(value), page: "1" });
  };

  const toggleInStock = () => {
    const next = !inStockOnly;
    setInStockOnly(next);
    updateURLParams({ inStock: next ? "true" : null, page: "1" });
  };

  const changeSort = (v: string) => {
    setSortBy(v);
    updateURLParams({ sortBy: v, page: "1" });
  };

  const toggleDynamicValue = (facet: string, value: string) => {
    setSelectedDynamic((prev) => {
      const cur = prev[facet] || [];
      const next = cur.includes(value) ? cur.filter((x) => x !== value) : [...cur, value];
      updateURLParams({ [`features[${facet}]`]: csvOrNull(next), page: "1" });
      return { ...prev, [facet]: next };
    });
  };

  const resetFilters = () => {
    setPriceRange([0, 5_000_000]);
    setSelectedBrands([]);
    setMinRating(null);
    setMinDiscount(null);
    setInStockOnly(false);
    setSelectedColors([]);
    setSelectedStorages([]);
    setSelectedDynamic({});
    setSortBy("newest");

    const next = new URLSearchParams();
    next.set("page", "1");
    next.set("limit", "24");
    navigate({ pathname: `/category/${category}`, search: `?${next.toString()}` }, { replace: true });
    setSearchParams(next, { replace: true });
  };

  const goToPage = (p: number) => updateURLParams({ page: String(p) });

  /** ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-80">
            <div className="sticky top-24 space-y-6 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#1B2E4F]">Filters</h2>
                <X className="w-4 h-4 text-gray-400 cursor-pointer lg:hidden" />
              </div>

              {/* Price */}
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
                      <span>
                        <span className="rupee">₹</span>
                        {priceRange[0].toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-400">to</span>
                      <span>
                        <span className="rupee">₹</span>
                        {priceRange[1].toLocaleString()}
                      </span>
                    </div>

                    <div className="relative pt-2">
                      <div className="relative h-1 bg-gray-200 rounded-full">
                        <div
                          className="absolute h-1 rounded-full"
                          style={{
                            background: "rgb(157 48 137)",
                            left: `${(priceRange[0] / 5_000_000) * 100}%`,
                            width: `${((priceRange[1] - priceRange[0]) / 5_000_000) * 100}%`,
                          }}
                        />
                      </div>

                      <input
                        type="range"
                        min={0}
                        max={5_000_000}
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            Math.min(Number(e.target.value), priceRange[1] - 1),
                            priceRange[1],
                          ])
                        }
                        onMouseUp={() => applyPrice(priceRange[0], priceRange[1])}
                        onTouchEnd={() => applyPrice(priceRange[0], priceRange[1])}
                        className="absolute top-2 w-full h-1 bg-transparent appearance-none cursor-pointer range-slider z-10"
                      />
                      <input
                        type="range"
                        min={0}
                        max={5_000_000}
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            Math.max(Number(e.target.value), priceRange[0] + 1),
                          ])
                        }
                        onMouseUp={() => applyPrice(priceRange[0], priceRange[1])}
                        onTouchEnd={() => applyPrice(priceRange[0], priceRange[1])}
                        className="absolute top-2 w-full h-1 bg-transparent appearance-none cursor-pointer range-slider z-10"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Brand (separate API) */}
              <div>
                <div
                  onClick={() => toggleSection("brand")}
                  className="flex justify-between items-center cursor-pointer mb-3"
                >
                  <h3 className="text-sm font-medium text-gray-800">Brand</h3>
                  {openSections.brand ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                {openSections.brand && (
                  <div className="max-h-56 overflow-auto pr-1 space-y-2">
                    {brandsLoading ? (
                      <div className="text-xs text-gray-500">Loading brands…</div>
                    ) : brandList.length === 0 ? (
                      <div className="text-xs text-gray-400">No brands found</div>
                    ) : (
                      brandList.map((b) => {
                        const name = b.name;
                        const checked = selectedBrands.includes(name);
                        const count =
                          items.filter(
                            (p) => (p.brandName || "").toLowerCase() === (name || "").toLowerCase()
                          ).length || 0;
                        return (
                          <label key={b._id} className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                toggleCSVParam("brand", name, selectedBrands, setSelectedBrands)
                              }
                              className="accent-[#9D3089]"
                            />
                            {b.logo ? (
                              <img
                                src={b.logo}
                                alt={name}
                                className="h-4 w-4 rounded object-contain border border-gray-200"
                              />
                            ) : null}
                            <span className="flex-1 capitalize">{name}</span>
                            <span className="text-xs text-gray-400">{count}</span>
                          </label>
                        );
                      })
                    )}
                    {/* Optional: clear only brands */}
                    {selectedBrands.length > 0 && (
                      <button
                        onClick={() => {
                          setSelectedBrands([]);
                          updateURLParams({ brand: null, page: "1" });
                        }}
                        className="text-xs text-gray-500 underline mt-1"
                      >
                        Clear brands
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Rating */}
              <div>
                <div
                  onClick={() => toggleSection("rating")}
                  className="flex justify-between items-center cursor-pointer mb-3"
                >
                  <h3 className="text-sm font-medium text-gray-800">Customer Ratings</h3>
                  {openSections.rating ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {openSections.rating && (
                  <div className="space-y-2 text-sm">
                    {[4, 3, 2, 1].map((r) => (
                      <label key={r} className="flex items-center gap-2 text-gray-700">
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === r}
                          onChange={() => {
                            setMinRating(r);
                            setRadioParam("ratingGte", r);
                          }}
                          className="accent-[#9D3089]"
                        />
                        {r}★ & above
                      </label>
                    ))}
                    <button
                      onClick={() => {
                        setMinRating(null);
                        setRadioParam("ratingGte", null);
                      }}
                      className="text-xs text-gray-500 underline mt-1"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              {/* Discount */}
              <div>
                <div
                  onClick={() => toggleSection("discount")}
                  className="flex justify-between items-center cursor-pointer mb-3"
                >
                  <h3 className="text-sm font-medium text-gray-800">Discount</h3>
                  {openSections.discount ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {openSections.discount && (
                  <div className="space-y-2 text-sm">
                    {[50, 40, 30, 20, 10].map((d) => (
                      <label key={d} className="flex items-center gap-2 text-gray-700">
                        <input
                          type="radio"
                          name="discount"
                          checked={minDiscount === d}
                          onChange={() => {
                            setMinDiscount(d);
                            setRadioParam("discountGte", d);
                          }}
                          className="accent-[#9D3089]"
                        />
                        {d}% or more
                      </label>
                    ))}
                    <button
                      onClick={() => {
                        setMinDiscount(null);
                        setRadioParam("discountGte", null);
                      }}
                      className="text-xs text-gray-500 underline mt-1"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              {/* Availability */}
              <div>
                <div
                  onClick={() => toggleSection("availability")}
                  className="flex justify-between items-center cursor-pointer mb-3"
                >
                  <h3 className="text-sm font-medium text-gray-800">Availability</h3>
                  {openSections.availability ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {openSections.availability && (
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={toggleInStock}
                      className="accent-[#9D3089]"
                    />
                    In Stock Only
                  </label>
                )}
              </div>

              {/* Color */}
              {facets.colors.length > 0 && (
                <div>
                  <div
                    onClick={() => toggleSection("color")}
                    className="flex justify-between items-center cursor-pointer mb-3"
                  >
                    <h3 className="text-sm font-medium text-gray-800">Color</h3>
                    {openSections.color ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  {openSections.color && (
                    <div className="max-h-36 overflow-auto pr-1 space-y-2">
                      {facets.colors.map((c) => (
                        <label key={c} className="flex items-center gap-2 text-sm text-gray-700">
                          <input
                            type="checkbox"
                            checked={selectedColors.includes(c)}
                            onChange={() => toggleCSVParam("color", c, selectedColors, setSelectedColors)}
                            className="accent-[#9D3089]"
                          />
                          <span className="flex-1 capitalize">{c}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Storage */}
              {facets.storages.length > 0 && (
                <div>
                  <div
                    onClick={() => toggleSection("storage")}
                    className="flex justify-between items-center cursor-pointer mb-3"
                  >
                    <h3 className="text-sm font-medium text-gray-800">Storage</h3>
                    {openSections.storage ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  {openSections.storage && (
                    <div className="max-h-36 overflow-auto pr-1 space-y-2">
                      {facets.storages.map((s) => (
                        <label key={s} className="flex items-center gap-2 text-sm text-gray-700">
                          <input
                            type="checkbox"
                            checked={selectedStorages.includes(s)}
                            onChange={() =>
                              toggleCSVParam("storage", s, selectedStorages, setSelectedStorages)
                            }
                            className="accent-[#9D3089]"
                          />
                          <span className="flex-1">{s}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Dynamic facets from specs/variants */}
              {facets.dynamicFacetsOrdered.map((facetName) => {
                const values = Array.from(facets.dynamicFacetValues[facetName] || []);
                if (!values.length) return null;

                const isOpenKey = facetName.toLowerCase().replace(/\s+/g, "_");
                const isOpen = openSections[isOpenKey] ?? true;

                return (
                  <div key={facetName}>
                    <div
                      onClick={() =>
                        setOpenSections((prev: any) => ({ ...prev, [isOpenKey]: !isOpen }))
                      }
                      className="flex justify-between items-center cursor-pointer mb-3"
                    >
                      <h3 className="text-sm font-medium text-gray-800">{facetName}</h3>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>

                    {isOpen && (
                      <div className="max-h-48 overflow-auto pr-1 space-y-2">
                        {values.map((val) => (
                          <label key={val} className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                              type="checkbox"
                              className="accent-[#9D3089]"
                              checked={(selectedDynamic[facetName] || []).includes(val)}
                              onChange={() => toggleDynamicValue(facetName, val)}
                            />
                            <span className="flex-1">{val}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Reset */}
              <button
                onClick={resetFilters}
                className="w-full mt-2 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Main grid */}
          <section className="flex-1">
            <div className="overflow-hidden">
              <div className="flex justify-between">
                <div className="lfet">
                  <h1 className="text-md font-bold capitalize" style={{ color: "#1B2E4F" }}>
                    {catagory1 || "All Products"}
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Showing{" "}
                    <span className="text-purple-700 font-semibold">
                      {loading ? "…" : items.length}
                    </span>{" "}
                    items
                  </p>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <select
                    value={sortBy}
                    onChange={(e) => changeSort(e.target.value)}
                    className="border px-4 py-2 rounded-md text-sm focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* products */}
              {loading ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                  <div className="mb-4">
                    <Sliders className="w-10 h-10 mx-auto text-gray-400 animate-pulse" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Loading…</h3>
                  <p className="text-gray-500">Fetching products with applied filters.</p>
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                  <div className="mb-4">
                    <Sliders className="w-10 h-10 mx-auto text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No products found</h3>
                  <p className="text-gray-500">Try changing your filters to see other options.</p>
                </div>
              ) : (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}

              {/* pagination */}
              {pageMeta.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    disabled={pageMeta.currentPage <= 1}
                    onClick={() => goToPage(pageMeta.currentPage - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {pageMeta.currentPage} / {pageMeta.totalPages}
                  </span>
                  <button
                    disabled={pageMeta.currentPage >= pageMeta.totalPages}
                    onClick={() => goToPage(pageMeta.currentPage + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
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
  );
}
