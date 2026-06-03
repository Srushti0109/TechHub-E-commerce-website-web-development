import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { formatUSD, formatINR } from "../utils/currency";
import Footer from "../components/Footer";
import {
  HiOutlineHeart,
  HiHeart,
  HiOutlineShoppingCart,
  HiOutlineTrash,
  HiArrowRight,
} from "react-icons/hi";
import { HiStar } from "react-icons/hi";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col pt-20">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center mx-auto mb-6">
              <HiOutlineHeart className="text-4xl text-slate-600" />
            </div>
            <h2 className="font-display font-bold text-2xl text-white mb-3">Your wishlist is empty</h2>
            <p className="text-slate-400 mb-8">Save products you love to revisit them later.</p>
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              Browse Products <HiArrowRight />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-8">
          <HiHeart className="text-rose-500 text-2xl" />
          <div>
            <h1 className="font-display font-bold text-3xl text-white">Wishlist</h1>
            <p className="text-slate-400 text-sm">{wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {wishlist.map((item) => {
            const inCart = isInCart(item.id);
            const discount = item.originalPrice > item.price
              ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
              : null;
            return (
              <div key={item.id} className="glass rounded-2xl overflow-hidden border border-slate-800/50 hover:border-indigo-500/30 transition-all duration-300 group flex flex-col">
                <div className="relative overflow-hidden bg-slate-900 aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {discount && (
                    <span className="absolute top-3 left-3 badge bg-indigo-600 text-white">-{discount}%</span>
                  )}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600"
                  >
                    <HiOutlineTrash className="text-sm" />
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-indigo-400 text-xs font-mono mb-1">{item.category}</span>
                  <Link to={`/products/${item.id}`}>
                    <h3 className="font-display font-semibold text-white text-sm leading-snug hover:text-indigo-300 transition-colors line-clamp-2 mb-2">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-0.5 mb-3">
                    {[1,2,3,4,5].map((s) => (
                      <HiStar key={s} className={`text-sm ${s <= Math.floor(item.rating) ? "text-amber-400" : "text-slate-600"}`} />
                    ))}
                    <span className="text-slate-400 text-xs ml-1 font-mono">{item.rating}</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-4 flex-wrap">
                    <span className="font-display font-bold text-white text-lg">{formatUSD(item.price)}</span>
                    {item.originalPrice > item.price && (
                      <span className="text-slate-500 text-sm line-through">{formatUSD(item.originalPrice)}</span>
                    )}
                    <span className="text-slate-500 text-xs font-mono">{formatINR(item.price)}</span>
                  </div>
                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={() => addToCart(item)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-display font-semibold transition-all ${
                        inCart
                          ? "bg-green-600/20 border border-green-500/30 text-green-400"
                          : "bg-indigo-600 hover:bg-indigo-500 text-white"
                      }`}
                    >
                      <HiOutlineShoppingCart className="text-base" />
                      {inCart ? "In Cart" : "Add to Cart"}
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-all border border-slate-700 hover:border-rose-500/30"
                    >
                      <HiOutlineTrash />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
