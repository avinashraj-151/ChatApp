import express from "express";
import { addMsg, getAllmsg } from "../controller/messagecontroller.js";
const route = express.Router();

route.post("/addmsg", addMsg);
route.post("/getmessgae", getAllmsg);

export default route;
