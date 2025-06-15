const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('../controllers/eventsController');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

// group-based
router.get('/', controller.getEvents);
router.post('/', controller.addEvent);

// global
router.patch('/:eventId', controller.updateEvent);
router.delete('/:eventId', controller.deleteEvent);

module.exports = router;
