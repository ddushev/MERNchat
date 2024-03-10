import { Router } from "express";

import { sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const messageRoutes = Router();

messageRoutes.post("/send/:id", protectRoute, sendMessage);

export default messageRoutes;