import { Routes, Route } from "react-router-dom";

import MealsComponent from "./pages/Melas";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Details from "./pages/Details";
import Drinks from "./pages/Drinks";
import Cart from "./pages/cart";

import Dashbroad from "./pages/dashbroad";
import Addfood from "./pages/Addfood";
import Adddrink from "./pages/Adddrink";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import GetOrders from "./pages/GetOrders";
import GetProductById from "./pages/getProductById";
import GetDrinkById from "./pages/getDrinkById";
import Contactpage from "./pages/Contactpage";
import GetOrderByUser from "./pages/GetOrderByUser";
import UserDashboard from "./pages/UserDashboard";
import Allusers from "./pages/Allusers";
import UpdateUser from "./pages/UpdateUser";

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/contact" element={<Contactpage />} />


        {/* ================= PROTECTED ================= */}

        <Route element={<ProtectedRoute />}>

          <Route path="/details" element={<Details />} />

          <Route path="/drinks" element={<Drinks />} />

          <Route path="/drinks/:id" element={<GetDrinkById />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/meals" element={<MealsComponent />} />

          <Route path="/meals/:id" element={<GetProductById />} />


          {/* ================= ADMIN DASHBOARD ================= */}

          <Route path="/dashboard" element={<Dashbroad />}>

            <Route path="addfood" element={<Addfood />} />

            <Route path="add-drink" element={<Adddrink />} />

            <Route path="orders" element={<GetOrders />} />

            <Route path="users" element={<Allusers />} />

            <Route path="users/:id/update" element={<UpdateUser />} />

            <Route path="profile" element={<Profile />} />

          </Route>


          {/* ================= USER DASHBOARD ================= */}

          <Route path="/user-dashboard" element={<UserDashboard />}>

            <Route
              path="useorders"
              element={<GetOrderByUser />}
            />

            <Route
              path="profile"
              element={<Profile />}
            />

          </Route>

        </Route>

      </Routes>
    </div>
  );
};

export default App;
