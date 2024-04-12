import { FaUser } from "react-icons/fa6";
import { SiBookstack } from "react-icons/si";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import HistoryTab from "../../components/HistoryTab";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setMobile(userInfo.mobile);
  }, [userInfo.email, userInfo.name, userInfo.mobile]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to update?")) {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
      } else {
        try {
          const res = await updateProfile({
            _id: userInfo._id,
            name,
            email,
            mobile,
            password,
          }).unwrap();
          dispatch(setCredentials({ ...res }));
          toast.success("Profile updated successfully!");
        } catch (error) {
          toast.error(error?.data?.message || error.message);
        }
      }
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-10 py-10">
      <div>
        <h1 className="text-zinc-700 font-medium flex items-center gap-2">
          {" "}
          <FaUser /> MY ACCOUNT
        </h1>
        <div className="my-10 text-zinc-600 border-b pb-5 border-zinc-500">
          <div className="flex gap-3 items-center text-xl">
            <span>Name:</span>
            <h1 className="">{userInfo.name}</h1>
          </div>
          <div className="flex gap-3 items-center text-xl my-3">
            <span>Email:</span>
            <h1 className="">{userInfo.email}</h1>
          </div>
          <div className="flex gap-3 items-center text-xl">
            <span>Mobile Number:</span>
            <h1 className="">{userInfo.mobile}</h1>
          </div>
          <button
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="my-5 bg-sky-500 px-8 py-2 text-white rounded hover:bg-sky-600 duration-300"
          >
            Update
          </button>

          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg my-5">Update Acount</h3>
              <form onSubmit={submitHandler} method="dialog">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-10 px-2 border w-full"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 px-2 border mt-5 w-full"
                  />
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="h-10 px-2 border mt-5 w-full"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 px-2 border mt-5 w-full"
                  />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-10 px-2 border mt-5 w-full"
                  />
                </div>
                {/* if there is a button in form, it will close the modal */}
                <button
                  type="button"
                  onClick={() => document.getElementById("my_modal_3").close()}
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                  ✕
                </button>
                <button className="btn my-3 bg-sky-500 text-white">
                  Update
                </button>
              </form>
            </div>
          </dialog>
        </div>
        <div>
          <h1 className="text-zinc-700 font-medium flex items-center gap-2">
            {" "}
            <SiBookstack /> MY APPOINTMENT HISTORY
          </h1>
          <div className="mt-5">
            <HistoryTab userInfo={userInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
