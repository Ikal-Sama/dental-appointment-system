import express from "express";
import {
  createAppointment,
  getCurrentUserAppointment,
  getAllAppointments,
  accpetAppointment,
  deleteAppointments,
  markDoneAppointment,
} from "../controllers/bookingController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, createAppointment)
  .get(authenticate, authorizeAdmin, getAllAppointments);

router.route("/mine").get(authenticate, getCurrentUserAppointment);

// ADMIN ROUTES
router
  .route("/:id/accept")
  .put(authenticate, authorizeAdmin, accpetAppointment);

router
  .route("/:id/markdone")
  .put(authenticate, authorizeAdmin, markDoneAppointment);

router.route("/:id").delete(authenticate, authorizeAdmin, deleteAppointments);

export default router;
