import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url';
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import stripeRouter from "./routes/stripeRoute.js";
import "dotenv/config.js"
// app config
const app = express();
const PORT = 8080

const __filename = fileURLToPath(import.meta.url);  
const __dirname = path.dirname(__filename);

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:false}));

connectDB();

// api end-points
app.use("/api/food",foodRouter);
app.use("/images",express.static("uploads")); // to show the images in frontend
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.use("/api/stripe",stripeRouter);

app.get("/",(req,res)=>{
    res.send("Hello From OrderEats");
});

app.listen(PORT,()=>{
    console.log(`server is running on port : ${PORT}`);
})