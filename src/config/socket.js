import axios from "axios";

const handleSocketEvents = (io) => {
    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);

        socket.on("test_event", (data) => {
            console.log("Received from client:", data);
            socket.emit("test_response", { message: "Hello from server!" });
        });

        // Handling joining a room
        socket.on("join_room", async ({ roomID, userName }, callback) => {

        })
    })
}