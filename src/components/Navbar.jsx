import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import {
  HiOutlineShoppingCart,
  HiOutlineHeart,
  HiOutlineSearch,
  HiOutlineUser,
  HiOutlineLogout,
  HiMenuAlt3,
  HiX,
  HiOutlineLightningBolt,
} from "react-icons/hi";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
      setMenuOpen(false);
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-xl shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
              <HiOutlineLightningBolt className="text-white text-lg" />
            </div>
            <span className="font-display font-bold text-xl text-white tracking-tight">
              Tech<span className="text-indigo-400">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-display font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white bg-indigo-600/20 border border-indigo-500/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="btn-ghost p-2 rounded-lg"
              >
                <HiOutlineSearch className="text-xl" />
              </button>
              {searchOpen && (
                <form
                  onSubmit={handleSearch}
                  className="absolute right-0 top-12 glass-strong rounded-xl p-2 flex gap-2 min-w-[260px] animate-scale-in"
                >
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products…"
                    className="flex-1 bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500"
                  />
                  <button type="submit" className="btn-primary px-3 py-2 text-sm">
                    Go
                  </button>
                </form>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="btn-ghost p-2 rounded-lg relative">
              <HiOutlineHeart className="text-xl" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="btn-ghost p-2 rounded-lg relative">
              <HiOutlineShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-indigo-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {currentUser ? (
              <div className="relative hidden md:block" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-all"
                >
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{currentUser.name[0].toUpperCase()}</span>
                  </div>
                  <span className="text-slate-300 text-sm font-medium">{currentUser.name.split(" ")[0]}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-12 glass-strong rounded-xl py-1 min-w-[160px] shadow-xl shadow-black/30 animate-scale-in">
                    <div className="px-4 py-2 border-b border-slate-700/50">
                      <p className="text-slate-400 text-xs">Signed in as</p>
                      <p className="text-white text-sm font-medium truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); navigate("/"); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors text-sm"
                    >
                      <HiOutlineLogout />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hidden md:flex items-center gap-1.5 btn-primary px-4 py-2 text-sm">
                <HiOutlineUser />
                Sign in
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden btn-ghost p-2 rounded-lg ml-1"
            >
              {menuOpen ? <HiX className="text-xl" /> : <HiMenuAlt3 className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass-strong border-t border-slate-700/50 animate-slide-up">
          <div className="px-4 py-4 space-y-2">
            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products…"
                className="flex-1 input-field py-2 text-sm"
              />
              <button type="submit" className="btn-primary px-4 py-2 text-sm">Search</button>
            </form>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "text-white bg-indigo-600/20" : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {currentUser ? (
              <button
                onClick={() => { logout(); setMenuOpen(false); navigate("/"); }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-slate-400 hover:text-white rounded-lg transition-colors text-sm"
              >
                <HiOutlineLogout />
                Sign out ({currentUser.name})
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block btn-primary text-center py-2.5 text-sm"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
