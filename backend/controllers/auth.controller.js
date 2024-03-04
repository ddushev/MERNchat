export const signup = (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        console.log(fullName, username, password, confirmPassword, gender);
        res.send("success");
    } catch (error) {

    }
}

export const login = (req, res) => {
    res.send("login");
}

export const logout = (req, res) => {
    res.send("logout");
}