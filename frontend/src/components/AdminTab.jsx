import { useState } from "react";
import { useGetAllAppointmentsQuery } from "../redux/api/appointmentApiSlice";
import Loader from "./Loader";
import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { isPending } from "@reduxjs/toolkit";

const HistoryTab = ({ userInfo, markAsDoneHandler }) => {
  const { data: bookings, isLoading } = useGetAllAppointmentsQuery();
  console.log(bookings);
  const [activeTab, setActiveTab] = useState(1);
  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col">
      <section className=" flex bg-zinc-700 rounded-md text-center text-white w-[15rem]">
        <div
          className={`flex-1 p-2 cursor-pointer text-sm hover:bg-sky-500 rounded-md duration-300 ${
            activeTab === 1 ? "font-bold bg-sky-400" : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          All
        </div>
        <div
          className={`flex-1 p-2 cursor-pointer text-sm hover:bg-sky-500 rounded-md duration-300 ${
            activeTab === 2 ? "font-bold bg-sky-400" : ""
          }`}
          onClick={() => handleTabClick(2)}
        >
          Accepted
        </div>
        <div
          className={`flex-1 p-2 cursor-pointer text-sm hover:bg-sky-500 rounded-md duration-300 ${
            activeTab === 3 ? "font-bold bg-sky-400" : ""
          }`}
          onClick={() => handleTabClick(3)}
        >
          Done
        </div>
      </section>

      {/* Second part */}
      <section>
        {activeTab === 1 && (
          <div>
            {bookings && bookings.length > 0 && (
              <div className="overflow-x-auto mt-5">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Full Name</th>
                      <th>Mobile</th>
                      <th>Method</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(
                      (appoint, index) =>
                        appoint.isPending === false && (
                          <tr key={appoint._id}>
                            <td>{index + 1}</td>
                            <td>{appoint.fullname}</td>
                            <td>{appoint.mobile}</td>
                            <td>{appoint.method}</td>
                            <td>{appoint.appointDate.substring(0, 10)}</td>
                            <td>
                              {appoint.isMarkedDone ? (
                                <span className="bg-green-400 p-1 px-2 text-white font-medium rounded-full">
                                  Done
                                </span>
                              ) : (
                                <span className="p-1 px-2 text-zinc-700 font-medium rounded-full">
                                  Not yet done...
                                </span>
                              )}
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </section>

      <section>
        {activeTab === 2 && (
          <div>
            {bookings && bookings.length > 0 && (
              <div className="overflow-x-auto mt-5">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Full Name</th>
                      <th>Mobile</th>
                      <th>Method</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(
                      (appoint, index) =>
                        appoint.isPending === false &&
                        appoint.isMarkedDone === false && (
                          <tr key={appoint._id}>
                            <td>{index + 1}</td>
                            <td>{appoint.fullname}</td>
                            <td>{appoint.mobile}</td>
                            <td>{appoint.method}</td>
                            <td>{appoint.appointDate.substring(0, 10)}</td>
                            <td>
                              {appoint.isMarkedDone ? (
                                <span className="bg-green-400 p-1 px-2 text-white font-medium rounded-full">
                                  Done
                                </span>
                              ) : (
                                <span className="p-1 px-2 text-zinc-700 font-medium rounded-full">
                                  Not yet done...
                                </span>
                              )}
                            </td>
                            <td>
                              <button
                                onClick={() => markAsDoneHandler(appoint._id)}
                                className="btn btn-xs bg-green-400"
                              >
                                mark as done
                              </button>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </section>

      <section>
        {activeTab === 3 && (
          <div>
            {bookings && bookings.length > 0 && (
              <div className="overflow-x-auto mt-5">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Method</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(
                      (appoint) =>
                        appoint.isMarkedDone === true && (
                          <tr>
                            <td>{appoint._id}</td>
                            <td>{appoint.method}</td>
                            <td>{appoint.appointDate.substring(0, 10)}</td>
                            <td>
                              {appoint.isMarkedDone === true ? (
                                <span className=" p-1 px-2 text-green-500 font-medium rounded-full ">
                                  Done
                                </span>
                              ) : (
                                <span className=" p-1 px-2 text-zinc-700 font-medium rounded-full ">
                                  Not yet done...
                                </span>
                              )}
                            </td>
                            <th>
                              {appoint.isMarkedDone === true ? (
                                <button className="btn text-red-400 btn-xs">
                                  <FaTrash />
                                </button>
                              ) : (
                                ""
                              )}
                            </th>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default HistoryTab;
