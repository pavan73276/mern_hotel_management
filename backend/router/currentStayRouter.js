import express from "express";
import {allStays, checkIn, checkOut, filter
} from "../controller/currentStayController.js";
import {isStaffAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

router.post("/checkIn", isStaffAuthenticated, checkIn);
router.post("/checkOut", isStaffAuthenticated, checkOut);
router.post("/filter", isStaffAuthenticated, filter);
router.get("/allstays", isStaffAuthenticated, allStays);

export default router;
