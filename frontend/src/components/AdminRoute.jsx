import { Navigate } from "react-router-dom";
import storeUser from "../zustand/user";

const AdminRoute = ({ children }) => {
  const { user } = storeUser();

  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
