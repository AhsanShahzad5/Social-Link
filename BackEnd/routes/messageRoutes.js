import express from "express";
const router = express.Router();
import protectRoute from "../middleware/protectRoute.js";
import { sendMessage , getMessages , getUserConversations } from "../controllers/messageControllers.js";

router.get('/test' , (req,res)=>{
res.send("hi welcome to msg routes")
})

router.get('/conversations' , protectRoute , getUserConversations)
router.post('/' , protectRoute , sendMessage)
router.get('/:otherUserId' , protectRoute , getMessages)

export default router;