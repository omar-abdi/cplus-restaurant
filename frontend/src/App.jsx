import { Routes, Route } from "react-router-dom";

import MealsComponent from "./pages/Melas";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Details from "./pages/Details";
import Drinks from "./pages/Drinks";
import Cart from "./pages/cart";

import Dashboard from "./pages/dashbroad";
import Addfood from "./pages/Addfood";
import Adddrink from "./pages/Adddrink";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import GetOrders from "./pages/GetOrders";

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected pages */}
        <Route element={<ProtectedRoute />}>

          <Route path="/details" element={<Details />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/meals" element={<MealsComponent />} />

          {/* Dashboard Parent */}
          <Route path="/dashboard" element={<Dashboard />}>

            {/* Dashboard children */}
            <Route path="addfood" element={<Addfood />} />
            <Route path="add-drink" element={<Adddrink />} />
            <Route path="orders" element={<GetOrders />} />
            <Route path="profile" element={<Profile />} />

          </Route>

        </Route>

      </Routes>
    </div>
  );
};

export default App;