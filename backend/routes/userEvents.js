const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('../controllers/userEventController');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

router.post('/events/:eventId/rsvp', controller.rsvp);
router.patch('/events/:eventId/rsvp', controller.rsvp);
router.get('/users/:userId/events', controller.getUserEvents);

module.exports = router;