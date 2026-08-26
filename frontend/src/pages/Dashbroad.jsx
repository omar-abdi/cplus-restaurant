import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import storeUser from "../zustand/user";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = storeUser();

  const isActive = (path) => location.pathname === path;
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen border-r border-gray-200 bg-white shadow-sm transition-all duration-300 ${
          open ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b px-4">
          {open && (
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Cplus
                <span className="text-orange-500"> Restaurant</span>
              </h1>

              <p className="text-xs text-gray-400">
                Management
              </p>
            </div>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="rounded-xl p-2 text-gray-600 transition hover:bg-gray-100"
          >
            ☰
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-6 space-y-2 px-3">

          {/* Dashboard */}
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 rounded-xl px-3 py-3 transition ${
              isActive("/dashboard")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="text-xl">🏠</span>

            {open && (
              <span className="font-medium">
                Dashboard
              </span>
            )}
          </Link>

          {/* Orders */}
          <Link
            to="/dashboard/orders"
            className={`flex items-center gap-3 rounded-xl px-3 py-3 transition ${
              isActive("/dashboard/orders")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="text-xl">📦</span>

            {open && (
              <span className="font-medium">
                Orders
              </span>
            )}
          </Link>

          {/* Add Food */}
          <Link
            to="/dashboard/users"
            className={`flex items-center gap-3 rounded-xl px-3 py-3 transition ${
              isActive("/dashboard/users")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="text-xl">Users</span>

            {open && (
              <span className="font-medium">
                All Users
              </span>
            )}
          </Link>

          {/* Add Food */}
          <Link
            to="/dashboard/addfood"
            className={`flex items-center gap-3 rounded-xl px-3 py-3 transition ${
              isActive("/dashboard/addfood")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="text-xl">🍔</span>

            {open && (
              <span className="font-medium">
                Add Food
              </span>
            )}
          </Link>

          {/* Add Drink */}
          <Link
            to="/dashboard/add-drink"
            className={`flex items-center gap-3 rounded-xl px-3 py-3 transition ${
              isActive("/dashboard/add-drink")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="text-xl">🥤</span>

            {open && (
              <span className="font-medium">
                Add Drink
              </span>
            )}
          </Link>

          {/* Profile */}
          <Link
            to="/dashboard/profile"
            className={`flex items-center gap-3 rounded-xl px-3 py-3 transition ${
              isActive("/dashboard/profile")
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="text-xl">👤</span>

            {open && (
              <span className="font-medium">
                Profile
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-rose-600 transition hover:bg-rose-50"
          >
            <LogOut size={20} />

            {open && <span className="font-medium">Logout</span>}
          </button>

        </nav>
      </aside>

      {/* Right Side */}
      <main
        className={`min-h-screen transition-all duration-300 ${
          open ? "ml-64" : "ml-20"
        }`}
      >
        {/* Top Header */}
        <header className="flex h-20 items-center border-b border-gray-200 bg-white px-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Restaurant Dashboard
            </h2>

            <p className="text-sm text-gray-400">
              Manage your restaurant
            </p>
          </div>
        </header>

        {/* Child Pages Open Here */}
        <section className="p-6">
          <Outlet />
        </section>
      </main>

    </div>
  );
};

export default Dashboard;
