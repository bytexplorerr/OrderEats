import foodModel from "../models/foodItem.js";
import fs from 'fs'

// add food item
export const addFoodItem = async (req,res)=>{
    let image_filename = `${req.file.filename}`;
    const foodItem = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try
    {
        await foodItem.save();  
        res.json({sucess:true,message:"Food Added"});
    }
    catch(err)
    {
        console.log("Error!");
        res.json({sucess:false,message:"Error"})
    }
}

export const listFoodItems = async (req,res)=>{
    try
    {
        const items = await foodModel.find({});
        res.json({sucess:true,data:items});
    }
    catch(err)
    {
        console.log(err)
        res.json({sucess:false,message:"Error"})
    }
}

export const removeFoodItem = async (req,res)=>{
    try
    {
        const item = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${item.image}`,()=>{}); // to delete the image from "uploads" folder

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({sucess:true,message:"Item Deleted"})
    }
    catch(err)
    {
        console.log(err);
        res.json({sucess:false,message:"Error"});
    }
}

export const CartFoodItems = async (req,res)=>{
    const {ids} = req.body;
    try
    {
        const items = await foodModel.find({_id:{$in:ids}});
        return res.json({success:true,items});
    }
    catch(err)
    {
        console.log(err);
        return res.json({success:false,message:"Error!"});
    }
}