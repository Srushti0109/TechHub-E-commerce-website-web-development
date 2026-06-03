import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  HiOutlineLightningBolt,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiEye,
  HiEyeOff,
} from "react-icons/hi";

// Declared OUTSIDE Register — stable component reference prevents
// unmount/remount on every keystroke, preserving input focus.
const InputField = ({ name, type, icon: Icon, label, placeholder, value, onChange, error, children }) => (
  <div>
    <label className="block text-slate-300 text-sm font-medium mb-1.5">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field pl-10 ${error ? "border-rose-500 focus:border-rose-500" : ""}`}
      />
      {children}
    </div>
    {error && <p className="text-rose-400 text-xs mt-1">{error}</p>}
  </div>
);

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required.";
    else if (form.name.trim().length < 2) errs.name = "Name must be at least 2 characters.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 6) errs.password = "Password must be at least 6 characters.";
    if (!form.confirm) errs.confirm = "Please confirm your password.";
    else if (form.confirm !== form.password) errs.confirm = "Passwords do not match.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setApiError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const result = register(form.name.trim(), form.email.trim(), form.password);
    setLoading(false);
    if (result.success) navigate("/");
    else setApiError(result.error);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-violet-600/8 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="glass-strong rounded-3xl p-8 shadow-2xl shadow-black/40">
          <div className="flex items-center gap-2 justify-center mb-8">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
              <HiOutlineLightningBolt className="text-white text-lg" />
            </div>
            <span className="font-display font-bold text-2xl text-white">Tech<span className="text-indigo-400">Hub</span></span>
          </div>

          <h1 className="font-display font-bold text-2xl text-white text-center mb-1">Create account</h1>
          <p className="text-slate-400 text-sm text-center mb-8">Join TechHub and start shopping</p>

          {apiError && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-3 text-rose-400 text-sm mb-6">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              name="name"
              type="text"
              icon={HiOutlineUser}
              label="Full name"
              placeholder="John Doe"
              value={form.name}
              onChange={set("name")}
              error={errors.name}
            />
            <InputField
              name="email"
              type="email"
              icon={HiOutlineMail}
              label="Email address"
              placeholder="you@example.com"
              value={form.email}
              onChange={set("email")}
              error={errors.email}
            />
            <InputField
              name="password"
              type={showPass ? "text" : "password"}
              icon={HiOutlineLockClosed}
              label="Password"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={set("password")}
              error={errors.password}
            >
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPass ? <HiEyeOff /> : <HiEye />}
              </button>
            </InputField>
            <InputField
              name="confirm"
              type={showPass ? "text" : "password"}
              icon={HiOutlineLockClosed}
              label="Confirm password"
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={set("confirm")}
              error={errors.confirm}
            />

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : "Create Account"}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
