import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatUSD, formatINR } from "../utils/currency";
import Footer from "../components/Footer";
import { HiOutlineShieldCheck, HiOutlineCreditCard, HiOutlineTruck } from "react-icons/hi";

const COUNTRIES = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "India", "Japan"];

const Checkout = () => {
  const { cartItems, subtotal, shipping, tax, total, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: currentUser?.name?.split(" ")[0] || "",
    lastName: currentUser?.name?.split(" ").slice(1).join(" ") || "",
    email: currentUser?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const handleCardNumber = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = digits.replace(/(.{4})/g, "$1 ").trim();
    setForm((p) => ({ ...p, cardNumber: formatted }));
    setErrors((p) => ({ ...p, cardNumber: "" }));
  };

  const validate = () => {
    const errs = {};
    const req = ["firstName", "lastName", "email", "phone", "address", "city", "state", "zip", "cardName", "cardNumber", "expiry", "cvv"];
    req.forEach((f) => { if (!form[f].trim()) errs[f] = "Required"; });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (form.cardNumber && form.cardNumber.replace(/\s/g, "").length !== 16) errs.cardNumber = "Must be 16 digits";
    if (form.cvv && (form.cvv.length < 3 || form.cvv.length > 4)) errs.cvv = "3–4 digits";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const txId = "TH" + Date.now().toString(36).toUpperCase();
    const order = {
      id: txId,
      items: cartItems,
      subtotal, shipping, tax, total,
      createdAt: new Date().toISOString(),
      address: `${form.address}, ${form.city}, ${form.state} ${form.zip}, ${form.country}`,
    };
    clearCart();
    navigate("/order-success", { state: { order } });
  };

  const Field = ({ name, label, placeholder, type = "text", half, mono }) => (
    <div className={half ? "col-span-1" : "col-span-2"}>
      <label className="block text-slate-300 text-xs font-medium mb-1.5 uppercase tracking-wide">{label}</label>
      <input
        type={type}
        value={form[name]}
        onChange={name === "cardNumber" ? handleCardNumber : set(name)}
        placeholder={placeholder}
        maxLength={name === "cvv" ? 4 : undefined}
        className={`input-field ${errors[name] ? "border-rose-500" : ""} ${mono ? "font-mono" : ""}`}
      />
      {errors[name] && <p className="text-rose-400 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-display font-bold text-3xl text-white mb-2">Checkout</h1>
        <p className="text-slate-400 text-sm mb-8">Complete your order securely</p>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact */}
              <div className="glass rounded-2xl p-6">
                <h2 className="font-display font-semibold text-white mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 bg-indigo-600 rounded-full text-xs flex items-center justify-center text-white font-mono">1</span>
                  Contact Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field name="firstName" label="First name" placeholder="John" half />
                  <Field name="lastName" label="Last name" placeholder="Doe" half />
                  <Field name="email" label="Email" placeholder="you@example.com" type="email" />
                  <Field name="phone" label="Phone" placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              {/* Shipping */}
              <div className="glass rounded-2xl p-6">
                <h2 className="font-display font-semibold text-white mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 bg-indigo-600 rounded-full text-xs flex items-center justify-center text-white font-mono">2</span>
                  <HiOutlineTruck className="text-indigo-400" />
                  Shipping Address
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field name="address" label="Street address" placeholder="123 Main St" />
                  <Field name="city" label="City" placeholder="New York" half />
                  <Field name="state" label="State / Province" placeholder="NY" half />
                  <Field name="zip" label="ZIP / Postal code" placeholder="10001" half />
                  <div className="col-span-1">
                    <label className="block text-slate-300 text-xs font-medium mb-1.5 uppercase tracking-wide">Country</label>
                    <select
                      value={form.country}
                      onChange={set("country")}
                      className="input-field"
                    >
                      {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="glass rounded-2xl p-6">
                <h2 className="font-display font-semibold text-white mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 bg-indigo-600 rounded-full text-xs flex items-center justify-center text-white font-mono">3</span>
                  <HiOutlineCreditCard className="text-indigo-400" />
                  Payment Details
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                  <HiOutlineShieldCheck className="text-green-400" />
                  Secured with 256-bit SSL encryption
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field name="cardName" label="Name on card" placeholder="John Doe" />
                  <Field name="cardNumber" label="Card number" placeholder="1234 5678 9012 3456" mono />
                  <Field name="expiry" label="Expiry (MM/YY)" placeholder="12/27" half />
                  <Field name="cvv" label="CVV" placeholder="123" half mono />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="glass rounded-2xl p-6 sticky top-24">
                <h2 className="font-display font-bold text-lg text-white mb-5">Order Summary</h2>
                <div className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-lg bg-slate-900 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-300 text-xs line-clamp-1">{item.title}</p>
                        <p className="text-slate-500 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-white text-sm font-medium block">{formatUSD(item.price * item.quantity)}</span>
                        <span className="text-slate-600 text-xs font-mono">{formatINR(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-700/50 pt-4 space-y-2 text-sm mb-5">
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
                    <span>Tax (8%)</span><span className="text-slate-200">{formatUSD(tax)}</span>
                  </div>
                </div>
                <div className="border-t border-slate-700/50 pt-4 flex justify-between items-center mb-6">
                  <span className="font-display font-bold text-white">Total</span>
                  <div className="text-right">
                    <span className="font-display font-bold text-2xl text-white block">{formatUSD(total)}</span>
                    <span className="text-slate-500 text-xs font-mono">{formatINR(total)}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading || cartItems.length === 0}
                  className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-base disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>
                      <HiOutlineShieldCheck />
                      Place Order
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
