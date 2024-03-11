import { Router } from "express";

import { getMessage, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const messageRoutes = Router();

messageRoutes.get("/:id", protectRoute, getMessage);
messageRoutes.post("/send/:id", protectRoute, sendMessage);

export default messageRoutes;