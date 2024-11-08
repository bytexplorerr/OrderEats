import express from "express"
import multer from "multer" // to store images 
import { addFoodItem , CartFoodItems, listFoodItems , removeFoodItem} from "../controllers/foodController.js";
const foodRouter = express.Router();


//Image store engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer(({storage:storage})); 

foodRouter.post("/add",upload.single("image"),addFoodItem);
foodRouter.get("/list",listFoodItems);
foodRouter.delete("/delete",removeFoodItem);
foodRouter.post("/cart-items",CartFoodItems);


export default foodRouter;