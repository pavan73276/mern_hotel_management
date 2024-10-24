import moment from "moment";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Room } from "../models/roomSchema.js";
import { currentStay } from "../models/currentStaySchema.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllRooms = catchAsyncErrors(async (req, res, next) => {
  const allRooms = await Room.find();

  res.status(201).json({
    success: true,
    message: "All Rooms!",
    rooms: allRooms,
  });
});

export const addNewRoom = catchAsyncErrors(async (req, res, next) => {
  const { roomNo, roomType } = req.body;

  if (!roomNo || !roomType) {
    return next(new ErrorHandler("Please provide all the details !", 400));
  }

  const existingRoom = await Room.findOne({ roomNo });
  if (existingRoom) {
    return next(
      new ErrorHandler(
        "Room number already exists. Please provide a unique room number.",
        400
      )
    );
  }

  const newRoom = await Room.create({
    roomNo,
    type: roomType,
    availability: Array(30).fill(true), // Set default availability for the next 30 days
  });

  const room = await Room.findOne({ roomNo, type: roomType });

  const roomid = room._id;
  const newStay = await currentStay.create({
    roomid,
  });

  res.status(201).json({
    success: true,
    message: "New room added successfully!",
    room: newRoom,
    newStay: newStay,
  });
});

export const DeleteRoom = catchAsyncErrors(async (req, res, next) => {
  const { roomNo, roomType } = req.body;
  console.log(req.body);
  if (!roomNo || !roomType) {
    return next(new ErrorHandler("Please provide all the details !", 400));
  }

  const room = await Room.findOne({ roomNo, type: roomType });

  if (!room) {
    return next(new ErrorHandler("Room does not exist", 400));
  }

  await room.deleteOne();

  res.status(201).json({
    success: true,
    message: "Room deleted successfully!",
  });
});

export const checkAvailbility = catchAsyncErrors(async (req, res, next) => {
  const { dates, roomType } = req.body;
  if (!dates || !Array.isArray(dates) || dates.length === 0) {
    return next(
      new ErrorHandler("Please provide a valid array of dates!", 400)
    );
  }

  const today = moment().startOf("day");

  const indices = [];

  for (const date of dates) {
    const dayDifference = moment(date).startOf("day").diff(today, "days");
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

  const rooms = await Room.checkAvailability(indices, roomType);

  res.status(200).json({
    success: true,
    count: Object.keys(rooms).length,
  });
});

export const getAllAvailability = catchAsyncErrors(async (req, res, next) => {
  const { roomType } = req.body;
  
  if (!roomType) {
    return next(
      new ErrorHandler("Please provide a valid roomType!", 400)
    );
  }

  // Find all rooms of the specified roomType
  const rooms = await Room.find({ roomType });

  if (!rooms || rooms.length === 0) {
    return next(
      new ErrorHandler("No rooms found for the provided roomType!", 404)
    );
  }

  // Initialize an array to store availability count for the next 30 days
  const availabilityCount = new Array(30).fill(0);

  // Loop through all rooms and their availability array
  rooms.forEach((room) => {
    room.availability.forEach((isAvailable, index) => {
      // Increment the count at the index if the room is available on that day
      if (isAvailable) {
        availabilityCount[index]++;
      }
    });
  });

  // Return the availability count for the next 30 days
  res.status(200).json({
    success: true,
    allAvailability: availabilityCount,  // Array of 30 elements representing available rooms per day
  });
});


