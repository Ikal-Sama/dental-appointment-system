import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { FaBookOpenReader } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AdminNavigation = () => {
  const location = useLocation();

  const handleLinkClick = (path) => {
    setActivePath(path);
  };
  return (
    <div className="h-screen bg-zinc-600 text-zinc-100 p-4 w-[15rem]">
      <div>
        <Link to="/">
          <h1 className="text-2xl text-center">
            Medi<span className="text-sky-500">Care</span>
          </h1>
        </Link>
        <div className="my-10">
          <p className="bg-zinc-700 w-[5rem] text-center py-1 rounded-md mb-3 text-sm text-zinc-300">
            General
          </p>
          <ul>
            <Link to="/admin/dashboard">
              <li
                className={`font-medium flex items-center gap-2 my-2 px-3 py-2 hover:bg-zinc-700 duration-300 ${
                  location.pathname === "/admin/dashboard" ? "bg-zinc-700" : ""
                }`}
              >
                <RxDashboard />
                Dashboard
              </li>
            </Link>
            <Link to="/admin/pendings">
              <li
                className={`font-medium flex items-center gap-2 my-2 px-3 py-2 hover:bg-zinc-700 duration-300 ${
                  location.pathname === "/admin/pendings" ? "bg-zinc-700" : ""
                }`}
              >
                <MdPending />
                Pendings
              </li>
            </Link>
          </ul>

          <p className="bg-zinc-700 w-[5rem] text-center py-1 rounded-md mb-3 text-sm text-zinc-300 mt-10">
            Manage
          </p>
          <ul>
            <Link to="/admin/userlist">
              <li
                className={`font-medium flex items-center gap-2 my-2 px-3 py-2 hover:bg-zinc-700 duration-300 ${
                  location.pathname === "/admin/userlist" ? "bg-zinc-700" : ""
                }`}
              >
                <FaUsers />
                Users
              </li>
            </Link>
            <Link to="/admin/appointments">
              <li
                className={`font-medium flex items-center gap-2 my-2 px-3 py-2 hover:bg-zinc-700 duration-300 ${
                  location.pathname === "/admin/appointments"
                    ? "bg-zinc-700"
                    : ""
                }`}
              >
                <FaBookOpenReader />
                Appointments
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminNavigation;
