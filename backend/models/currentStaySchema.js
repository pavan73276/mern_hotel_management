import mongoose from "mongoose";

const currentStaySchema = new mongoose.Schema({
  roomid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: [true, "Room id is required!"]
  },
  bookingid: {
    type: String,
    default: ""
  },
  checkIn: {
    type: Boolean,
    default: false, // Default value for the addOns object
  },
  checkOut: {
    type: String,
    default: ""
  }
});



export const currentStay = mongoose.model("currentStay", currentStaySchema);
