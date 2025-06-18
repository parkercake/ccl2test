const { pool } = require('../services/database.js');
const authService = require('../services/authService');

const getUsers = async () => {
    const [rows] = await pool.query("SELECT * FROM users_ccl2");
    return rows;
};

const getUserById = async (id) => {
    const [rows] = await pool.query("SELECT * FROM users_ccl2 WHERE id = ?", [id]);
    return rows[0];
};

const getUserByEmail = async (email) => {
    const [rows] = await pool.query("SELECT * FROM users_ccl2 WHERE email = ?", [email]);
    return rows.length > 0 ? rows[0] : null;
};

const addUser = async (userData) => {
    const { first_name, last_name, email, password, bio } = userData;
    const hashedPassword = await authService.hashPassword(password);

    const [result] = await pool.query(
        "INSERT INTO users_ccl2 (first_name, last_name, email, password, bio) VALUES (?, ?, ?, ?, ?)",
        [first_name, last_name, email, hashedPassword, bio]
    );

    return result;
};

const updateUser = async (id, userData) => {
    const { first_name, last_name, email, bio, password } = userData;

    if (password && password.length > 0) {
        const hashedPassword = await authService.hashPassword(password);
        const [result] = await pool.query(
            "UPDATE users_ccl2 SET first_name = ?, last_name = ?, email = ?, bio = ?, password = ? WHERE id = ?",
            [first_name, last_name, email, bio, hashedPassword, id]
        );
        return result;
    } else {
        const [result] = await pool.query(
            "UPDATE users_ccl2 SET first_name = ?, last_name = ?, email = ?, bio = ? WHERE id = ?",
            [first_name, last_name, email, bio, id]
        );
        return result;
    }
};

const deleteUser = async (id) => {
    const [result] = await pool.query("DELETE FROM users_ccl2 WHERE id = ?", [id]);
    return result;
};

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    addUser,
    updateUser,
    deleteUser
};