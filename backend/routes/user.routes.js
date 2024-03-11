import { Router } from "express";

import getUsersForSideBar from "../controllers/users.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const userRoutes = Router();

userRoutes.get("/", protectRoute, getUsersForSideBar);

export default userRoutes;