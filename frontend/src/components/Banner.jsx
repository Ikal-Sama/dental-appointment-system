import { Link } from "react-router-dom";
import BannerImage from "../assets/images/banner2.jpg";
import { IoIosArrowRoundForward } from "react-icons/io";

const Banner = () => {
  return (
    <div
      style={{ backgroundImage: `url(${BannerImage})` }}
      className="bg-cover h-[35rem] w-full"
      id="home"
    >
      <div className="bg-black/40 h-full">
        <div className="flex gap-[10rem] px-10  py-[8rem] ">
          <div className="w-1/2 ">
            <p className="text-xl text-zinc-200 font-semibold">
              Welcome to Medi<span className="text-sky-500">Care</span>
            </p>
            <h1 className="text-4xl text-zinc-200 font-semibold my-2 w-[40rem]">
              Quality and Healthy Checkup For Your Family
            </h1>
            <p className="text-zinc-200 text-md w-[40rem] my-2">
              Doidunt eget semper nec ruam sea hendrerit morbi aeu feliseao
              augue pellentesue consectetur veniam morbi acer.
            </p>
            <Link to="/booking">
              <button className="bg-sky-500 py-2 px-4 text-white rounded-md my-5 font-medium flex items-center gap-3 hover:bg-sky-700 duration-300">
                Book an Appointment <IoIosArrowRoundForward size={30} />
              </button>
            </Link>
          </div>
          <div className="w-1/2 ">
            <div className="bg-sky-600 text-zinc-100 px-4 py-2 rounded">
              <p className="text-2xl">Opening Hours</p>
              <div className="flex justify-between items-center my-3 border-b pb-4 border-zinc-400 ">
                <p>Monday - Thursday</p>
                <span>8:00 am - 5:00 pm</span>
              </div>
              <div className="flex justify-between items-center my-3 border-b pb-4 border-zinc-400 ">
                <p>Friday</p>
                <span>8:00 am - 3:00 pm</span>
              </div>
              <div className="flex justify-between items-center my-3 border-b pb-4 border-zinc-400 ">
                <p>Saturday</p>
                <span>8:00 am - 3:00 pm</span>
              </div>
              <div className="flex justify-between items-center my-3 border-b pb-4 border-zinc-400 ">
                <p>Sunday</p>
                <span>Close</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
