const userModel = require('../models/userModel');

function getUsers(req, res, next) {
    userModel.getUsers()
        .then(users => res.send(users))
        .catch(err => res.sendStatus(500));
}

function getUserById(req, res, next) {
    userModel.getUserById(req.params.id)
        .then(user => {
            if (user.length === 0) {
                res.sendStatus(404);
            } else {
                res.send(user[0]);
            }
        })
        .catch(err => res.sendStatus(500));
}

function addUser(req, res, next) {
    userModel.addUser(req.body)
        .then(result => res.sendStatus(201))
        .catch(err => res.sendStatus(500));
}

function updateUser(req, res, next) {
    userModel.updateUser(req.params.id, req.body)
        .then(result => res.sendStatus(200))
        .catch(err => res.sendStatus(500));
}

function deleteUser(req, res, next) {
    userModel.deleteUser(req.params.id)
        .then(result => res.sendStatus(200))
        .catch(err => res.sendStatus(500));
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};