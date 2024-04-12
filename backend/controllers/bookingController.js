import Booking from "../models/bookingModel.js";

const createAppointment = async (req, res) => {
  try {
    const { fullname, email, mobile, method, appointDate } = req.body;
    const alreadyAppointed = await Booking.find({
      user: req.user._id,
      isMarkedDone: false,
    });
    if (alreadyAppointed.length > 0) {
      res.status(400).json({ message: "You already have an apointment" });
    } else {
      const appoint = new Booking({
        user: req.user._id,
        fullname,
        email,
        mobile,
        method,
        appointDate,
        isPending: true,
      });
      await appoint.save();
      res.status(201).json(appoint);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCurrentUserAppointment = async (req, res) => {
  try {
    const appointments = await Booking.find({ user: req.user._id });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const allAppointments = await Booking.find({}).populate("user", "id, name");
    res.json(allAppointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const accpetAppointment = async (req, res) => {
  try {
    const alreayFiveAppointed = await Booking.countDocuments({
      isPending: false,
    });
    if (alreayFiveAppointed.length >= 5) {
      res.status(400);
      throw new Error("You already have 5 appointment scheduled");
    } else {
      const acceptAppointment = await Booking.findById(req.params.id);
      if (acceptAppointment) {
        acceptAppointment.isPending = false;
        await acceptAppointment.save();
        res.json({ message: "Appointment accepted!" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markDoneAppointment = async (req, res) => {
  try {
    const findappointment = await Booking.findById(req.params.id);
    if (findappointment) {
      findappointment.isMarkedDone = true;
      await findappointment.save();
      res.json({ message: "Appointment is marked done" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAppointments = async (req, res) => {
  try {
    const appointment = await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createAppointment,
  getCurrentUserAppointment,
  getAllAppointments,
  accpetAppointment,
  deleteAppointments,
  markDoneAppointment,
};
