import express from 'express';
import { getChats, addMessage } from './chats.controller.js';
import jwtAuth from '../../middleware/jwt.middleware.js';

const chatRouter = express.Router();

chatRouter.get("/:room", jwtAuth, getChats);

chatRouter.post("/", addMessage);

export default chatRouter;