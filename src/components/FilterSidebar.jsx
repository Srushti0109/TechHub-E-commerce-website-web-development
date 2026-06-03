import { categories, brands } from "../data/products";
import { HiOutlineAdjustments, HiX } from "react-icons/hi";

const FilterSidebar = ({ filters, setFilters, onClose }) => {
  const ratings = [4, 3, 2, 1];

  const toggleArrayFilter = (key, value) => {
    setFilters((prev) => {
      const arr = prev[key] || [];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const clearAll = () => {
    setFilters({ categories: [], brands: [], minPrice: "", maxPrice: "", minRating: 0 });
  };

  const hasFilters =
    (filters.categories?.length || 0) +
    (filters.brands?.length || 0) +
    (filters.minRating || 0) +
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0) > 0;

  const Section = ({ title, children }) => (
    <div className="border-b border-slate-800/50 pb-5 mb-5">
      <h3 className="font-display font-semibold text-white text-sm mb-3 uppercase tracking-wide">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="glass rounded-2xl p-5 sticky top-24">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <HiOutlineAdjustments className="text-indigo-400 text-lg" />
          <span className="font-display font-bold text-white">Filters</span>
        </div>
        <div className="flex items-center gap-2">
          {hasFilters && (
            <button onClick={clearAll} className="text-indigo-400 hover:text-indigo-300 text-xs font-medium">
              Clear all
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="text-slate-400 hover:text-white lg:hidden">
              <HiX />
            </button>
          )}
        </div>
      </div>

      <Section title="Category">
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.categories?.includes(cat) || false}
                onChange={() => toggleArrayFilter("categories", cat)}
                className="w-4 h-4 rounded border-slate-600 bg-slate-800 accent-indigo-500 cursor-pointer"
              />
              <span className="text-slate-400 group-hover:text-white text-sm transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Brand">
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.brands?.includes(brand) || false}
                onChange={() => toggleArrayFilter("brands", brand)}
                className="w-4 h-4 rounded border-slate-600 bg-slate-800 accent-indigo-500 cursor-pointer"
              />
              <span className="text-slate-400 group-hover:text-white text-sm transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Price Range">
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) => setFilters((p) => ({ ...p, minPrice: e.target.value }))}
              className="w-full bg-slate-900 border border-slate-700 text-slate-300 placeholder-slate-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </div>
          <span className="text-slate-600">–</span>
          <div className="flex-1">
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ""}
              onChange={(e) => setFilters((p) => ({ ...p, maxPrice: e.target.value }))}
              className="w-full bg-slate-900 border border-slate-700 text-slate-300 placeholder-slate-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </Section>

      <div>
        <h3 className="font-display font-semibold text-white text-sm mb-3 uppercase tracking-wide">Min Rating</h3>
        <div className="space-y-2">
          {ratings.map((r) => (
            <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === r}
                onChange={() => setFilters((p) => ({ ...p, minRating: p.minRating === r ? 0 : r }))}
                className="w-4 h-4 accent-indigo-500 cursor-pointer"
              />
              <span className="text-slate-400 group-hover:text-white text-sm transition-colors flex items-center gap-1">
                {"★".repeat(r)}
                <span className="text-slate-600 text-xs">& up</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
