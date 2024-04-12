import { FaDoorOpen } from "react-icons/fa";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io.connect("http://localhost:5000");

const AdminNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [notificationCount, setNotificationCount] = useState(0);
  // const [notifications, setNotifications] = useState([]);

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

  // Update local storage whenever notificationCount or notifications change
  // useEffect(() => {
  //   localStorage.setItem("notificationCount", notificationCount.toString());
  // }, [notificationCount]);

  // useEffect(() => {
  //   localStorage.setItem("notifications", JSON.stringify(notifications));
  // }, [notifications]);

  return (
    <div className="w-full py-4 px-10 border-b">
      <div className="flex justify-end gap-2 ">
        {/* Display the alert icon and the number of notifications */}

        <div
          onClick={logoutHandler}
          className="flex gap-2 items-center hover:text-sky-500 cursor-pointer duration-300"
        >
          <FaDoorOpen size={20} /> Sign out
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
