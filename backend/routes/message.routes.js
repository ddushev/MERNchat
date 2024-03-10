import { Router } from "express";

import { sendMessage } from "../controllers/message.controller.js";

const messageRoutes = Router();

messageRoutes.post("/send/:id", sendMessage)

export default messageRoutes;