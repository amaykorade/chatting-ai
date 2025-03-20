import axios from "axios";
import { tutorModel } from "../features/tutor/tutor.schema.js";

const handleSocketEvents = (io) => {
    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);

        socket.on("test_event", (data) => {
            console.log("Received from client:", data);
            socket.emit("test_response", { message: "Hello from server!" });
        });

        // Handling joining a room
        socket.on("join_room", async ({ roomID, userName }, callback) => {
            try {
                const roomExists = await checkRoomExists(roomID);
                if (!roomExists) {
                    return callback({ error: "Room does not exist" });
                }

                socket.join(roomID);
                console.log(`${userName}, joined room: ${roomID}`);

                const roomMessages = await fetchRoomMessages(roomID);
                callback({ messages: roomMessages });
            } catch (err) {
                console.error("Error during room joining:", err);
                callback({ error: "An error occurred while joining the room" });
            }
        })

        // Handling sending a message
        socket.on("send_message", async (data) => {
            const { roomID, sender, chat } = data;

            try {
                const response = await axios.post("http://localhost:5000/api/chat/", {
                    room,
                    sender,
                    chat,
                });

                console.log("socket Response :", response.data);

                io.to(roomID).emit("receive_message", response.data);
            } catch (err) {
                console.error("Error saving or broadcasting message:", err.message);
                socket.emit("message_error", { error: "Message could not be sent" });
            }
        })
    })
}

export default handleSocketEvents;

const checkRoomExists = async (roomID) => {
    try {
        const room = await tutorModel.findOne({ roomID });
        return !!room;
    } catch (err) {
        console.error("Error checking room existence:", err);
        throw err;
    }
};

const fetchRoomMessages = async (roomID) => {
    try {
        const messages = await tutorModel.find({ roomID }).sort({ createdAt: 1 });
        return messages;
    } catch (err) {
        console.error("Error fetching room messages:", err);
        return [];
    }
};