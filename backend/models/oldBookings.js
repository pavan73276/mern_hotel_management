import mongoose from "mongoose";

const oldBookingSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required!"]
  },
  roomid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: [true, "User id is required!"]
  },
  addOns: {
    type: {
      food: { type: Boolean, default: false },
      swimming: { type: Boolean, default: false },
      gym: { type: Boolean, default: false },
    },
    default: {}, // Default value for the addOns object
  },
  bookingDates: {
    type: [String],
    default: []
  }
});

export const oldBooking = mongoose.model("oldBooking", oldBookingSchema);
