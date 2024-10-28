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
  const dateOnly = today.toLocaleDateString('en-CA'); 

  const newStay = await Booking.searchBooking(stay.roomid, dateOnly);
  
  var msg;
  if(!newStay){
    stay.bookingid="";
    msg="No current stay";

    Room.updateAvailabilityBookingEnds([0], stay.roomid);
  }
  else{
    stay.bookingid= newStay._id;
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

export const allStays = catchAsyncErrors(async (req, res, next) => {

  const stays = await currentStay.find();

  if (!stays) {
    throw new Error("No Stays found", 400);
  }

  res.status(201).json({
    success: true,
    message: "Success!",
    stays,
  });
});

export const filter = catchAsyncErrors(async (req, res, next) => {

  const { food, swimming, gym } = req.body;

  let bookingIds = await currentStay.find({ bookingid: { $ne: "" } }, { bookingid: 1 });
  
  if (!bookingIds || bookingIds.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No current stays found"
    });
  }
  
  let query = {};
  let conditions = [];
  
  if (food) conditions.push({ "addOns.food": true });
  
  if (swimming) conditions.push({ "addOns.swimming": true });
  
  if (gym) conditions.push({ "addOns.gym": true });
  
  if (conditions.length === 1) {
    query = conditions[0];
  }
  
  if (conditions.length > 1) {
    query = { $and: conditions };
  }
  
  query["_id"] = { $in: bookingIds.map(b => b.bookingid) };
  
  const stays = await Booking.find(query);
  
  if (!stays || stays.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No stays found matching the criteria"
    });
  }

  res.status(201).json({
    success: true,
    message: "Stays found success",
    stays : stays
  });
});
