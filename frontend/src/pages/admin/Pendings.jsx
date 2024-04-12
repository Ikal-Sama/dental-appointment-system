import {
  useGetAllAppointmentsQuery,
  useAcceptAppointmentMutation,
} from "../../redux/api/appointmentApiSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Message from "../../components/Message";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const Pendings = () => {
  const {
    data: bookings,
    refetch,
    isLoading,
    error,
  } = useGetAllAppointmentsQuery();
  console.log(bookings);
  const [acceptAppointment] = useAcceptAppointmentMutation();

  const acceptHandler = async (id) => {
    try {
      toast.success("Appointment accepted!");
      await acceptAppointment(id);
      refetch();
      socket.emit("appointment_created", id);
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  return (
    <div className="max-w-screen-lg px-5 py-8">
      <h1 className="text-xl font-semibold">General/Pendings</h1>
      <div className="mt-5">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : error ? (
          <Message variant="danger">
            {error?.data.message || error.message}
          </Message>
        ) : (
          <div>
            {bookings && bookings.length > 0 && (
              <div className="overflow-x-auto mt-5">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>FullName</th>
                      <th>Mobile</th>
                      <th>Method</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(
                      (appoint) =>
                        appoint.isPending === true && (
                          <tr>
                            <td>{appoint._id}</td>
                            <td>{appoint.fullname}</td>
                            <td>{appoint.mobile}</td>
                            <td>{appoint.method}</td>
                            <td>{appoint.appointDate?.substring(0, 10)}</td>
                            <td>
                              {appoint.isPending === true ? (
                                <span className="bg-red-400 p-1 px-2 text-white font-medium rounded-full ">
                                  Pending
                                </span>
                              ) : (
                                <span className="bg-green-400 p-1 px-2 text-white font-medium rounded-full ">
                                  Accepted
                                </span>
                              )}
                            </td>
                            <th>
                              <button
                                onClick={() => acceptHandler(appoint._id)}
                                className="btn hover:bg-green-400 hover:text-white btn-xs"
                              >
                                Accept
                              </button>
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
      </div>
    </div>
  );
};

export default Pendings;
