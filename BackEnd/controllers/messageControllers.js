import Conversation from '../models/ConversationModel.js';
import Message from '../models/MessageModel.js';
import { v2 as cloudinary } from 'cloudinary'
import mongoose from 'mongoose';
import { getRecipientSocketId , io } from '../socket/socket.js';

const sendMessage = async (req, res) => {
    try {
        const { recipientId, message } = req.body;
        let { img } = req.body;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recipientId] }
        });

        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, recipientId],
                lastMessage: {
                    text: message,
                    sender: senderId
                }
            });
            await conversation.save();
        }
        if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img);
			img = uploadedResponse.secure_url;
		}
        const newMessage = new Message({
            conversationId: conversation._id,
            sender: senderId,
            text: message ,
            img : img || "" 
        })
        //to ensure everythtng is happening concurrently
        await Promise.all([
            newMessage.save(),
            conversation.updateOne({
                lastMessage: {
                    text: message,
                    sender: senderId
                }
            })
        ])
        const recipientSocketId =  getRecipientSocketId(recipientId);
        if(recipientSocketId){
            io.to(recipientSocketId).emit("newMessage" , newMessage)
        }
        res.status(201).json(newMessage)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getMessages = async (req, res) => {
    const { otherUserId } = req.params;
    const userId = req.user._id;
    try {
        let conversation = await Conversation.findOne({
            participants: { $all: [userId, otherUserId] }
        });
        if(!conversation){
            return res.status(404).json({error : "conversation not found"})
        }
        const messages = await Message.find({
            conversationId : conversation._id
        }).sort({createdAt:1})

        res.status(200).json(messages);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getUserConversations = async (req,res)=>{
    const userId = req.user._id;
	try {
        //our model doesnot have profile pic and username fields , so insteacd of making new fetch reqs or model , we use populate method , path is participants , and from there it finds the username and profile pic since it refers to the user model
		const conversations = await Conversation.find({ participants: userId }).populate({
			path: "participants",
			select: "username profilePic",
		});

		//remove the current user from the participants array
		conversations.forEach((conversation) => {
			conversation.participants = conversation.participants.filter(
				(participant) => participant._id.toString() !== userId.toString()
			);
		});
		res.status(200).json(conversations);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export { sendMessage, getMessages, getUserConversations }