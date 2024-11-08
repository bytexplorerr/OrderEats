import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,requried:true},
    status:{type:String,default:"Food Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false},
});

const orderModel = mongoose.models.order || mongoose.model("order",OrderSchema);

export default orderModel;