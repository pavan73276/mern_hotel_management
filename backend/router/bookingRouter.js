import express from "express";
import {bookRooms, getAllBookings, getMyBookings, getMyCurrentBookings, payment
} from "../controller/bookingController.js";
import { isUserAuthenticated, isAdminAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

router.post("/bookRooms", isUserAuthenticated, bookRooms);
router.post("/payment", isUserAuthenticated, payment);
router.get("/getAllBookings", isAdminAuthenticated, getAllBookings);
router.get("/getMyBookings", isUserAuthenticated, getMyBookings);
router.get("/currentBookings", isUserAuthenticated, getMyCurrentBookings);

export default router;
