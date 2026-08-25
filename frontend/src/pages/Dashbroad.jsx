import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen bg-white shadow-lg transition-all duration-300 ${
          open ? "w-64" : "w-20"
        }`}
      >
        {/* Logo / Header */}
        <div className="flex h-20 items-center justify-between border-b px-4">
          {open && (
            <h1 className="text-xl font-bold text-gray-800">
              Cplus  
              <span className="text-orange-500">Restaurant</span>
            </h1>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          >
            ☰
          </button>
        </div>

        {/* Links */}
        <nav className="mt-6 space-y-2 px-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-100"
          >
            <span>🏠</span>

            {open && <span>Dashboard</span>}
          </Link>

          <Link
            to="/dashboard/orders"
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-100"
          >
            <span>📦</span>

            {open && <span>Orders</span>}
          </Link>

          <Link
            to="/dashboard/Addfood"
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-100"
          >
            <span>🍔</span>

            {open && <span>Food</span>}
          </Link>

          <Link
            to="/dashboard/drinks"
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-100"
          >
            <span>🥤</span>

            {open && <span>Drinks</span>}
          </Link>

          <Link
            to="/dashboard/profile"
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-100"
          >
            <span>👤</span>

            {open && <span>Profile</span>}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`min-h-screen transition-all duration-300 ${
          open ? "ml-64" : "ml-20"
        }`}
      >
        {/* Top bar */}
        <header className="flex h-20 items-center justify-between border-b bg-white px-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Restaurant Dashboard
            </h2>

            <p className="text-sm text-gray-500">
              Manage your restaurant
            </p>
          </div>
        </header>

        {/* Page content */}
        <section className="p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;