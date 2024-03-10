import express from "express";
import dotenv from "dotenv";

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// app.get("/", (_req, res) => {
//     res.send("Hello MERN chat!");
// });

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});