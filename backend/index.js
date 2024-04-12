// packges
import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";

// utiles
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/booking", bookingRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  //   socket.on("send_message", (data) => {
  //     console.log(data);
  //   });

  socket.on("appointment_created", (appointment) => {
    // Emit the "new_appointment" event to the admin client
    io.emit("new_appointment", appointment);
  });
});

server.listen(port, () => console.log(`Server is running on PORT: ${port}`));
