const authService = require('../services/authService');

async function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = req.cookies.accessToken;

    if (!token) return res.sendStatus(401);

    try {
        req.user = await authService.verifyAccessToken(token);
        next();
    } catch {
        res.sendStatus(403);
    }
}

module.exports = verifyToken;
