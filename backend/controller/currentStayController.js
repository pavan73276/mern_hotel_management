import moment from 'moment';
import { Room } from "../models/roomSchema.js";
import { currentStay } from "../models/currentStaySchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Booking } from "../models/bookingSchema.js";
import ErrorHandler from "../middlewares/error.js";


export const checkOut = catchAsyncErrors(async (req, res, next) => {

  const {bookingid} = req.body;
  const stay = await currentStay.findOne({bookingid});

  if (!stay) {
    throw new Error("No Room found with this bookingid", 400);
  }

  if (stay.checkOut != "toBeCheckedOut") {
    throw new Error("Cannot Check Out.", 400);
  }
  
  stay.checkOut="";
  stay.checkIn=false;

  const today = new Date();
  const dateOnly = today.toLocaleDateString('en-CA'); // Gives 'YYYY-MM-DD' in UTC
  console.log(dateOnly);  // Output: e.g., '2024-10-11' (in UTC)
  

  console.log(formattedDate);
  const newStay = await Booking.searchBooking(stay.roomid, isoDate);
  
  var msg;
  if(!newStay.bookingid){
    stay.bookingid="";
    msg="No current stay";
  }
  else{
    stay.bookingid= newStay.bookingid;
    msg="Current stay updated";
  }
  await stay.save();

  res.status(201).json({
    success: true,
    message: msg
  });
});

export const checkIn = catchAsyncErrors(async (req, res, next) => {

  const {bookingid} = req.body;
  const stay = await currentStay.findOne({bookingid});

  if (!stay) {
    throw new Error("No Room found with this bookingid", 400);
  }

  stay.checkIn=true;
  await stay.save();

  res.status(201).json({
    success: true,
    message: "Checked in successfully!"
  });
});
