import Banner from "../components/Banner";
import OffersCard from "../components/OffersCard";
import Img1 from "../assets/images/img1.png";
import Img2 from "../assets/images/img2.jpg";

import { HiCheck } from "react-icons/hi2";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="my-[7rem]">
        <h1
          className="text-center text-2xl my-10 text-sky-500 font-semibold"
          id="services"
        >
          What we Offer
        </h1>
        <OffersCard />
      </div>

      {/* About Us */}
      <section
        className="max-w-screen-xl mx-auto px-[7rem] my-20  py-10 z-10"
        id="about"
      >
        <div className="flex gap-10">
          <div className="w-1/2">
            <div className="flex gap-5 relative">
              <img
                src={Img1}
                alt=""
                className="w-[18rem] h-[25rem] absolute left-[13rem]  object-cover mt-20"
              />
              <img
                src={Img2}
                alt=""
                className="w-[20rem] h-[28rem] object-cover"
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="">
              <h1 className="text-xl">
                Welcome to Medi<span className="text-sky-500">Care</span>
              </h1>
              <div className="border-b-[2px] mt-2 w-[30px] border-sky-500"></div>
              <div className="my-10">
                <h1 className="text-3xl font-medium text-zinc-700">
                  A Better Life Starts with a Better Health
                </h1>
                <p className="my-3 text-zinc-700">
                  Quis nostrud exercitation ullamco laboris nisi aut aliquio
                  modo consequat ruis aute irure dolor in reprehenderit in
                  voluptate velit esse cillum fugiat dolore.
                </p>

                <div className="my-10 text-zinc-700">
                  <div className="flex gap-5 items-center">
                    <div className="border rounded-full p-2 text-sky-500">
                      <HiCheck size={20} />
                    </div>
                    <p>
                      Medicare is a people centered environment – which means
                      you are at the center of everything we do and every
                      decision we make.
                    </p>
                  </div>
                  <div className="flex gap-5 items-center my-3">
                    <div className="border rounded-full p-2 text-sky-500">
                      <HiCheck size={20} />
                    </div>
                    <p>
                      We are your partner for health, helping your live well by
                      bringing the best in medicine and healthcare to your door.
                    </p>
                  </div>
                  <div className="flex gap-5 items-center">
                    <div className="border rounded-full p-2 text-sky-500">
                      <HiCheck size={20} />
                    </div>
                    <p>
                      We provide fast, effective and affordable immediate care
                      for non-life threatening illnesses. Most patients are
                      seen, treated and released in about 60 minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
