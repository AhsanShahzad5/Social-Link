import User from "../models/UserModel.js";
import  jwt  from "jsonwebtoken";
const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;

         //jwt  is what we named the index, as written in jwt file.
         // "cookies.jwt"
        
        if(!token){
            return res.status(401).json({
                message : "unauthorized"
            })
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        //this user id comes from the payload we put in the jwt file
       

        req.user = user;
        // select req.user to usesr i just set above
        // we pass this user in the req object insde user
        
        //next for middleware
        next();

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(`Error in logging in user : ${error.message}`);
    }
}

export default protectRoute