import { tutorModel } from "./tutor.schema.js";


const generateRoomID = () => {
    return Math.random().toString(36).substring(2, 10);
}

export const getRooms = async (req, res) => {
    try {
        const rooms = await tutorModel.find();
        res.status(200).json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getRoomsByUserID = async (req, res) => {
    try {
        const userId = req.userID;
        const rooms = await tutorModel.find({ authId: userId });
        res.status(200).json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getRoomByID = async (req, res) => {
    try {
        const { roomID } = req.params;
        const room = await tutorModel.findOne({ roomID });
        res.status(200).json(room);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createRoom = async (req, res) => {
    try {
        const userId = req.userID;
        const { topic, content } = req.body;
        const roomID = generateRoomID();

        console.log("create-room", req.body);

        const existingRoom = await tutorModel.findOne({ topic });
        if (existingRoom) {
            return res.status(400).json({ error: "Room already exists" });
        }

        const data = { roomID, topic, content, authId: userId };
        const newRoom = new tutorModel(data);
        const savedRoom = await newRoom.save();

        res.status(201).json(savedRoom);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}