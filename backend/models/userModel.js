const db = require('../services/database.js').config;
const bcrypt = require('bcrypt');
const saltRounds = 10;

let getUsers = () => new Promise((resolve, reject) => {
    db.query("SELECT * FROM users_ccl2", function (err, users, fields) {
        if (err) {
            reject(err);
        } else {
            resolve(users);
        }
    });
});

let getUserById = (id) => new Promise((resolve, reject) => {
    db.query("SELECT * FROM users_ccl2 WHERE id = ?", [id], function (err, user, fields) {
        if (err) {
            reject(err);
        } else {
            resolve(user);
        }
    });
});

let getUserByEmail = (email) => new Promise((resolve, reject) => {
    db.query(
        "SELECT * FROM users_ccl2 WHERE email = ?",
        [email],
        function (err, users) {
            if (err) {
                reject(err);
            } else {
                resolve(users.length > 0 ? users[0] : null);
            }
        }
    );
});

let addUser = (userData) => new Promise(async (resolve, reject) => {
    try {
        const { first_name, last_name, email, password, bio } = userData;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        db.query(
            "INSERT INTO users_ccl2 (first_name, last_name, email, password, bio) VALUES (?, ?, ?, ?, ?)",
            [first_name, last_name, email, hashedPassword, bio],
            function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    } catch (err) {
        reject(err);
    }
});


let updateUser = (id, userData) => new Promise(async (resolve, reject) => {
    try {
        const { first_name, last_name, email, bio, password } = userData;

        if (password && password.length > 0) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            db.query(
                "UPDATE users_ccl2 SET first_name = ?, last_name = ?, email = ?, bio = ?, password = ? WHERE id = ?",
                [first_name, last_name, email, bio, hashedPassword, id],
                function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        } else {
            // Update without changing password
            db.query(
                "UPDATE users_ccl2 SET first_name = ?, last_name = ?, email = ?, bio = ? WHERE id = ?",
                [first_name, last_name, email, bio, id],
                function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        }
    } catch (err) {
        reject(err);
    }
});


let deleteUser = (id) => new Promise((resolve, reject) => {
    db.query("DELETE FROM users_ccl2 WHERE id = ?", [id], function (err, result) {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
});

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    addUser,
    updateUser,
    deleteUser
};