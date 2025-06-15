const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const ACCESS_EXPIRY = '1m';
const REFRESH_EXPIRY = '7d';
const SALT_ROUNDS = 10;

function generateAccessToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: ACCESS_EXPIRY }
    );
}

function generateRefreshToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: REFRESH_EXPIRY }
    );
}

function verifyAccessToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return reject(err);
            resolve(user);
        });
    });
}

function verifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
            if (err) return reject(err);
            resolve(user);
        });
    });
}

async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

async function comparePasswords(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

// function sendResetEmail(userEmail) {
//     console.log(`Sending password reset to ${userEmail}`);
// }

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    hashPassword,
    comparePasswords,
    // sendResetEmail // placeholder
};
