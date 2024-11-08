import express from "express"
import { Login,Signup,ForgotPassword,ResetPassword,ChangePassword} from "../controllers/userController.js"

const userRouter = express.Router();

userRouter.post("/register",Signup);
userRouter.post("/login",Login);
userRouter.post("/forgot-password",ForgotPassword);
userRouter.get("/reset-password/:id/:token",ResetPassword);
userRouter.post("/reset-password/:id/:token",ChangePassword);

export default userRouter;