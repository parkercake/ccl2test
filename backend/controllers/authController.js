const userModel = require('../models/userModel');
const authService = require('../services/authService');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authService.authenticateUser(email, password);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate the token
        const token = authService.generateToken(user);

        // ✅ Set the token as an HTTP-only cookie
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,         // 🔒 required for SameSite=None
            sameSite: "None",     // 🔥 allows cross-origin cookie sharing
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json(user); // or { user: ... } if you prefer
    } catch (err) {
        console.error("Login failed:", err);
        res.status(500).json({ message: "Server error" });
    }
};

const getMe = (req, res) => {
    res.json(req.user); // assuming req.user is set by verifyToken
};

async function refresh(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(401);

    try {
        const user = await authService.verifyRefreshToken(refreshToken);
        const newAccessToken = authService.generateAccessToken(user);
        res.json({ accessToken: newAccessToken });
    } catch (err) {
        console.error('Refresh error:', err);
        res.sendStatus(403);
    }
}

function logout(req, res) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out successfully' });
}

module.exports = {
    login,
    refresh,
    logout,
    getMe
};
