import mongoose from "mongoose";
import { mailSender } from "../utils/sendMail.js";
import {emailTemplate} from '../utils/template.js';
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";


const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		try {
			const subject = `Otp Alert for Password Change`;
      const message = `your otp is ${this.otp}`;
      const response = mailSender(this.email, subject, message);

			console.log("Email sent successfully: ", response);
		} catch (error) {
			console.log("Error occurred while sending email: ", error);
			throw error;
		}
	}
	next();
});


export const OTP = mongoose.model("OTP", OTPSchema);


