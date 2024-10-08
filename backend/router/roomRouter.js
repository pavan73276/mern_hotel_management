import express from "express";
import {
  addNewRoom,
  checkAvailbility
} from "../controller/roomController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";
// import {
//   isUserAuthenticated,
// } from "../middlewares/auth.js";

const router = express.Router();

router.post("/addRoom", isAdminAuthenticated, addNewRoom);
router.get("/checkAvail", checkAvailbility);

export default router;
