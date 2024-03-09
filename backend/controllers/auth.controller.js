import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import generateJWTAndSetCookie from "../utils/generateJWT.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (password.trim() !== confirmPassword.trim()) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Username already exist" });
        }

        const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password.trim(), salt);

        const newUser = new User({
            fullName: fullName.trim(),
            username: username.trim(),
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? maleProfilePic : femaleProfilePic,
        });

        if (newUser) {
            generateJWTAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                gender: newUser.gender,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username.trim() });
        const isPasswordValid = await bcrypt.compare(password.trim(), user?.password || "");

        if (!user || !isPasswordValid) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateJWTAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            gender: user.gender,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = (req, res) => {
    res.send("logout");
}