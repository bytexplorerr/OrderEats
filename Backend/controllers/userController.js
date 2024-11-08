import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import { sendMail } from "../middleware/transporter.js";
// Log in

const createToken = (id)=>{
    const jwt_secret = process.env.JWT_SECRET;
    return jwt.sign({id},jwt_secret);
}

const Login = async(req,res)=>{

    const {email,password} = req.body;
    try
    {
        const User = await userModel.findOne({email});
        if(!User)
            return res.json({success:false,message:"User not found!"});
        const isMatch = await bcrypt.compare(password,User.password);
        if(!isMatch)
            return res.json({success:false,message:"User not found!"});
        const token = createToken(User._id);
        res.json({success:true,token});
    }
    catch(err)
    {
        console.log(err);
    }
}

// Sign up
const Signup = async(req,res)=>{
    const {name,email,password} = req.body;
    try
    {
        const existingUser = await userModel.findOne({email});
        if(existingUser)
            return res.json({success:false,message:"User already exist!"});
        if(!validator.isEmail(email))
            return res.json({success:false,message:"Please Enter a valid email!"});
        if(password.length < 8)
            return res.json({success:false,message:"Please enter a strong password!"});

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);


        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        });

        const User = await newUser.save(); 
        const token = createToken(User._id); 

        const mailOptions = {
            email:email,
            subject:"Welcome to OrderEats",
            html:`
                <p>Hi ${name},</p>
                <p>Thank you for signing up in our webiste.</p>
            `
        };
        sendMail(mailOptions);

        return res.json({success:true,token});
    } 
    catch(err)
    {
        console.log(err);
    }
}

export const ForgotPassword = async (req,res)=>{
    const {email} = req.body;
    try
    {
        const User = await userModel.findOne({email});
        if(!User)
            return res.json({success:false,message:"User Not Found!"});
        
        const secret = process.env.JWT_SECRET + User.password;
        const token = jwt.sign({email:User.email,password:User._id},secret,{expiresIn:"30m"});
        const link = `http://localhost:8080/api/user/reset-password/${User._id}/${token}`;

        const mailOptions = {
            email:email,
            subject:'Reset Password',
            html:`
                <p>Hi ${User.name},</p>
                <p>Click on following link to change your password</p>
                <a href = "${link}" target = "_blank" title = "Reset your password">Reset Password</a>
                <p>This link is only valid for 30 minutes.</p>
            `
        };
        sendMail(mailOptions);

        return res.json({sucess:true,message:"Email Sent Successfully!"});
    }
    catch(err)
    {
        return res.json({success:false,message:"Error!"});
        console.log(err);
    }
}
export const ResetPassword = async (req,res)=>{
    const {id,token} = req.params;
    try
    {
        const oldUser = await userModel.findOne({_id:id});
        if(!oldUser)
            return res.json({success:false,message:"User Not Found!"});

        const secret = process.env.JWT_SECRET + oldUser.password;
        const verify = jwt.verify(token,secret);
        res.render("index",{email:verify.email});
    }
    catch(err)
    {
        return res.json({success:false,message:"User Not Found!"});
        console.log(err);
    }
}

export const ChangePassword = async (req,res)=>{
    const {id,token} = req.params;
    const {newPassword} = req.body;
    try
    {
        const oldUser = await userModel.findOne({_id:id});
        if(!oldUser)
            return res.json({sucess:false,message:"User Not Found!"});
        const secret = process.env.JWT_SECRET + oldUser.password;
        const verify = jwt.verify(token,secret);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);

        await userModel.updateOne({_id:id},{$set:{password:hashedPassword}});
        return res.json({success:true,message:"Password Updated Successfully!"});
    }
    catch(err)
    {
        console.log(err.message);
        return res.json({success:false,message:"Error!"});
    }
}

export {Login,Signup}