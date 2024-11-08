import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder } from "../controllers/orderController.js";
import { verifyOrder } from "../controllers/orderController.js";
import { myOrders } from "../controllers/orderController.js";
import { listOrders } from "../controllers/orderController.js";
import { updateStatus } from "../controllers/orderController.js";
const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/myorders",authMiddleware,myOrders);
orderRouter.get("/listorders",listOrders);
orderRouter.post("/update-status",updateStatus);

export default orderRouter;