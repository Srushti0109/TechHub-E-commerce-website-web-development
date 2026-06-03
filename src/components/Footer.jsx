import { Link } from "react-router-dom";
import { useState } from "react";
import {
  HiOutlineLightningBolt,
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlinePhone,
} from "react-icons/hi";
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const links = {
    Company: [
      { label: "About Us", to: "/" },
      { label: "Careers", to: "/" },
      { label: "Press", to: "/" },
      { label: "Blog", to: "/" },
    ],
    Support: [
      { label: "Help Center", to: "/" },
      { label: "Track Order", to: "/" },
      { label: "Returns", to: "/" },
      { label: "Warranty", to: "/" },
    ],
    Shop: [
      { label: "Smartphones", to: "/products?category=Smartphones" },
      { label: "Laptops", to: "/products?category=Laptops" },
      { label: "Headphones", to: "/products?category=Headphones" },
      { label: "Smartwatches", to: "/products?category=Smartwatches" },
    ],
  };

  const socials = [
    { Icon: FaTwitter, href: "#", label: "Twitter" },
    { Icon: FaInstagram, href: "#", label: "Instagram" },
    { Icon: FaYoutube, href: "#", label: "YouTube" },
    { Icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { Icon: FaGithub, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <HiOutlineLightningBolt className="text-white text-lg" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Tech<span className="text-indigo-400">Hub</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Your premium destination for the latest electronics. Curated tech, exceptional prices, unmatched service.
            </p>
            <div className="space-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <HiOutlineMail className="text-indigo-400 flex-shrink-0" />
                <span>support@techhub.com</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlinePhone className="text-indigo-400 flex-shrink-0" />
                <span>+1 (800) 832-4968</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineLocationMarker className="text-indigo-400 flex-shrink-0" />
                <span>San Francisco, CA 94105</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 className="font-display font-semibold text-white mb-4 text-sm tracking-wide uppercase">{section}</h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-slate-400 hover:text-white text-sm transition-colors hover:translate-x-0.5 inline-block transition-transform"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-slate-800/50 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-semibold text-white mb-1">Stay in the loop</h3>
            <p className="text-slate-400 text-sm">Get deals, drops, and tech news delivered to your inbox.</p>
          </div>
          {subscribed ? (
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium">
              <span className="text-lg">✓</span>
              You're subscribed!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-field py-2.5 text-sm md:w-64"
                required
              />
              <button type="submit" className="btn-primary px-5 py-2.5 text-sm whitespace-nowrap">
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800/50 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} TechHub Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
              >
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
