import express from 'express';
import { getChats } from './chats.controller';
import jwtAuth from '../../middleware/jwt.middleware';

const chatRouter = express.Router();

chatRouter.get("/:room", jwtAuth, getChats);

chatRouter.post("/", addMessage);

export default chatRouter;