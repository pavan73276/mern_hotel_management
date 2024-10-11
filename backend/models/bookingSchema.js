import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
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
    type: [Date],
    default: []
  }
});

bookingSchema.statics.searchBooking = async function (roomid, date) {
 
  if(!date){
    throw new Error("Date is required.", 400);
  }
  if(!roomid){
    throw new Error("Roomid is required.", 400);
  }

  console.log(date);
  const booking = await this.findOne({
    roomid: roomid,  
    bookingdates: { $elemMatch: { $eq: date } }  
  });

  if (!booking) {
    throw new Error("No stay found for the provided room ID and date.", 404);
  }

  return booking; 

};

export const Booking = mongoose.model("Booking", bookingSchema);
