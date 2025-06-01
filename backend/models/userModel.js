const db = require('../services/database.js').config;

let getUsers = () => new Promise((resolve, reject) => {
    db.query("SELECT * FROM users", function (err, users, fields) {
        if (err) {
            reject(err)
        } else {
            console.log(users);
            resolve(users)
        }
    })
})

module.exports = {
    getUsers
}