const eventModel = require('../models/eventModel');

async function getEvents(req, res) {
    try {
        const events = await eventModel.getEventsByGroupId(req.params.groupId);
        res.json(events);
    } catch (err) {
        res.sendStatus(500);
    }
}

async function addEvent(req, res) {
    try {
        const eventId = await eventModel.addEvent(req.params.groupId, req.body);
        res.status(201).json({ id: eventId });
    } catch (err) {
        res.sendStatus(500);
    }
}

async function updateEvent(req, res) {
    try {
        await eventModel.updateEvent(req.params.eventId, req.body);
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
    }
}

async function deleteEvent(req, res) {
    try {
        await eventModel.deleteEvent(req.params.eventId);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
}

module.exports = {
    getEvents,
    addEvent,
    updateEvent,
    deleteEvent
};
