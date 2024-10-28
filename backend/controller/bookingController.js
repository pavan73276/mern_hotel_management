import moment from "moment";
import { Room } from "../models/roomSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Booking } from "../models/bookingSchema.js";
import { oldBooking } from "../models/oldBookingSchema.js";
import ErrorHandler from "../middlewares/error.js";
import mongoose from "mongoose";
import stripe from "../stripe/stripeInstance.js"

export const bookRooms = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.user;

  const { dates, roomType, addOns, paymentIntentId, totalPrice, email } = req.body;

  if (!dates || !Array.isArray(dates) || dates.length === 0) {
    return next(
      new ErrorHandler("Please provide a valid array of dates!", 400)
    );
  }

  const today = new Date();
  const dateOnly = today.toLocaleDateString("en-CA");

  const indices = [];

  for (const date of dates) {
    const dayDifference = moment(date).startOf("day").diff(dateOnly, "days");
    if (dayDifference >= 0 && dayDifference < 30) {
      indices.push(dayDifference);
    }
  }

  const invalidDate = dates.find((date) => {
    const dayDifference = moment(date).startOf("day").diff(today, "days");
    return dayDifference < 0 || dayDifference >= 30;
  });
  if (invalidDate) {
    return next(
      new ErrorHandler("All dates should be within the next 30 days!", 400)
    );
  }

  const availableRooms = Object.entries(
    await Room.checkAvailability(indices, roomType)
  );

  if (availableRooms.length == 0) {
    return res.status(201).json({
      success: true,
      message: "No Rooms available for given Date",
    });
  }

  const roomid = availableRooms[0][1]._id;

  const newBooking = await Booking.create({
    userid: id,
    roomid,
    addOns,
    bookingDates: dates,
    paymentDetails : {
      paymentId : paymentIntentId,
      paymentAmount : totalPrice
    }
  });

  Room.updateAvailabilityBooked(indices, roomid);

  res.status(201).json({
    success: true,
    message: "Booking Successful",
    bookedRoom: newBooking,
  });
});

export const getAllBookings = catchAsyncErrors(async (req, res, next) => {
  const allBookings = await Booking.find();

  res.status(201).json({
    success: true,
    message: "All Bookings!",
    bookings: allBookings,
  });
});

export const getMyCurrentBookings = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.user; // Assuming the userId is passed in the request body
  if (!id) {
    return next(new ErrorHandler("Login First", 400));
  }

  const bookings = await Booking.aggregate([
    {
      // Match bookings by userId
      $match: { userid: mongoose.Types.ObjectId.createFromHexString(id)},
    },
    {
      // Perform a lookup to join the Room schema
      $lookup: {
        from: "rooms", // The name of the Room collection
        localField: "roomid",
        foreignField: "_id",
        as: "roomDetails",
      },
    },
    {
      // Unwind the roomDetails array
      $unwind: "$roomDetails",
    },
    {
      // Project to exclude userId and replace roomId with room details
      $project: {
        roomNo: "$roomDetails.roomNo", // Include roomNo from Room schema
        roomType: "$roomDetails.type", // Include roomType from Room schema
        bookingDates: 1,
        addOns: 1,
      },
    },
  ]);
  
  if (!bookings || bookings.length === 0) {
    return next(
      new ErrorHandler("No bookings found for the provided userId!", 404)
    );
  }

  // Send the response with the modified booking details
  res.status(200).json({
    success: true,
    bookings: bookings,
  });
});

export const getMyBookings = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.user; // Assuming the userId is passed in the request body

  if (!id) {
    return next(new ErrorHandler("Login First", 400));
  }

  const bookings = await oldBooking.aggregate([
    {
      // Match bookings by userId
      $match: { userid: mongoose.Types.ObjectId.createFromHexString(id) },
    },
    {
      // Perform a lookup to join the Room schema
      $lookup: {
        from: "rooms", // The name of the Room collection
        localField: "roomid",
        foreignField: "_id",
        as: "roomDetails",
      },
    },
    {
      // Unwind the roomDetails array
      $unwind: "$roomDetails",
    },
    {
      // Project to exclude userId and replace roomId with room details
      $project: {
        roomNo: "$roomDetails.roomNo", // Include roomNo from Room schema
        roomType: "$roomDetails.type", // Include roomType from Room schema
        bookingDates: 1,
        addOns: 1,
      },
    },
  ]);

  if (!bookings || bookings.length === 0) {
    return next(
      new ErrorHandler("No bookings found for the provided userId!", 404)
    );
  }

  // Send the response with the modified booking details
  res.status(200).json({
    success: true,
    bookings: bookings,
  });
});

export const payment = catchAsyncErrors(async (req, res, next) => {
  
  const { totalPrice } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPrice*100, // Amount in smallest currency unit (e.g., cents for USD)
    currency: "usd",
  });
  
  res.status(200).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  })

});