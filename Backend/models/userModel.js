import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false}) // if we not provide the "false" then "cartData" field will not be created as we haven't provide here any data.

const userModel = mongoose.models.user || mongoose.model("user",userSchema);
// if model is not created then create it otherwise use that model.

export default userModel;