import User from '../models/UserModel.js';
import bcryptjs from 'bcryptjs'

const signUpUser = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;
        //check if user exists , by looking for email "or" username
        const user = await User.findOne({
            $or: [{ email }, { username }]
        });
        if (user) {
            return res.status(400).json({ message: "user already exists" })
        }

        //hash the passsowrd to make it secure
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // now create a new user
        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword,
        })
        await newUser.save();

        if(newUser){
            res.status(201).json({
                _id:newUser._id ,
                name:newUser.name ,
                email:newUser.email,
                username:newUser.username,
            })
        } else {
            res.status(400).json({message : "invalid data"})
        }


    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(`Error in signing up user : ${error.message}`);
    }


}

export { signUpUser }