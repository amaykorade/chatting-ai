import express from 'express';
import http from 'http'; // Corrected import
import { Server } from 'socket.io'; // Added correct import
import cors from 'cors';
import path from 'path';
import { connectUsingMongoose } from './src/config/mongooseConfig.js';
import AuthRouter from './src/features/auth/auth.routes.js';
import roomRouter from './src/features/tutor/tutor.routes.js';
// import { handleSocketEvents } from './src/socketEvents.js'; // Ensure this function exists

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS middleware
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
);

// Socket.io initialization
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

// Handle socket connections
// handleSocketEvents(io); // Ensure this is correctly imported and defined

// Routes
app.use('/api/user', AuthRouter);
app.use('/api/room', roomRouter);


// Start server after connecting to DB
(async () => {
    try {
        await connectUsingMongoose();
        console.log("✅ Database connected successfully!");

        server.listen(PORT, '0.0.0.0', async () => { // Changed from app.listen to server.listen
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Error starting the server:", error);
    }
})();
