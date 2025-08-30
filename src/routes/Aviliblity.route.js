import { AddAvailability,GetAvailability } from "../controller/Avilibality.controller.js";
import { VerifyToken,AuthorizeRoles } from "../middleware/auth.middleware.js";
import express from "express"

const route = express.Router();

route.post("/",VerifyToken, AuthorizeRoles("professor"), AddAvailability);

route.get("/:professorId" ,VerifyToken,AuthorizeRoles("student"), GetAvailability);

export default route;