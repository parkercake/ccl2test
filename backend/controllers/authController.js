const userModel = require('../models/userModel');
const authService = require('../services/authService'); // now handles JWT + password logic

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.getUserByEmail(email);
        if (!user || !user.password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Use authService to compare passwords
        const match = await authService.comparePasswords(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Use authService to generate tokens
        const accessToken = authService.generateAccessToken(user);
        const refreshToken = authService.generateRefreshToken(user);

        res.status(200).json({
            accessToken,
            refreshToken,
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

module.exports = { login, refresh };