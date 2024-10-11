import express from "express";
import {bookRooms, getAllBookings, getMyBookings
} from "../controller/bookingController.js";
import { isUserAuthenticated, isAdminAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

router.post("/bookRooms", isUserAuthenticated, bookRooms);
router.get("/getAllBookings", isAdminAuthenticated, getAllBookings);
router.get("/getMyBookings", isUserAuthenticated, getMyBookings);

export default router;
