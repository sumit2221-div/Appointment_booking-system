import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/Database/database.js';
import AuthRoute from "./src/routes/Auth.route.js";
import AppointmentRoute from "./src/routes/Appointment.route.js";
import AvailabilityRoute from "./src/routes/Aviliblity.route.js"; 

dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());

// connect DB
connectDB();

// simple test route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// routes
app.use("/api/auth", AuthRoute);
app.use("/api/appointment", AppointmentRoute);
app.use("/api/availability", AvailabilityRoute);

export default app;
