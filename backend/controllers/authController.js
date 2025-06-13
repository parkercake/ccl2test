const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.password) {
            console.error('User has no password in DB:', user.email);
            return res.status(500).json({ message: 'User has invalid password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        });
    } catch (err) {
        console.error('Error in login:', err);
        res.sendStatus(500);
    }
}


module.exports = {
    login
};