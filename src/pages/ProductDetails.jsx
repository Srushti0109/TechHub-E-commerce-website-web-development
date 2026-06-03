import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { getProductById, getRelatedProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatUSD, formatINR } from "../utils/currency";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import {
  HiStar,
  HiOutlineShoppingCart,
  HiHeart,
  HiOutlineHeart,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineRefresh,
  HiArrowLeft,
  HiCheck,
  HiMinus,
  HiPlus,
} from "react-icons/hi";

const StarRating = ({ rating, size = "text-lg" }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <HiStar key={s} className={`${size} ${s <= Math.floor(rating) ? "text-amber-400" : "text-slate-600"}`} />
    ))}
    <span className="text-slate-400 text-sm ml-1.5 font-mono">{rating} / 5</span>
  </div>
);

const ProductDetails = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart, isInCart, increaseQty, decreaseQty, cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-7xl mb-4">📦</div>
          <h2 className="font-display font-bold text-2xl text-white mb-2">Product Not Found</h2>
          <p className="text-slate-400 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn-primary">Browse Products</Link>
        </div>
      </div>
    );
  }

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const related = getRelatedProducts(product);
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;
  const cartItem = cartItems.find((i) => i.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, qty);
  };

  const perks = [
    { icon: HiOutlineTruck, label: "Free shipping on orders $500+" },
    { icon: HiOutlineShieldCheck, label: "Secure 256-bit SSL checkout" },
    { icon: HiOutlineRefresh, label: "30-day hassle-free returns" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Link to="/" className="text-slate-500 hover:text-slate-300 transition-colors">Home</Link>
          <span className="text-slate-700">/</span>
          <Link to="/products" className="text-slate-500 hover:text-slate-300 transition-colors">Products</Link>
          <span className="text-slate-700">/</span>
          <Link to={`/products?category=${product.category}`} className="text-slate-500 hover:text-slate-300 transition-colors">{product.category}</Link>
          <span className="text-slate-700">/</span>
          <span className="text-slate-300 truncate max-w-[200px]">{product.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800/50 aspect-square">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {discount && (
                <div className="absolute top-4 left-4 badge bg-indigo-600 text-white text-sm px-3 py-1">
                  -{discount}% OFF
                </div>
              )}
              {product.deal && (
                <div className="absolute top-4 right-4 badge bg-amber-500 text-white text-sm px-3 py-1">
                  🔥 Hot Deal
                </div>
              )}
            </div>
            {/* Perks below image */}
            <div className="glass rounded-2xl p-4 space-y-2.5">
              {perks.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon className="text-indigo-400 flex-shrink-0" />
                  <span className="text-slate-400 text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-1">
              <span className="text-indigo-400 text-xs font-mono uppercase tracking-widest">{product.category}</span>
              <span className="text-slate-600 mx-2">·</span>
              <span className="text-slate-500 text-xs font-mono">{product.brand}</span>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight mb-4">
              {product.title}
            </h1>

            <StarRating rating={product.rating} size="text-xl" />

            <div className="flex items-baseline gap-4 mt-5 mb-6 flex-wrap">
              <span className="font-display font-bold text-4xl text-white">{formatUSD(product.price)}</span>
              {product.originalPrice > product.price && (
                <div>
                  <span className="text-slate-500 text-xl line-through block">{formatUSD(product.originalPrice)}</span>
                  <span className="text-green-400 text-sm font-medium">Save {formatUSD(product.originalPrice - product.price)}</span>
                </div>
              )}
              <span className="text-slate-500 text-sm font-mono">{formatINR(product.price)}</span>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-2 h-2 rounded-full ${product.stock > 5 ? "bg-green-400" : product.stock > 0 ? "bg-amber-400" : "bg-red-400"}`} />
              <span className={`text-sm font-medium ${product.stock > 5 ? "text-green-400" : product.stock > 0 ? "text-amber-400" : "text-red-400"}`}>
                {product.stock > 5 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed mb-8 text-sm">{product.description}</p>

            {/* Quantity & Cart */}
            {!inCart ? (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 glass rounded-xl p-1">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <HiMinus />
                  </button>
                  <span className="w-8 text-center font-mono font-medium text-white">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <HiPlus />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <HiOutlineShoppingCart />
                  Add to Cart
                </button>
              </div>
            ) : (
              <div className="mb-4 space-y-3">
                <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                  <HiCheck />
                  Added to cart
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 glass rounded-xl p-1">
                    <button onClick={() => decreaseQty(product.id)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                      <HiMinus />
                    </button>
                    <span className="w-8 text-center font-mono font-medium text-white">{cartItem?.quantity || 0}</span>
                    <button onClick={() => increaseQty(product.id)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                      <HiPlus />
                    </button>
                  </div>
                  <Link to="/cart" className="flex-1 btn-secondary flex items-center justify-center gap-2 py-3">
                    View Cart
                  </Link>
                </div>
              </div>
            )}

            <button
              onClick={() => toggleWishlist(product)}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all duration-200 text-sm font-display font-semibold ${
                inWishlist
                  ? "bg-rose-500/15 border-rose-500/30 text-rose-400"
                  : "bg-transparent border-slate-700 text-slate-400 hover:border-rose-500/30 hover:text-rose-400"
              }`}
            >
              {inWishlist ? <HiHeart /> : <HiOutlineHeart />}
              {inWishlist ? "Saved to Wishlist" : "Save to Wishlist"}
            </button>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="pb-12">
            <h2 className="section-title mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
