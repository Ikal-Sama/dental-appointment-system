import Img1 from "../../assets/images/img3.jpg";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      toast.error(error?.data.message || error.message);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto  px-10 mt-[5rem] ">
      <div className="flex gap-[8rem] ">
        <div className="w-1/2 px-10">
          <div className="mt-10">
            <h1 className="text-xl text-zinc-700">Sign in with your account</h1>
            <div className="border mt-2 border-sky-500 w-[10rem]"></div>
            <form onSubmit={submitHandler} className="mt-10">
              <div className="flex flex-col mt-5">
                <input
                  type="email"
                  className="border border-zinc-600 h-11  px-2 focus:outline-sky-500"
                  placeholder="Enter email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col mt-5">
                <input
                  type="password"
                  className="border border-zinc-600 h-11  px-2 focus:outline-sky-500"
                  placeholder="Enter Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                disabled={isLoading}
                className="my-5 bg-sky-500 w-full py-2 text-white font-medium hover:bg-sky-600 duration-300"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
              <p className="mb-10">
                Don't have an account?
                <Link to="/register" className="underline hover:text-sky-500">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className="w-1/2">
          <img src={Img1} alt="" className="w-[37rem] h-[35rem] object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Login;
