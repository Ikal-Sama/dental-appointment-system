import Img1 from "../../assets/images/img3.jpg";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCreateAppointmentMutation } from "../../redux/api/appointmentApiSlice";
import { setAppointment } from "../../redux/features/booking/appointmentSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
// import io from "socket.io-client";

// const socket = io.connect("http://localhost:5000");

const Booking = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState("");
  const [date, setDate] = useState("");
  const [mobile, setMobile] = useState("");

  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();

  const dispatch = useDispatch();

  const appointHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createAppointment({
        fullname,
        email,
        method,
        appointDate: date,
        mobile,
      }).unwrap();
      dispatch(setAppointment(res));
      toast.success("Appointment Created Succesfully");
      // socket.emit("appointment_created", res);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex gap-10 bg-sky-400">
        <div className="w-1/2">
          <img src={Img1} alt="" className="object-cover h-full" />
        </div>
        <div className="w-1/2 text-zinc-100">
          <div className="py-10">
            <p className="text-lg">Book With Us Now</p>
            <div className="border-b-[2px] mt-2 w-[30px] border-sky-100"></div>
            <div className="my-5">
              <h1 className="text-2xl">Get an Appointment</h1>
              <p className="w-[30rem]">
                You can only book an appointment once if your appointment is
                already done you can book again, if you already created an
                appointment wait for the admin to accept your appointment
              </p>
            </div>
            <div>
              <form onSubmit={appointHandler} className="w-full">
                <div className="flex gap-5">
                  <input
                    type="text"
                    placeholder="Your Full Name:"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="bg-sky-50 px-2 py-3 text-sm outline-none text-zinc-700 rounded w-[15rem]"
                  />
                  <input
                    type="email"
                    placeholder="Email Address:"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-sky-50 px-2 py-3 text-sm outline-none text-zinc-700 rounded w-[15rem]"
                  />
                </div>
                <div className="flex gap-5 my-5">
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    required
                    className="text-zinc-700  bg-sky-50  text-sm rounded px-2 py-3 w-[31.3rem]"
                  >
                    <option value="" className="text-zinc-700">
                      Choose Your Appointment Method
                    </option>
                    <option value="wisdom tooth">Removing Wisdom tooth</option>
                    <option value="dental cleaning">Dental Cleaning</option>
                    <option value="pasta install">Pasta</option>
                  </select>
                </div>
                <div className="flex gap-5 my-5">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="bg-sky-50 px-2 py-3 text-sm outline-none text-zinc-700 rounded w-[15rem]"
                  />
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    placeholder="Phone Number:"
                    className="bg-sky-50 px-2 py-3 text-sm outline-none text-zinc-700 rounded w-[15rem]"
                  />
                </div>
                <button
                  disabled={isLoading}
                  className="px-[10.7rem] py-3 rounded bg-blue-500 text-white font-medium hover:bg-blue-700 duration-300"
                >
                  {isLoading ? "Creating..." : "Make an Appointment"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
