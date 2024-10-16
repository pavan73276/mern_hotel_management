import express from "express";
import {bookRooms, getAllBookings, getMyBookings, getMyCurrentBookings
} from "../controller/bookingController.js";
import { isUserAuthenticated, isAdminAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

router.post("/bookRooms", isUserAuthenticated, bookRooms);
router.get("/getAllBookings", isAdminAuthenticated, getAllBookings);
router.get("/getMyBookings", isUserAuthenticated, getMyBookings);
router.get("/getMyCurrentBookings", isUserAuthenticated, getMyCurrentBookings);

export default router;
