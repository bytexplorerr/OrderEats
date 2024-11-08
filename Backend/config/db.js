import mongooose from "mongoose";

export const connectDB = async ()=>{
    await mongooose.connect("mongodb://localhost:27017/ordereats").then(()=>console.log("Connected to DB"));
}