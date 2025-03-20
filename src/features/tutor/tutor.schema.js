import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
    roomID: { type: String, required: true },
    topic: { type: String, required: true },
    content: { type: String, required: true },
    authId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
})

export const tutorModel = mongoose.model("room", tutorSchema);