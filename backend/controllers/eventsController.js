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
    console.log("BODY RECEIVED:", req.body);
    const { name, start, end } = req.body;
    const userId = req.params.userId;

    if (!userId || !name || !start || !end) {
        return res.status(400).json({ error: "Missing userId, name, start, or end" });
    }

    try {
        const eventId = await eventModel.addEventToUser(userId, { name, start, end });
        res.status(201).json({ id: eventId });
    } catch (err) {
        console.error("addEventToUser error:", err);
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
