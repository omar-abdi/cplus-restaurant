
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
} from "lucide-react";

import storeUser from "../zustand/user";
import storeOrders from "../zustand/orderers";

const Navbar = () => {
  const location = useLocation();

  const { user } = storeUser();
  const { cartItems } = storeOrders();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navLink = (path) =>
    `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
      location.pathname === path
        ? "bg-orange-50 text-orange-600"
        : "text-slate-600 hover:bg-slate-50 hover:text-orange-500"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* ================= LOGO ================= */}
        <Link to="/" className="flex items-center gap-3">
          <div className="relative">
            <img
              src="/logo.png"
              alt="Cplus Restaurant"
              className="h-11 w-11 rounded-full object-cover ring-2 ring-orange-100"
            />

            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
          </div>

          <div className="hidden sm:block">
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

        {/* ================= NAVIGATION ================= */}
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
            user Dashboard
            </Link>
          )}
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center gap-2">

          {/* Login */}
          {!user && (
            <Link
              to="/login"
              className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-orange-500 sm:flex"
            >
              <LogIn size={17} />
              Login
            </Link>
          )}

          {/* Signup */}
          {!user && (
            <Link
              to="/signup"
              className="hidden items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 sm:flex"
            >
              <UserPlus size={17} />
              Signup
            </Link>
          )}

          {/* Cart */}
          <Link
            to="/cart"
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

        </div>
      </div>
    </nav>
  );
};

export default Navbar;




