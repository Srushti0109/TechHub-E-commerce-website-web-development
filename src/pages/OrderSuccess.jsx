import { useLocation, Link, Navigate } from "react-router-dom";
import { formatUSD, formatINR } from "../utils/currency";
import Footer from "../components/Footer";
import { HiCheckCircle, HiOutlineShoppingBag, HiArrowRight } from "react-icons/hi";

const OrderSuccess = () => {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-slate-950 pt-20 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg text-center">
          {/* Success icon */}
          <div className="relative inline-block mb-8">
            <div className="w-24 h-24 bg-green-500/15 border border-green-500/30 rounded-full flex items-center justify-center mx-auto">
              <HiCheckCircle className="text-green-400 text-5xl" />
            </div>
            <div className="absolute inset-0 rounded-full bg-green-500/5 animate-ping" />
          </div>

          <h1 className="font-display font-bold text-4xl text-white mb-3">Order Confirmed!</h1>
          <p className="text-slate-400 text-lg mb-8">
            Thank you for your purchase. Your order is being processed.
          </p>

          {/* Transaction ID */}
          <div className="glass rounded-2xl p-5 mb-8 text-left">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700/50">
              <div>
                <p className="text-slate-500 text-xs font-mono uppercase tracking-wide">Transaction ID</p>
                <p className="font-mono font-bold text-indigo-400 text-lg mt-0.5">{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-500 text-xs font-mono uppercase tracking-wide">Date</p>
                <p className="text-slate-300 text-sm mt-0.5">
                  {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-xl bg-slate-900 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-300 text-sm line-clamp-1">{item.title}</p>
                    <p className="text-slate-500 text-xs">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-white text-sm font-medium block">{formatUSD(item.price * item.quantity)}</span>
                    <span className="text-slate-600 text-xs font-mono">{formatINR(item.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-slate-700/50 pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <div className="text-right">
                  <span className="block">{formatUSD(order.subtotal)}</span>
                  <span className="text-slate-600 text-xs font-mono">{formatINR(order.subtotal)}</span>
                </div>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping</span>
                <span className={order.shipping === 0 ? "text-green-400" : ""}>{order.shipping === 0 ? "FREE" : formatUSD(order.shipping)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tax</span><span>{formatUSD(order.tax)}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-base pt-1 border-t border-slate-700/50 mt-1">
                <span>Total</span>
                <div className="text-right">
                  <span className="block">{formatUSD(order.total)}</span>
                  <span className="text-slate-500 text-xs font-mono font-normal">{formatINR(order.total)}</span>
                </div>
              </div>
            </div>

            {order.address && (
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <p className="text-slate-500 text-xs uppercase tracking-wide font-mono mb-1">Shipping to</p>
                <p className="text-slate-300 text-sm">{order.address}</p>
              </div>
            )}
          </div>

          <p className="text-slate-500 text-sm mb-8">
            A confirmation email will be sent to your email address.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/products" className="btn-primary flex items-center justify-center gap-2">
              <HiOutlineShoppingBag />
              Continue Shopping
              <HiArrowRight />
            </Link>
            <Link to="/" className="btn-secondary flex items-center justify-center gap-2">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
