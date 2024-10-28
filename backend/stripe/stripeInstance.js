import Stripe from "stripe";
import { config } from "dotenv";

config({ path: "./config/config.env" });

let stripe;

try {
  // Create the Stripe instance with your secret key
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  console.log("Stripe instance created successfully.");
} catch (error) {
  // Log error if there's any problem in creating the Stripe instance
  console.error("Failed to create Stripe instance:", error.message);
}

export default stripe;
