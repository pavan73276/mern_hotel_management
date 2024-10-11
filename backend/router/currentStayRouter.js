import express from "express";
import {checkIn, checkOut
} from "../controller/currentStayController.js";
import {isStaffAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

router.post("/checkIn", isStaffAuthenticated, checkIn);
router.post("/checkOut", isStaffAuthenticated, checkOut);


export default router;
