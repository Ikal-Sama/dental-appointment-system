import { apiSlice } from "./apiSlice";
import { BASE_URL, BOOKING_URL } from "../constants";

export const appointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAppointment: builder.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    getUsersAppointment: builder.query({
      query: () => ({
        url: `${BOOKING_URL}/mine`,
      }),
    }),

    getAllAppointments: builder.query({
      query: () => ({
        url: BOOKING_URL,
      }),
    }),

    acceptAppointment: builder.mutation({
      query: (id, data) => ({
        url: `${BOOKING_URL}/${id}/accept`,
        method: "PUT",
        body: data,
      }),
    }),

    markDoneAppointment: builder.mutation({
      query: (id, data) => ({
        url: `${BOOKING_URL}/${id}/markdone`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useGetUsersAppointmentQuery,
  useGetAllAppointmentsQuery,
  useAcceptAppointmentMutation,
  useMarkDoneAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentApiSlice;
