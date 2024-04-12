import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FaDoorOpen } from "react-icons/fa";
import { useEffect, useState } from "react";

// import io from "socket.io-client";

// const socket = io.connect("http://localhost:5000");

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // const [notificationCount, setNotificationCount] = useState(0);
  // const [notifications, setNotifications] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // const handleDropdownOpen = () => {
  //   // Clear the notification count when the dropdown is clicked
  //   setNotificationCount(0);
  //   // Clear the notifications from local storage
  // };

  // useEffect(() => {
  //   // Retrieve the notification count and notifications from local storage on component mount
  //   const storedCount = localStorage.getItem("notificationCount");
  //   const storedNotifications = localStorage.getItem("notifications");
  //   if (storedCount) {
  //     setNotificationCount(parseInt(storedCount));
  //   }
  //   if (storedNotifications) {
  //     setNotifications(JSON.parse(storedNotifications));
  //   }

  //   // Listen for the "new_appointment" event from the server
  //   socket.on("new_appointment", (appointment) => {
  //     // Increment the notification count when a new appointment is created
  //     setNotificationCount((prevCount) => prevCount + 1);
  //     // Add the new appointment to the notifications list
  //     setNotifications((prevNotifications) => [
  //       ...prevNotifications,
  //       appointment,
  //     ]);
  //   });

  //   // Clean up the socket connection when the component unmounts
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // // Update local storage whenever notificationCount or notifications change
  // useEffect(() => {
  //   localStorage.setItem("notificationCount", notificationCount.toString());
  // }, [notificationCount]);

  // useEffect(() => {
  //   localStorage.setItem("notifications", JSON.stringify(notifications));
  // }, [notifications]);

  return (
    <div className="max-w-screen-xl mx-auto fixed top-0 left-0 right-0 bg-zinc-100 z-50">
      <div className="px-10 py-6">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/">
              <h1 className="text-2xl font-bold">
                Medi<strong className="text-sky-600">Care</strong>
              </h1>
            </Link>
          </div>
          <div>
            <ul className="flex items-center gap-10">
              {userInfo ? (
                <>
                  <Link to="/">
                    <li
                      onClick={() => scrollToSection("home")}
                      className="hover:border-b-2 hover:border-b-sky-500 duration-200 cursor-pointer"
                    >
                      Home
                    </li>
                  </Link>
                  <Link to="/">
                    <li
                      onClick={() => scrollToSection("about")}
                      className="hover:border-b-2 hover:border-b-sky-500 duration-200 cursor-pointer"
                    >
                      About
                    </li>
                  </Link>
                  <Link to="/">
                    <li
                      onClick={() => scrollToSection("services")}
                      className="hover:border-b-2 hover:border-b-sky-500 duration-200 cursor-pointer"
                    >
                      Services
                    </li>
                  </Link>
                  <li className="hover:border-b-2 hover:border-b-sky-500 duration-200">
                    Contact
                  </li>
                  <Link to="/profile">
                    <li className="hover:border-b-2 hover:border-b-sky-500 duration-200">
                      My Account
                    </li>
                  </Link>
                  {userInfo.isAdmin && (
                    <Link to="/admin/dashboard">
                      <li className="hover:border-b-2 hover:border-b-sky-500 duration-200">
                        Dashboard
                      </li>
                    </Link>
                  )}

                  <li>
                    <button
                      onClick={logoutHandler}
                      className=" flex items-center gap-2 px-2 text-zinc-700 hover:text-sky-500"
                    >
                      <FaDoorOpen /> Sign out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>Home</li>
                  <li>About</li>
                  <li>Services</li>
                  <li>Contact</li>
                  <li>
                    <Link to="/login">
                      <button className="bg-sky-500 py-2 px-4 text-white rounded-md hover:bg-sky-700 duration-300">
                        Sign in
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
