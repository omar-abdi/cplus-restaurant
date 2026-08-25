import { Link } from "react-router-dom";
import {
  Home,
  Utensils,
  LogIn,
  UserPlus,
  Info,
} from "lucide-react";

//cart icon
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">

      {/* Logo + Name */}
      <Link to="/" className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="Cplus Restaurant"
          className="w-12 h-12 rounded-full object-cover"
        />

        <h1 className="text-xl font-bold text-gray-800">
          Cplus <span className="text-orange-500">Restaurant</span>
        </h1>
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-8">

        <Link
          to="/"
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition"
        >
          <Home size={19} />
          Home
        </Link>
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition"
        >
          <Home size={19} />
          dashboard
        </Link>

        <Link
          to="/meals"
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition"
        >
          <Utensils size={19} />
          Foods
        </Link>
        <Link
          to="/drinks"
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition"
        >
          <Utensils size={19} />
         Drinks
        </Link>

        <Link
          to="/details"
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition"
        >
          <Info size={19} />
          Details
        </Link>

      </div>

      {/* Auth */}
      <div className="flex items-center gap-3">

        <Link
          to="/login"
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-orange-500 transition"
        >
          <LogIn size={18} />
          Login
        </Link>

        <Link
          to="/signup"
          className="flex items-center gap-2 px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          <UserPlus size={18} />
          Signup
        </Link>
        <Link
          to="/cart"
          className="flex items-center gap-2 px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          <ShoppingCart size={18} />
          cart
        </Link>

      </div>

    </nav>
  );
};

export default Navbar;