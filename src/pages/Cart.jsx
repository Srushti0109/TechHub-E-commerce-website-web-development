import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatUSD, formatINR } from "../utils/currency";
import Footer from "../components/Footer";
import {
  HiOutlineShoppingCart,
  HiMinus,
  HiPlus,
  HiOutlineTrash,
  HiArrowRight,
  HiOutlineTruck,
} from "react-icons/hi";

const Cart = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart, clearCart, subtotal, shipping, tax, total, cartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col pt-20">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center mx-auto mb-6">
              <HiOutlineShoppingCart className="text-4xl text-slate-600" />
            </div>
            <h2 className="font-display font-bold text-2xl text-white mb-3">Your cart is empty</h2>
            <p className="text-slate-400 mb-8">Add some amazing products to get started.</p>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-white">Shopping Cart</h1>
            <p className="text-slate-400 text-sm mt-1">{cartCount} item{cartCount !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={clearCart}
            className="text-slate-500 hover:text-rose-400 text-sm flex items-center gap-1.5 transition-colors"
          >
            <HiOutlineTrash />
            Clear cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="glass rounded-2xl p-4 flex gap-4 items-start">
                <Link to={`/products/${item.id}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-xl bg-slate-900"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <span className="text-indigo-400 text-xs font-mono">{item.category}</span>
                  <Link to={`/products/${item.id}`}>
                    <h3 className="font-display font-semibold text-white text-sm leading-snug hover:text-indigo-300 transition-colors line-clamp-2 mt-0.5">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                    <div className="flex items-center gap-1 glass rounded-xl p-1">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <HiMinus className="text-sm" />
                      </button>
                      <span className="w-7 text-center font-mono font-medium text-white text-sm">{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <HiPlus className="text-sm" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="font-display font-bold text-white block">
                          {formatUSD(item.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-slate-500 text-xs">{formatUSD(item.price)}/ea</span>
                        )}
                        <span className="text-slate-600 text-xs font-mono block">{formatINR(item.price * item.quantity)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-600 hover:text-rose-400 transition-colors"
                    >
                      <HiOutlineTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="glass rounded-2xl p-6 sticky top-24">
              <h2 className="font-display font-bold text-lg text-white mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <div className="text-right">
                    <span className="text-slate-200 block">{formatUSD(subtotal)}</span>
                    <span className="text-slate-600 text-xs font-mono">{formatINR(subtotal)}</span>
                  </div>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-400" : "text-slate-200"}>
                    {shipping === 0 ? "FREE" : formatUSD(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax (8%)</span>
                  <span className="text-slate-200">{formatUSD(tax)}</span>
                </div>
                {shipping > 0 && (
                  <div className="flex items-center gap-1.5 text-indigo-400 text-xs bg-indigo-600/10 border border-indigo-500/20 rounded-lg px-3 py-2">
                    <HiOutlineTruck />
                    Add {formatUSD(500 - subtotal)} for free shipping
                  </div>
                )}
              </div>
              <div className="border-t border-slate-700/50 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-display font-bold text-white">Total</span>
                  <div className="text-right">
                    <span className="font-display font-bold text-2xl text-white block">{formatUSD(total)}</span>
                    <span className="text-slate-500 text-xs font-mono">{formatINR(total)}</span>
                  </div>
                </div>
              </div>
              <Link to="/checkout" className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
                Proceed to Checkout <HiArrowRight />
              </Link>
              <Link to="/products" className="btn-ghost w-full text-center py-2.5 mt-2 text-sm block">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
