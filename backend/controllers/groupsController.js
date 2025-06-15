const groupModel = require('../models/groupModel');

async function getGroups(req, res) {
    try {
        const groups = await groupModel.getGroups();
        res.json(groups);
    } catch {
        res.sendStatus(500);
    }
}

async function getGroupById(req, res) {
    try {
        const group = await groupModel.getGroupById(req.params.id);
        if (!group) return res.sendStatus(404);
        res.json(group);
    } catch {
        res.sendStatus(500);
    }
}

async function addGroup(req, res) {
    try {
        const groupId = await groupModel.addGroup(req.body);
        res.status(201).json({ id: groupId });
    } catch {
        res.sendStatus(500);
    }
}

async function updateGroup(req, res) {
    try {
        await groupModel.updateGroup(req.params.id, req.body);
        res.sendStatus(200);
    } catch {
        res.sendStatus(500);
    }
}

async function deleteGroup(req, res) {
    try {
        await groupModel.deleteGroup(req.params.id);
        res.sendStatus(204);
    } catch {
        res.sendStatus(500);
    }
}

module.exports = {
    getGroups,
    getGroupById,
    addGroup,
    updateGroup,
    deleteGroup
};