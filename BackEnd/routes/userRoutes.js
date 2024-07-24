import express from "express";
const router = express.Router();
import { signUpUser } from "../controllers/userControllers.js";
//endpoints
router.get('/test' , (req,res)=>{
    res.send("signed up successfully")
})

router.post('/signup' , signUpUser)

//export
export default router;