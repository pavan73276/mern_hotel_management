import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Room } from "../models/roomSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const addNewRoom = catchAsyncErrors(async (req, res, next) => {
  const { roomNo, roomType } = req.body;

  if (!roomNo || !roomType) {
    return next(new ErrorHandler("Please provide all the details !", 400));
  }

  const existingRoom = await Room.findOne({ roomNo });
  if (existingRoom) {
    return next(new ErrorHandler("Room number already exists. Please provide a unique room number.", 400));
  }

  const newRoom = await Room.create({
    roomNo,
    type: roomType,
    availability: Array(30).fill(true), // Set default availability for the next 30 days
  });

  res.status(201).json({
    success: true,
    message: "New room added successfully!",
    room: newRoom,
  });
});

export const checkAvailbility = catchAsyncErrors(async (req, res, next) => {
  const { indices, roomType } = req.body;

  if (!indices || !Array.isArray(indices) || indices.length === 0) {
    return next(new ErrorHandler("Please select valid dates (indices array)!", 400));
  }

  const invalidIndex = indices.find((index) => index < 0 || index > 29);
  if (invalidIndex !== undefined) {
    return next(new ErrorHandler("Indices should be in the range 0 to 29!", 400));
  }

  const rooms = await Room.checkAvailability(indices, roomType);

  res.status(200).json({
    success: true,
    availableRooms: rooms.length
  });
});


