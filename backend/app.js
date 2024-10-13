import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/userRouter.js";
import roomRouter from "./router/roomRouter.js";
import bookingRouter from "./router/bookingRouter.js";
import currentStayRouter from "./router/currentStayRouter.js";
import { updateRoomAvailability } from "./AutoUpdators/roomAvailabilityUpdate.js";
import { updateCurrentStay, updateCurrentStay2 } from "./AutoUpdators/currentStayUpdator.js";

const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL_ONE, process.env.FRONTEND_URL_TWO],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/booking", bookingRouter);
app.use("/currentStay", currentStayRouter);

updateRoomAvailability();
updateCurrentStay();
updateCurrentStay2();


dbConnection();
app.use(errorMiddleware);

export default app;
