import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  ShoppingBag,
  User,
  Home,
  UtensilsCrossed,
} from "lucide-react";

const UserDashboard = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen border-r border-slate-200 bg-white shadow-xl transition-all duration-300 ${
          open ? "w-64" : "w-20"
        }`}
      >

        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-4">

          {open && (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-200">
                <UtensilsCrossed size={20} />
              </div>

              <div>
                <h1 className="text-sm font-bold text-slate-900">
                  Cplus
                </h1>

                <p className="text-xs font-medium text-orange-500">
                  Restaurant
                </p>
              </div>
            </div>
          )}

          {!open && (
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white">
              <UtensilsCrossed size={20} />
            </div>
          )}

        </div>

        {/* Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="absolute -right-3 top-24 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition hover:bg-orange-500 hover:text-white"
        >
          {open ? <X size={15} /> : <Menu size={15} />}
        </button>

        {/* Navigation */}
        <nav className="mt-8 space-y-2 px-3">

          {/* Dashboard */}
          <Link
            to="/user-dashboard"
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
              isActive("/user-dashboard")
                ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
            }`}
          >
            <LayoutDashboard size={19} />

            {open && <span>Dashboard</span>}
          </Link>

          {/* Orders */}
          <Link
            to="/user-dashboard/useorders"
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
              isActive("/user-dashboard/useorders")
                ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
            }`}
          >
            <ShoppingBag size={19} />

            {open && <span>Your Orders</span>}
          </Link>

          {/* Profile */}
          <Link
            to="/user-dashboard/profile"
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
              isActive("/user-dashboard/profile")
                ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
            }`}
          >
            <User size={19} />

            {open && <span>Profile</span>}
          </Link>

          {/* Home */}
          <div className="my-5 border-t border-slate-100" />

          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <Home size={19} />

            {open && <span>Back to Home</span>}
          </Link>

        </nav>

        {/* Bottom User */}
        {open && (
          <div className="absolute bottom-5 left-3 right-3 rounded-2xl bg-slate-50 p-3">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                U
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-800">
                  User Account
                </p>

                <p className="text-xs text-slate-400">
                  Customer
                </p>
              </div>

            </div>

          </div>
        )}

      </aside>

      {/* ================= MAIN ================= */}
      <main
        className={`min-h-screen transition-all duration-300 ${
          open ? "ml-64" : "ml-20"
        }`}
      >

        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur-md">

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
              Customer Area
            </p>

            <h1 className="text-xl font-bold text-slate-900">
              My Dashboard
            </h1>
          </div>

          <Link
            to="/meals"
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600"
          >
            <UtensilsCrossed size={17} />
            Order Food
          </Link>

        </header>

        {/* CONTENT */}
        <section className="p-5 sm:p-7">
          <Outlet />
        </section>

      </main>

    </div>
  );
};

export default UserDashboard;