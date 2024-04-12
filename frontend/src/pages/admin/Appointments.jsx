import {
  useGetAllAppointmentsQuery,
  useMarkDoneAppointmentMutation,
} from "../../redux/api/appointmentApiSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Message from "../../components/Message";
import AdminTab from "../../components/AdminTab";

const Appointments = () => {
  const {
    data: bookings,
    refetch,
    isLoading,
    error,
  } = useGetAllAppointmentsQuery();
  const [markDone] = useMarkDoneAppointmentMutation();

  const markAsDoneHandler = async (id) => {
    try {
      toast.success("Appointment Done!");
      await markDone(id);
      refetch();
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
            <AdminTab
              markAsDoneHandler={markAsDoneHandler}
              bookings={bookings}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
