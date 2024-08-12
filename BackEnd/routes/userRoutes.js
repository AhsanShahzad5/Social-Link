import express from "express";
const router = express.Router();
import { signUpUser , loginUser , logoutUser ,FollowAndUnfollowUser , updateUser ,  getUserProfile , getSuggestedUsers} from "../controllers/userControllers.js";
import protectRoute from "../middleware/protectRoute.js";

//endpoints
router.get('/test' , (req,res)=>{
    res.send("signed up successfully")
})

router.get("/profile/:query" , getUserProfile)
router.post('/signup' , signUpUser)
router.post('/login' , loginUser)
router.post('/logout' , logoutUser)
router.post('/follow/:id' ,protectRoute, FollowAndUnfollowUser)
router.put('/update/:id' ,protectRoute, updateUser)
router.get("/suggested", protectRoute, getSuggestedUsers);

//export
export default router;