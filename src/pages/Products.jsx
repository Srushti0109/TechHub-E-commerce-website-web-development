import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import Footer from "../components/Footer";
import { HiOutlineAdjustments, HiOutlineSearch, HiX } from "react-icons/hi";

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    categories: searchParams.get("category") ? [searchParams.get("category")] : [],
    brands: [],
    minPrice: "",
    maxPrice: "",
    minRating: 0,
  });
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync URL params to filters on mount and when searchParams change
  useEffect(() => {
    const cat = searchParams.get("category");
    const q = searchParams.get("search");
    if (cat) setFilters((p) => ({ ...p, categories: [cat] }));
    if (q) setSearch(q);
  }, []);

  // Update URL on filter/search change
  useEffect(() => {
    const params = {};
    if (filters.categories.length === 1) params.category = filters.categories[0];
    if (search) params.search = search;
    setSearchParams(params, { replace: true });
  }, [filters.categories, search]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (filters.categories.length) {
      list = list.filter((p) => filters.categories.includes(p.category));
    }

    if (filters.brands.length) {
      list = list.filter((p) => filters.brands.includes(p.brand));
    }

    if (filters.minPrice) list = list.filter((p) => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) list = list.filter((p) => p.price <= Number(filters.maxPrice));
    if (filters.minRating) list = list.filter((p) => p.rating >= filters.minRating);

    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "newest": list.sort((a, b) => b.id - a.id); break;
      default: list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [filters, sort, search]);

  const activeFilterCount =
    (filters.categories?.length || 0) +
    (filters.brands?.length || 0) +
    (filters.minRating || 0) +
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0);

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Header */}
      <div className="border-b border-slate-800/50 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-display font-bold text-2xl text-white">
                {filters.categories.length === 1 ? filters.categories[0] : "All Products"}
              </h1>
              <p className="text-slate-400 text-sm mt-0.5">{filtered.length} products found</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search products…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 focus:border-indigo-500 text-slate-200 placeholder-slate-500 rounded-xl text-sm outline-none transition-colors w-52 focus:ring-2 focus:ring-indigo-500/20"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                    <HiX />
                  </button>
                )}
              </div>
              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-slate-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-500 cursor-pointer"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              {/* Mobile filter toggle */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden btn-secondary flex items-center gap-2 py-2 text-sm"
              >
                <HiOutlineAdjustments />
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </aside>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-72 bg-slate-950 overflow-y-auto p-4 shadow-2xl">
                <FilterSidebar filters={filters} setFilters={setFilters} onClose={() => setSidebarOpen(false)} />
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-display font-bold text-xl text-white mb-2">No products found</h3>
                <p className="text-slate-400 mb-6">Try adjusting your search or filters.</p>
                <button
                  onClick={() => {
                    setFilters({ categories: [], brands: [], minPrice: "", maxPrice: "", minRating: 0 });
                    setSearch("");
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
