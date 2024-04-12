import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    isPending: {
      type: Boolean,
      default: true,
    },
    isMarkedDone: {
      type: Boolean,
      default: false,
    },
    appointDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
