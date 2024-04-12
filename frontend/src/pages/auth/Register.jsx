import Img2 from "../../assets/images/img2.jpg";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, mobile, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (error) {
        console.log(error);
        toast.error(error.data.message);
      }
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto  px-10 mt-[5rem] ">
      <div className="flex gap-[8rem] ">
        <div className="w-1/2 px-10">
          <div className="mt-10">
            <h1 className="text-xl text-zinc-700">Create your account </h1>
            <div className="border mt-2 border-sky-500 w-[10rem]"></div>
            <form onSubmit={submitHandler} className="mt-10">
              <div className="flex flex-col">
                <input
                  type="text"
                  className="border border-zinc-600 h-11  px-2 focus:outline-sky-500"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-5">
                <input
                  type="email"
                  className="border border-zinc-600 h-11  px-2 focus:outline-sky-500"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-5">
                <input
                  type="text"
                  className="border border-zinc-600 h-11  px-2 focus:outline-sky-500"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-5">
                <input
                  type="password"
                  className="border border-zinc-600 h-11  px-2 focus:outline-sky-500"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-5">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border border-zinc-600 h-11  px-2 focus:outline-sky-500"
                  placeholder="Confirm Password"
                />
              </div>
              {isLoading && <Loader />}
              <button
                disabled={isLoading}
                className="my-5 bg-sky-500 w-full py-2 text-white font-medium hover:bg-sky-600 duration-300"
              >
                {isLoading ? "Signing up..." : "Sign up"}
              </button>

              <p className="mb-10">
                Already have an account?
                <Link to="/login" className="underline hover:text-sky-500">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className="w-1/2">
          <img src={Img2} alt="" className="w-[37rem] h-[35rem] object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Register;
