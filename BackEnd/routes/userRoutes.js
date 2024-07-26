import express from "express";
const router = express.Router();
import { signUpUser , loginUser , logoutUser ,FollowAndUnfollowUser , updateUser ,  getUserProfile} from "../controllers/userControllers.js";
import protectRoute from "../middleware/protectRoute.js";
//endpoints
router.get('/test' , (req,res)=>{
    res.send("signed up successfully")
})

router.get('/profile/:id' , getUserProfile)
router.post('/signup' , signUpUser)
router.post('/login' , loginUser)
router.post('/logout' , logoutUser)
router.post('/follow/:id' ,protectRoute, FollowAndUnfollowUser)
router.post('/update/:id' ,protectRoute, updateUser)

//export
export default router;