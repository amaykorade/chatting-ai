import express from 'express';
import jwtAuth from '../../middleware/jwt.middleware.js';
import { createRoom, getRoomByID, getRooms, getRoomsByUserID } from './tutor.controller.js';

const roomRouter = express.Router();

roomRouter.get('/', jwtAuth, getRooms);

roomRouter.post('/', jwtAuth, createRoom);

roomRouter.get('/get-room-by-userid', jwtAuth, getRoomsByUserID);

roomRouter.get('/get-room-by-id/:roomID', jwtAuth, getRoomByID);

export default roomRouter;