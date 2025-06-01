const userModel = require('../models/userModel');

function getUsers(req, res, next) {
    userModel.getUsers()
        .then(users => res.send(users))
        .catch(err => res.sendStatus(500))
}

module.exports = {
    getUsers
};
