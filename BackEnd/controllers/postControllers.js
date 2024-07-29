import Post from '../models/PostModel.js'
import bcryptjs from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndCookie.js';



const test = (req, res) => {
    res.status(200).json({ message: "welcome to user routes" });
}


const createPost = async (req, res) => {
    try {
        const { postedBy, text } = req.body;
		let { img } = req.body;

		if (!postedBy || !text) {
			return res.status(400).json({ error: "Postedby and text fields are required" });
		}

		const user = await User.findById(postedBy);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

        // req.user._id we get from our middleware
		if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
		}

		const maxLength = 500;
		if (text.length > maxLength) {
			return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
		}
        //create a new post
		const newPost = new Post({ postedBy, text, img });
		await newPost.save();

		res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: err.message });
        console.log("Error in creating post: ", err.message);
    }
}

export { test, createPost }