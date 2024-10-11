import moment from 'moment';
import { Room } from "../models/roomSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Booking } from "../models/bookingSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const bookRooms = catchAsyncErrors(async (req, res, next) => {
  const {
    id
  } = req.user;

  const { dates, roomType, addOns } = req.body;

  if (!dates || !Array.isArray(dates) || dates.length === 0) {
    return next(new ErrorHandler("Please provide a valid array of dates!", 400));
  }

  const today = moment().startOf('day');

  const indices = []; 

  for (const date of dates) {
    const dayDifference = moment(date).startOf('day').diff(today, 'days');
    if (dayDifference >= 0 && dayDifference < 30) {
      indices.push(dayDifference); 
    }
  }

  const invalidDate = dates.find((date) => {
    const dayDifference = moment(date).startOf('day').diff(today, 'days');
    return dayDifference < 0 || dayDifference >= 30;
  });
  if (invalidDate) {
    return next(new ErrorHandler("All dates should be within the next 30 days!", 400));
  }

  const availableRooms=Object.entries(await Room.checkAvailability(indices, roomType));
  
  if(availableRooms.length == 0) {
    return res.status(201).json({
      success: true,
      message: "No Rooms available for given Date"
      
    });
  }

  const roomid = availableRooms[0][1]._id;

  const newBooking = await Booking.create({
    userid: id,
    roomid,
    addOns,
    bookingDates: dates
  });

  Room.updateAvailability(indices, roomid);
  
  res.status(201).json({
    success: true,
    message: "Booking Successful",
    bookedRoom: newBooking
  });
});

export const getAllBookings = catchAsyncErrors(async (req, res, next) => {

  const allBookings = await Booking.find();

  res.status(201).json({
    success: true,
    message: "All Bookings!",
    bookings : allBookings
  });
});

export const getMyBookings = catchAsyncErrors(async (req, res, next) => {
  const {
    id
  } = req.user;
  
  const bookings = await Booking.find({userid : id});

  res.status(201).json({
    success: true,
    message: "All My Bookings!",
    bookings : bookings
  });
});




