import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    roomID: { type: String, required: true },
    sender: { type: String, required: true },
    comment: { type: String, required: true },
    prediction: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

export const MessageModel = mongoose.model("Message", messageSchema);
