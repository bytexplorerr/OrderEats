    import orderModel from "../models/orderModel.js";
    import userModel from "../models/userModel.js";
    import Stripe from "stripe";
    import "dotenv/config.js";

    const stripe_secret_key = process.env.STRIPE_SECRET;
    const stripe = new Stripe(stripe_secret_key);

    export const placeOrder = async (req,res)=>{
        const {userId,items,amount,address} = req.body;
        const frontend_URL = "http://localhost:5173";
        try
        {
            const newOrder = new orderModel({
                userId: userId,
                items: items,
                amount: amount,
                address: address
            });
            await newOrder.save();
            await userModel.findByIdAndUpdate({ _id: userId }, { cartData: {} });
            //console.log("Order saved and cart cleared"); // Debugging statement

            const itemInfo = items.map((item)=>({
                price_data:{
                    currency:"usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount:item.price*100, //price in dollar
                },
                quantity:item.quantity
            }));
            
            itemInfo.push({
                price_data:{
                    currency:'usd',
                    product_data:{
                        name:"Delivery Charges"
                    },
                    unit_amount:5*100,
                },
                quantity:1,
            });

            const session = await stripe.checkout.sessions.create({
                line_items:itemInfo, // "line_items" stripe expects only this 
                mode:'payment',
                success_url:`${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url:`${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
                metadata: {
                    orderId:newOrder._id.toString()
                }
            });

            return res.json({success:true,session_url:session.url});
        }
        catch(err)
        {
            console.log(err.message);
            return res.json({sucess:false,message:"Error!!"});
        }
    }

    export const verifyOrder = async(req,res)=>{
        const {orderId,success} = req.body;
        try
        {
            if(success === "true")
            {
                await orderModel.findByIdAndUpdate(orderId,{payment:true});
                res.json({success:true,message:"Order Placed Successfully!"});
            }
            else
            {
                await orderModel.findByIdAndDelete(orderId);
                res.json({success:false,message:"Order Cancelled!"});
            }
        }
        catch(err)
        {
            console.log(err);
            res.josn({success:false,message:"Error!!"});
        }
    }

export const myOrders = async(req,res)=>{
    const {userId} = req.body;
    try
    {
        const orders = await orderModel.find({userId:userId});
        res.json({success:true,data:orders});
    }
    catch(err)
    {
        console.log(err);
        res.json({success:false,message:"Error!"});
    }
}

// Listing orders for admin panel
export const listOrders = async(req,res)=>{
    try
    {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders});
    }
    catch(err)
    {
        console.log(err);
        res.json({success:false,message:"Error!"});
    }
}


// updating order status
export const updateStatus = async(req,res)=>{
    const {orderID,status} = req.body;
    try
    {
        await orderModel.findByIdAndUpdate(orderID,{status:status});
        res.json({success:true,message:"status changed successfully!"});
    }
    catch(err)
    {
        console.log(err);
        res.josn({success:false,message:"Error!"});
    }
}