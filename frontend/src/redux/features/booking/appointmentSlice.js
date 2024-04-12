import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointment: localStorage.getItem("appointment")
    ? JSON.parse(localStorage.getItem("appointment"))
    : [],
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setAppointment: (state, action) => {
      state.appointment = action.payload;
      localStorage.setItem("appointment", JSON.stringify(action.payload));
    },
  },
});

export const { setAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
