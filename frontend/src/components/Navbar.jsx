import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Utensils,
  LogIn,
  UserPlus,
  Info,
  ShoppingCart,
  LayoutDashboard,
  Mail,
  Menu,
  X,
  User,
} from "lucide-react";

import storeUser from "../zustand/user";
import storeOrders from "../zustand/orderers";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const { user } = storeUser();
  const { cartItems } = storeOrders();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLink = (path) =>
    `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
      location.pathname === path
        ? "bg-orange-50 text-orange-600"
        : "text-slate-600 hover:bg-slate-50 hover:text-orange-500"
    }`;

  const mobileNavLink = (path) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
      location.pathname === path
        ? "bg-orange-500 text-white font-semibold"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* ================= LOGO ================= */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
          <div className="relative">
            <img
              src="/images/logo.png"
              alt="Cplus Restaurant"
              className="h-11 w-11 rounded-full object-cover ring-2 ring-orange-100"
            />

            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
          </div>

          <div className="block">
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
              Cplus{" "}
              <span className="text-orange-500">
                Restaurant
              </span>
            </h1>

            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
              Taste the difference
            </p>
          </div>
        </Link>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <div className="hidden items-center gap-1 md:flex">

          <Link to="/" className={navLink("/")}>
            <Home size={17} />
            Home
          </Link>

          <Link to="/meals" className={navLink("/meals")}>
            <Utensils size={17} />
            Foods
          </Link>

          <Link to="/drinks" className={navLink("/drinks")}>
            <Utensils size={17} />
            Drinks
          </Link>

          <Link to="/details" className={navLink("/details")}>
            <Info size={17} />
            Details
          </Link>

          {/* Admin Dashboard - Admin only */}
          {user?.isAdmin && (
            <Link
              to="/dashboard"
              className={navLink("/dashboard")}
            >
              <LayoutDashboard size={17} />
              Admin Dashboard
            </Link>
          )}

          {/* User Dashboard - Logged in users */}
          {user && (
            <Link
              to="/user-dashboard"
              className={navLink("/user-dashboard")}
            >
              <LayoutDashboard size={17} />
              User Dashboard
            </Link>
          )}
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center gap-2">

          {/* User Profile / Login / Signup (Desktop) */}
          {user ? (
            <div className="hidden items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 sm:flex">
              <User size={17} className="text-orange-500" />
              <span className="text-sm font-semibold text-slate-800">
                {user.name || user.username || user.email?.split("@")[0]}
              </span>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-orange-500 sm:flex"
              >
                <LogIn size={17} />
                Login
              </Link>

              <Link
                to="/signup"
                className="hidden items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 sm:flex"
              >
                <UserPlus size={17} />
                Signup
              </Link>
            </>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            onClick={closeMenu}
            className="group relative flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg"
          >
            <ShoppingCart
              size={19}
              className="transition-transform group-hover:scale-110"
            />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-slate-900 px-1 text-[10px] font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Contact */}
          <Link
            to="/contact"
            onClick={closeMenu}
            className="group flex h-11 items-center gap-2 rounded-xl bg-orange-500 px-4 text-sm font-semibold text-white shadow-md shadow-orange-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg"
          >
            <Mail
              size={17}
              className="transition-transform group-hover:scale-110"
            />

            <span className="hidden sm:inline">
              Contact
            </span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 md:hidden"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </div>

      {/* ================= MOBILE MENU DROPDOWN ================= */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-6 shadow-xl md:hidden">
          <div className="flex flex-col space-y-2">

            {user && (
              <div className="mb-2 flex items-center gap-3 rounded-xl bg-orange-50 p-3 border border-orange-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Logged in as</p>
                  <p className="text-sm font-bold text-slate-800">
                    {user.name || user.username || user.email?.split("@")[0]}
                  </p>
                </div>
              </div>
            )}

            <Link to="/" onClick={closeMenu} className={mobileNavLink("/")}>
              <Home size={20} />
              Home
            </Link>

            <Link to="/meals" onClick={closeMenu} className={mobileNavLink("/meals")}>
              <Utensils size={20} />
              Foods
            </Link>

            <Link to="/drinks" onClick={closeMenu} className={mobileNavLink("/drinks")}>
              <Utensils size={20} />
              Drinks
            </Link>

            <Link to="/details" onClick={closeMenu} className={mobileNavLink("/details")}>
              <Info size={20} />
              Details
            </Link>

            {user?.isAdmin && (
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className={mobileNavLink("/dashboard")}
              >
                <LayoutDashboard size={20} />
                Admin Dashboard
              </Link>
            )}

            {user && (
              <Link
                to="/user-dashboard"
                onClick={closeMenu}
                className={mobileNavLink("/user-dashboard")}
              >
                <LayoutDashboard size={20} />
                User Dashboard
              </Link>
            )}

            {!user && (
              <div className="mt-4 flex flex-col gap-2 pt-2 border-t border-slate-100">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-700"
                >
                  <LogIn size={18} />
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white shadow-md shadow-orange-200"
                >
                  <UserPlus size={18} />
                  Signup
                </Link>
              </div>
            )}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;