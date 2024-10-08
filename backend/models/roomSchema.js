import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNo: {
    type: Number,
    required: [true, "Room number is required!"],
    min: [1, "Room number must be at least 1"],
    max: [500, "Room number cannot exceed 500"]
  },
  type: {
    type: String,
    required: [true, "Room type Is Required!"],
    enum: ["Normal", "Vip"],
  },
  availability: {
    type: [Boolean], // Array of Booleans
    default: Array(30).fill(true), // Default to all days being available
  },
});

// Method to check availability
roomSchema.statics.checkAvailability = async function (indices, roomType) {

  const rooms = await this.find({ type: roomType });

  const availableRooms = rooms.filter((room) => {

    return indices.every((index) => room.availability[index] === true);
  });

  return availableRooms.map((room) => room.roomNo);
};

export const Room = mongoose.model("Room", roomSchema);
