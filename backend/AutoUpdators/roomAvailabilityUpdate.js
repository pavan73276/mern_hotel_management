import cron from "node-cron";
import { Room } from "../models/roomSchema.js";
import { currentStay } from "../models/currentStaySchema.js";

export const updateRoomAvailability = () => {
  cron.schedule("0 0 * * *", async () => {
    try {

      const rooms = await Room.find();

      for (const room of rooms) {
        if (Array.isArray(room.availability)) {

          room.availability.shift(); 
          room.availability.push(true);
          
          await room.save();
        }
      }

      console.log("Room availability updated successfully.");
    } catch (error) {
      console.error("Error in autoUpdator updating room availability:", error);
      return next(console.log(error || "Some error in cron"));
    }
  });
};
