import express from "express";
import bodyParser from "body-parser";
import { handleStripeWebhook } from "../controllers/stripeController.js";

const stripeRouter = express.Router();

// Use bodyParser.raw() to get the raw body
stripeRouter.post("/webhook", bodyParser.raw({ type: "application/json" }), handleStripeWebhook);

export default stripeRouter;
