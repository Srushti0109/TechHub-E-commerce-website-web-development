import { Link } from "react-router-dom";
import { getFeaturedProducts, getDealProducts, categories } from "../data/products";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import {
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineRefresh,
  HiOutlineChatAlt2,
  HiArrowRight,
  HiOutlineLightningBolt,
  HiStar,
} from "react-icons/hi";

const featured = getFeaturedProducts().slice(0, 8);
const deals = getDealProducts().slice(0, 4);

const categoryMeta = {
  Smartphones: {
    icon: "📱",
    color: "from-blue-600/20 to-indigo-600/20",
    border: "border-blue-500/20",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80",
  },
  Laptops: {
    icon: "💻",
    color: "from-violet-600/20 to-purple-600/20",
    border: "border-violet-500/20",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80",
  },
  Headphones: {
    icon: "🎧",
    color: "from-pink-600/20 to-rose-600/20",
    border: "border-pink-500/20",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
  },
  Smartwatches: {
    icon: "⌚",
    color: "from-emerald-600/20 to-teal-600/20",
    border: "border-emerald-500/20",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
  },
  "Gaming Accessories": {
    icon: "🎮",
    color: "from-amber-600/20 to-orange-600/20",
    border: "border-amber-500/20",
    img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&q=80",
  },
};

const perks = [
  { icon: HiOutlineTruck, title: "Free Shipping", desc: "On orders over $500" },
  { icon: HiOutlineShieldCheck, title: "Secure Payments", desc: "256-bit SSL encryption" },
  { icon: HiOutlineRefresh, title: "Easy Returns", desc: "30-day hassle-free returns" },
  { icon: HiOutlineChatAlt2, title: "24/7 Support", desc: "Expert help anytime" },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-mesh-gradient">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px]" />
          <div className="absolute top-10 right-10 w-px h-40 bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent" />
          <div className="absolute bottom-20 left-20 w-40 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 mb-6">
              <HiOutlineLightningBolt className="text-indigo-400 text-sm" />
              <span className="text-indigo-300 text-xs font-mono font-medium tracking-wide">NEW ARRIVALS 2026</span>
            </div>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6 text-balance">
              Premium Tech.
              <br />
              <span className="gradient-text">Unbeatable</span>
              <br />
              Prices.
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md">
              Discover the world's finest electronics — from flagship smartphones to pro-grade gaming gear. Curated for the tech-obsessed.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary flex items-center gap-2 text-base px-8 py-3.5">
                Shop Now
                <HiArrowRight />
              </Link>
              <Link to="/products?deal=true" className="btn-secondary flex items-center gap-2 text-base px-8 py-3.5">
                View Deals
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-slate-800/50">
              {[
                { value: "30+", label: "Products" },
                { value: "4.8★", label: "Avg Rating" },
                { value: "50K+", label: "Happy Customers" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="font-display font-bold text-2xl text-white">{value}</div>
                  <div className="text-slate-500 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-indigo-500/20 animate-float" />
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80"
                alt="Featured Product"
                className="relative z-10 w-full h-full object-cover rounded-3xl"
              />
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 glass-strong rounded-2xl p-3 z-20 animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2">
                  <HiStar className="text-amber-400" />
                  <span className="text-white text-sm font-bold">4.9/5</span>
                </div>
                <p className="text-slate-400 text-xs">Top Rated</p>
              </div>
              <div className="absolute -bottom-4 -left-4 glass-strong rounded-2xl p-3 z-20 animate-float" style={{ animationDelay: "2s" }}>
                <p className="text-indigo-400 text-xs font-mono">Free Shipping</p>
                <p className="text-white text-sm font-bold">On $500+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="bg-slate-900/50 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/15 flex items-center justify-center flex-shrink-0">
                  <Icon className="text-indigo-400 text-xl" />
                </div>
                <div>
                  <p className="font-display font-semibold text-white text-sm">{title}</p>
                  <p className="text-slate-500 text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories */}
        <section className="py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-indigo-400 text-xs font-mono uppercase tracking-widest mb-2">Browse By</p>
              <h2 className="section-title">Shop Categories</h2>
            </div>
            <Link to="/products" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 hidden sm:flex">
              All Products <HiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => {
              const meta = categoryMeta[cat];
              return (
                <Link
                  key={cat}
                  to={`/products?category=${encodeURIComponent(cat)}`}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${meta.color} border ${meta.border} p-5 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/10`}
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {meta.icon}
                  </div>
                  <span className="font-display font-semibold text-white text-sm">{cat}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-8 pb-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-indigo-400 text-xs font-mono uppercase tracking-widest mb-2">Hand-Picked</p>
              <h2 className="section-title">Featured Products</h2>
            </div>
            <Link to="/products" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 hidden sm:flex">
              View All <HiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Promo Banner */}
        <section className="py-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/50 via-violet-900/30 to-indigo-900/50 border border-indigo-500/20 p-8 md:p-14 text-center">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px]" />
            </div>
            <div className="relative z-10">
              <span className="badge bg-amber-500/20 text-amber-400 border border-amber-500/20 mb-4 inline-flex">
                🔥 Limited Time Offer
              </span>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                Up to <span className="gradient-text">40% Off</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
                Top deals on flagship devices. Limited stock — don't miss out.
              </p>
              <Link to="/products?deal=true" className="btn-primary inline-flex items-center gap-2 text-base px-10 py-4">
                Shop Deals <HiArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* Top Deals */}
        <section className="py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-amber-400 text-xs font-mono uppercase tracking-widest mb-2">Save Big</p>
              <h2 className="section-title">Top Deals</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {deals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
