import jwt from "jsonwebtoken";

const generateJWTAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 1000,
        httpOnly: true, // prevents XSS attacks by flagging the cookie to be accessible only by the web server.
        sameSite: "strict", // reduce risk of CSRF attacks (cross-site request forgery attacks)
        secure: process.env.NODE_ENV !== "development",
    });
}

export default generateJWTAndSetCookie;