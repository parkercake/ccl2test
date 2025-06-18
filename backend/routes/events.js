const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('../controllers/eventsController');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

// group-based routes
router.get('/groups/:groupId', controller.getEvents);
router.post('/groups/:groupId', controller.addEventToGroup);

// user-based route (for personal calendar)
router.post('/users/:userId', controller.addEventToUser);

// general
router.patch('/:eventId', controller.updateEvent);
router.delete('/:eventId', controller.deleteEvent);

module.exports = router;
