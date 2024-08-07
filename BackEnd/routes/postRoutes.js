import express from "express";
const router = express.Router();
import protectRoute from "../middleware/protectRoute.js";
import {test , createPost , getPost , deletePost , likeUnlikePost , replyToPost , getUserPosts , getFeedPosts} from '../controllers/postControllers.js'

router.get('/test' , test)

router.get('/feed' ,protectRoute, getFeedPosts)
router.get('/:id' , getPost)
router.post('/create' , protectRoute ,createPost)
router.delete('/:id' , protectRoute , deletePost)
router.post('/like/:id' , protectRoute , likeUnlikePost)
router.post('/reply/:id' , protectRoute , replyToPost)
 router.get('/user/:username' , getUserPosts)

export default router;