import express from "express";
const router = express.Router();
import protectRoute from "../middleware/protectRoute.js";
import {test , createPost} from '../controllers/postControllers.js'

router.get('/' , test)
router.post('/create' , protectRoute ,createPost);

export default router;