import { Navigate, Outlet } from "react-router-dom";
import storeUser from "../zustand/user";

const ProtectedRoute = () => {
  const { user } = storeUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;