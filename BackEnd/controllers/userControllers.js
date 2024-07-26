import User from '../models/UserModel.js';
import bcryptjs from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndCookie.js';


const getUserProfile = async (req,res)=>{
    
    const {username} = req.params;
    
    try {
        //exclude password
		const user = await User.findOne({username}).select("-password").select("-updatedAt");

        // if user doesnt exist
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in getUserProfile: ", err.message);
	}
}


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

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
            });
        } else {
            res.status(400).json({ message: "invalid data" })
        }

        res.status(200).json({

        })

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(`Error in signing up user : ${error.message}`);
    }


}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "")

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        //show who the user is after loggin in
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
        })


    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(`Error in logging in user : ${error.message}`);
    }
}

const logoutUser = async (req, res) => {
    try {
        //clear the cookie
        res.cookie("jwt", " ", { maxAge: 1 /*1 milisecond */ });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(`Error in logout : ${error.message}`);
    }
}

const FollowAndUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;    //id of the user to follow / unfollow
        //user we have to follow or unfollow
        const userToModify = await User.findById(id);

        //our id we get user.-id from the middleware we passed to te req object

        const currentUser = await User.findById(req.user._id);

        // id is equal to our own id
        if (id === req.user._id.toString())
            return res.status(400).json({ error: "You cannot follow/unfollow yourself" });

        // user doesnot exist
        if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

        // check if isFollowing array of our id includes the id of othe other person
        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            // unfollow user


            //syntax : 
            //  find the user having "id" i.e tha other user and from his followers array , remove our id whihc is in the "req.user.id"

            await User.findByIdAndUpdate(id, {
                $pull: { followers: req.user._id }
            });

            // same logic  as above but opposite this time
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { following: id }
            });

            //res
            res.status(200).json({ message: "user unfollowed" })

        }
        else {
            //follow user
            //similar kind f logic as above but push operation this time

            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });

            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });

            res.status(200).json({ message: "User followed successfully" });

        }


    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(`Error occured following or un following  : ${error.message}`);
    }
}

const updateUser = async (req, res) => {
    try {
        const { name, email, username, password, bio, profilePic } = req.body;

        //our id
        const userId = req.user._id;

        let user = await User.findById(userId)

        // check basic conditions
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        //otherwise it wont work for comparison both shud be strings
        if (req.params.id !== userId.toString()) {

            return res.status(400).json({ error: "You cannot update other user's profile" });
        }

        // if we update password
        if (password) {
			const salt = await bcryptjs.genSalt(10);
			const hashedPassword = await bcryptjs.hash(password, salt);
			user.password = hashedPassword;
		}


        // add new 

        user.name = name || user.name;
		user.email = email || user.email;
		user.username = username || user.username;
		user.profilePic = profilePic || user.profilePic;
		user.bio = bio || user.bio;

       // update our user
       user = await user.save(); 
       
       res.status(200).json({message : "profile updated successfully" ,user});


    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(`Error updating  : ${error.message}`);
    }
}
export { signUpUser, loginUser, logoutUser, FollowAndUnfollowUser, updateUser , getUserProfile }
