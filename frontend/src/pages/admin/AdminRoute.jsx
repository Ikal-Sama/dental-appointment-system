import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminNavigation from "./AdminNavigation";
import AdminNav from "./AdminNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <div className="flex">
      <ToastContainer />
      <AdminNavigation />
      <div className="w-full">
        <AdminNav />
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
