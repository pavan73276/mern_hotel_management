import cron from "node-cron";
import { Room } from "../models/roomSchema.js";
import { currentStay } from "../models/currentStaySchema.js";
import { Booking } from "../models/bookingSchema.js";
import { oldBooking } from "../models/oldBookingSchema.js";

export const updateOldBooking = () => {
  cron.schedule("0 0 * * *", async () => {
    try {

      const today = new Date();
      const dateOnly = today.toLocaleDateString('en-CA'); // Format as 'YYYY-MM-DD'

      const bookings = await Booking.find();
      for (const booking of bookings) {
        const lastDate = booking.bookingDates[booking.bookingDates.length - 1];

        const lastDateObj = new Date(lastDate);
        const dateOnlyObj = new Date(dateOnly);

        if (lastDateObj < dateOnlyObj) {

          await oldBooking.create({
            ...booking.toObject(),  // Copy all fields from the booking
            _id: booking._id        // Ensure the same _id is kept
          });
      
          await Booking.deleteOne({ _id: booking._id });
      
          console.log(`Last booking date (${lastDate}) is earlier than today (${dateOnly})`);
        }
      }

      console.log("Room availability updated successfully.");
    } catch (error) {
      console.error("Error in autoUpdator updating room availability:", error);
      return next(console.log(error || "Some error in cron"));
    }
  });
};
