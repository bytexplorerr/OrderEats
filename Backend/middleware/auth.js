import jwt from "jsonwebtoken";
import "dotenv/config.js";

const authMiddleware =  async (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader || !authHeader.startsWith('Bearer '))
        return ({success:false,message:"Not Auhtorized Login again!"});

    const tokenPart = authHeader.split(' ')[1]; 
    let token;
    try
    {
        const tokenObj = JSON.parse(tokenPart);
        token = tokenObj.token; 
    }
    catch(err)
    {
        token = tokenPart;
        console.log(err);
    }
    if(!token)
        return ({success:false,message:"Token is missing!"});
    try
    {
        const jwt_secret = process.env.JWT_SECRET; 
        const decodeToken = jwt.verify(token,jwt_secret);
        req.body.userId = decodeToken.id;
        next();
    }
    catch(err)
    {
        res.json({success:false,message:"Error!"});
        console.log(err.message);
    }
}

export default authMiddleware;
