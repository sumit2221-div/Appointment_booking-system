import { RegisterUser, LoginUser } from "../controller/Auth.controller.js";
import express from "express";



const route = express.Router();

route.post("/register", RegisterUser);
route.post("/login", LoginUser);

export default route;
