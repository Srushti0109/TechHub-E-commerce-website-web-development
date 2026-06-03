import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatUSD, formatINR } from "../utils/currency";
import {
  HiOutlineShoppingCart,
  HiHeart,
  HiOutlineHeart,
  HiStar,
  HiOutlineEye,
  HiCheck,
} from "react-icons/hi";

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <HiStar
        key={s}
        className={`text-sm ${s <= Math.floor(rating) ? "text-amber-400" : "text-slate-600"}`}
      />
    ))}
    <span className="text-slate-400 text-xs ml-1 font-mono">{rating}</span>
  </div>
);

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group relative glass rounded-2xl overflow-hidden card-hover border border-slate-800/50 hover:border-indigo-500/30 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-slate-900 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <button
            onClick={() => toggleWishlist(product)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              inWishlist ? "bg-rose-500 text-white" : "bg-slate-900/90 text-slate-400 hover:bg-rose-500 hover:text-white"
            }`}
          >
            {inWishlist ? <HiHeart className="text-sm" /> : <HiOutlineHeart className="text-sm" />}
          </button>
          <Link
            to={`/products/${product.id}`}
            className="w-8 h-8 rounded-full bg-slate-900/90 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all"
          >
            <HiOutlineEye className="text-sm" />
          </Link>
        </div>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount && (
            <span className="badge bg-indigo-600/90 text-white">-{discount}%</span>
          )}
          {product.deal && (
            <span className="badge bg-amber-500/90 text-white">Deal</span>
          )}
          {product.stock <= 5 && (
            <span className="badge bg-rose-500/90 text-white">Low Stock</span>
          )}
          {product.stock === 0 && (
            <span className="badge bg-slate-700 text-slate-300">Out of Stock</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-indigo-400 text-xs font-mono font-medium tracking-wide uppercase mb-1">
          {product.category}
        </span>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-display font-semibold text-white text-sm leading-snug mb-2 hover:text-indigo-300 transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <StarRating rating={product.rating} />
        <div className="flex items-baseline gap-2 mt-2 mb-4 flex-wrap">
          <span className="font-display font-bold text-white text-lg">{formatUSD(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-slate-500 text-sm line-through">{formatUSD(product.originalPrice)}</span>
          )}
          <span className="text-slate-500 text-xs font-mono">{formatINR(product.price)}</span>
        </div>
        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className={`mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-display font-semibold transition-all duration-200 ${
            inCart
              ? "bg-green-600/20 border border-green-500/30 text-green-400"
              : product.stock === 0
              ? "bg-slate-800 text-slate-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95"
          }`}
        >
          {inCart ? (
            <>
              <HiCheck className="text-base" />
              In Cart
            </>
          ) : (
            <>
              <HiOutlineShoppingCart className="text-base" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
