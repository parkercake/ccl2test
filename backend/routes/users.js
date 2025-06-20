const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

router.get('/', usersController.getUsers);
router.post('/add', usersController.addUser);
router.get('/:id', usersController.getUserById);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;