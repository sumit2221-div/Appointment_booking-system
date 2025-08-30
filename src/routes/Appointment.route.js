import { BookAppointment,GetMyAppointment,CancelAppointment } from "../controller/Appointment.Controller.js";
import { VerifyToken,AuthorizeRoles} from "../middleware/auth.middleware.js";
import express from "express"

const route = express.Router();

route.post("/:availabilityId", VerifyToken, BookAppointment);

route.get("/", VerifyToken, AuthorizeRoles("student", "professor"), GetMyAppointment );

route.delete("/pro/:appointmentId", VerifyToken, AuthorizeRoles("professor"),CancelAppointment);

export default route;