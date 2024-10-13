import cron from "node-cron";
import { currentStay } from "../models/currentStaySchema.js";
import { Booking } from "../models/bookingSchema.js";

export const updateCurrentStay = () => {
  cron.schedule("*/1 * * * *", async () => {
    try {
      const today = new Date();
      const dateOnly = today.toLocaleDateString('en-CA'); 

      let emptyBookingIds = await currentStay.find({ bookingid: "" }, { roomid: 1 });

      if (emptyBookingIds.length === 0) {
        console.log("No current stays with empty booking IDs found.");
        return;
      }

      for (const stay of emptyBookingIds) {
        const roomId = stay.roomid;

        const booking = await Booking.findOne({
          roomid: roomId,               // Matching the room ID
          bookingDates: { $in: [dateOnly] }  // Check if today's date is in the bookingDates array
        });

        if (booking) {

          const updatedstay=await currentStay.findOne({roomid : roomId});

          updatedstay.bookingid=booking._id;
          
          await updatedstay.save();
        } 
      }
      console.log("Current Stay updated successfully.");
    } catch (error) {
      console.error("Error in autoUpdator updating currentStay", error);
    }
  });
};


export const updateCurrentStay2 = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const today = new Date();
      const dateOnly = today.toLocaleDateString('en-CA'); 

      let bookingIds = await currentStay.find({ bookingid: { $ne: "" } }, { bookingid: 1 });
      for(const bookingid of bookingIds){
        const booking=await Booking.findOne({_id: bookingid.bookingid});

        const isTodayBooked = booking.bookingDates.some(date => date === dateOnly);
        
        let message = "Today is also booked.";

        if (!isTodayBooked) {   
          const stay= await currentStay.findOne({bookingid}) ;
          stay.checkOut= "toBeCheckedOut";
          await stay.save();
          message = "To be Checked Out Today";
        }
      }

      console.log(message);
    } catch (error) {
      console.error("Error in autoUpdator updating currentStay:", error);
      return next(console.log(error || "Some error in cron"));
    }
  });
};
