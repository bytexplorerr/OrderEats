import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import "dotenv/config.js";

const stripe_secret_key = process.env.STRIPE_SECRET;
const stripe = new Stripe(stripe_secret_key);
const stripe_webhook_secret = process.env.STRIPE_WEBHOOK_SECRET;

//console.log("Stripe Webhook implementation");

export const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const payload = req.body; 
    let event;

    //console.log("Webhook received");
    try 
    {
        //console.log("Constructing event"); // Debugging statement
        event = stripe.webhooks.constructEvent(payload, sig, stripe_webhook_secret);
        //console.log("Event constructed"); // Debugging statement
    } catch (err) 
    {
        console.log(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).json({ success: false, message: "Error!!" });
    }

    //console.log("Event type:", event.type);
    //console.log("Event data object:", event.data.object);

    switch (event.type) 
    {
        case 'payment_intent.payment_failed':
            const failedSession = event.data.object;
            console.log('Payment failed for order ID:', failedSession.metadata.orderId);
            try {
                // Remove order from database if payment failed
                await orderModel.findByIdAndDelete(failedSession.metadata.orderId);
                console.log(`Order ${failedSession.metadata.orderId} removed due to payment failure.`);
            } catch (err) {
                console.log(`Failed to delete order: ${err.message}`);
            }
            break;

        // Handle session expiration
        case 'checkout.session.expired':
            const expiredSession = event.data.object;
            console.log('Checkout session expired for order ID:', expiredSession.metadata.orderId);
            try {
                // Remove order from database if session expired
                await orderModel.findByIdAndDelete(expiredSession.metadata.orderId);
                console.log(`Order ${expiredSession.metadata.orderId} removed due to session expiration.`);
            } catch (err) {
                console.log(`Failed to delete order: ${err.message}`);
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send('Received');
};
