const model = require('../models/userEventModel');

async function rsvp(req, res) {
    const userId = req.user.id;
    const eventId = req.params.eventId;
    const status = req.body.status || 'attending';

    try {
        await model.rsvpToEvent(userId, eventId, status);
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
    }
}

async function getUserEvents(req, res) {
    try {
        const data = await model.getUserEventRSVPs(req.params.userId);
        res.json(data);
    } catch (err) {
        res.sendStatus(500);
    }
}

module.exports = {
    rsvp,
    getUserEvents
};
