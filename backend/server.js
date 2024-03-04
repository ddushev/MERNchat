import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.get("/", (_req, res) => {
    res.send("Hello MERN chat!");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));