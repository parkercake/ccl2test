const userModel = require('../models/userModel');
const authService = require('../services/authService');

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.getUserByEmail(email);
        console.log("Found user:", user); // ✅ Add this line

        if (!user || !user.password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const match = await authService.comparePasswords(password, user.password);
        console.log("Password match:", match); // ✅ Add this too

        if (!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const accessToken = authService.generateAccessToken(user);
        const refreshToken = authService.generateRefreshToken(user);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false, // set to true in production (HTTPS)
            sameSite: "Lax",
            maxAge: 60 * 1000 // 1 minute
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(200).json({
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }
        });

    } catch (err) {
        console.error('Error in login:', err);
        res.sendStatus(500);
    }
}


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
    logout
};
