import { Server } from "socket.io";
import http from 'http';
import express from "express";

//models
import Message from "../models/MessageModel.js";
import Conversation from "../models/ConversationModel.js";


const app = express();

//http server
const server = http.createServer(app);

// binindg our socket server with our http server
//to avoid cors errros
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

//recepient socketId
export const getRecipientSocketId = (recipientId) => {
	return userSocketMap[recipientId];
}


// to store user id for sockets , we create a hash map
const userSocketMap = {} // userId map to socketId


//estalish conneciotn with users

io.on('connection', (socket) => {
	console.log('user connected ', socket.id);

	const userId = socket.handshake.query.userId; // userId map to socketId
	if (userId != "undefined") {
		userSocketMap[userId] = socket.id;
	}
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	//seen unseen msg functionality
	socket.on("markMessagesAsSeen", async ({ conversationId, userId }) => {
		try {
			///find all msgs that have this id
			await Message.updateMany({ conversationId: conversationId, seen: false }, { $set: { seen: true } });

			await Conversation.updateOne({ _id: conversationId }, { $set: { "lastMessage.seen": true } });
			
			io.to(userSocketMap[userId]).emit("messagesSeen", { conversationId });
		} catch (error) {
			console.log(error);
		}
	});


	socket.on("disconnect", () => {
		// console.log("user disconnected");
		delete userSocketMap[userId];
		//update the state
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	})
})

export { io, server, app }