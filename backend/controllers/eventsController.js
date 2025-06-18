const eventModel = require('../models/eventModel');

async function getEvents(req, res) {
    try {
        const events = await eventModel.getEventsByGroupId(req.params.groupId);
        res.json(events);
    } catch (err) {
        res.sendStatus(500);
    }
}

async function getEventsFromUser(req, res) {
    try {
        const events = await eventModel.getEventsByUserId(req.params.userId);
        res.json(events);
    } catch (err) {
        res.sendStatus(500);
    }
}

async function addEventToGroup(req, res) {
    try {
        const eventId = await eventModel.addEventToGroup(req.params.groupId, req.body);
        res.status(201).json({ id: eventId });
    } catch (err) {
        res.sendStatus(500);
    }
}

async function addEventToUser(req, res) {
    if (!req.body) {
        return res.status(400).json({ error: "Missing request body" });
    }

    const { eventId, status } = req.body;
    const userId = req.user?.id || req.body.userId;

    if (!userId || !eventId) {
        return res.status(400).json({ error: "Missing userId or eventId" });
    }

    try {
        await eventModel.addEventToUser(userId, eventId, status || "attending");
        res.status(201).json({ message: "User assigned to event" });
    } catch (err) {
        console.error("assignUserToEvent error:", err);
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
    getEventsFromUser,
    addEventToGroup,
    addEventToUser,
    updateEvent,
    deleteEvent
};
