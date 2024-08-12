import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
    // conversationId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Conversation"
    // },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    lastMessage: {
        text: String,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        seen : {
            type : Boolean,
            default : false
        }
        

    },
}, { timestamps: true });

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;