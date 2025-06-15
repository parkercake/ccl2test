const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('../controllers/messagesController');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

router.get('/', controller.getMessages);
router.post('/', controller.addMessage);
router.delete('/:messageId', controller.deleteMessage);

module.exports = router;