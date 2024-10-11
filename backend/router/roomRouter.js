import express from "express";
import {
  getAllRooms,
  addNewRoom,
  checkAvailbility,
  DeleteRoom
} from "../controller/roomController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getallrooms", isAdminAuthenticated, getAllRooms);
router.post("/addRoom", isAdminAuthenticated, addNewRoom);
router.post("/deleteRoom", isAdminAuthenticated, DeleteRoom);
router.get("/checkAvail", checkAvailbility);

export default router;
