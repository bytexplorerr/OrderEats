import userModel from "../models/userModel.js";

//add items in cart
const addToCart = async (req,res) =>{
    const {value,itemId,userId} = req.body;
    try
    {
        const User = await userModel.findOne({_id:userId});
        if(!User)
            res.json({sucess:false,message:"User Not Found!!"});
        const cartData = await User.cartData;
        if(!cartData[itemId])
        {
            if(value === 1)
                cartData[itemId] = 1;
        }
        else
        {
            const quantity = cartData[itemId];
            if(quantity === 1 && value === -1)
                delete cartData[itemId];
            else
                cartData[itemId] += value;
        }
        await userModel.findByIdAndUpdate(userId,{cartData});
        res.json({success:true,message:"Added to cart!"});
    }
    catch(err)
    {
        console.log(err.message);
        res.json({success:false,message:"Error!"});
    }
}

// remove items from cart
const removeFromCart = async (req,res) =>{
    const {itemId,userId} = req.body;
    try
    {
        const User = await userModel.findById({_id:userId});
        if(!User)
            return res.json({success:false,message:"User Not Found!!"});
        const cartData = await User.cartData;
        if(!cartData[itemId])
            return res.json({success:false,message:"Food Item Not Found!!"});
        delete cartData[itemId];
        await userModel.findByIdAndUpdate({_id:userId},{cartData});
        return res.json({success:true,message:"Item Removed Succcssfully!!"});
    }
    catch(err)
    {
        console.log(err);
        return res.json({success:false,message:"Error!!"});
    }
}

// get items in cart
const getFromCart = async (req,res)=>{
    const {userId} = req.body;
    try
    {
        const User = await userModel.findOne({_id:userId});
        if(!User)
            return res.json({success:false,message:"USer Not Found!!"});
        const cartData = await User.cartData;
        return res.json({success:true,cartData});
    }
    catch(err)
    {
        console.log(err);
        return res.json({success:false,message:"Error!"});
    }
}

export {addToCart,removeFromCart,getFromCart};