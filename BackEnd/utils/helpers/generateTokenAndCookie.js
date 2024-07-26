import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId ,res) => {
    const token = jwt.sign(
        {userId} , //payload 
        process.env.JWT_SECRET,{
            expiresIn : '15d'
        })

        //first perimater is what are token will be called in the cookies section
        //second is the actual token
        res.cookie("jwt" , token , {
            httpOnly : true , //more secure
            maxAge : 15*24*60*60*1000,
            sameSize : "strict"
        });

        return token;

}

export default generateTokenAndSetCookie