import express from "express";
import {
  register,
  login,
  setavatar,
  allusers,
} from "../controller/usercontroller.js";
const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/setavatar/:id", setavatar);
route.get("/allusers/:id", allusers);
export default route;
