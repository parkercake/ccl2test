const messageModel = require('../models/messageModel');

async function getMessages(req, res) {
    try {
        const messages = await messageModel.getMessagesByGroupId(req.params.groupId);
        res.json(messages);
    } catch (err) {
        res.sendStatus(500);
    }
}

async function addMessage(req, res) {
    const groupId = req.params.groupId;
    const userId = req.user.id;
    const { content } = req.body;

    try {
        const messageId = await messageModel.addMessage(groupId, userId, content);
        res.status(201).json({ id: messageId });
    } catch (err) {
        res.sendStatus(500);
    }
}

async function deleteMessage(req, res) {
    try {
        await messageModel.deleteMessage(req.params.messageId);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
}

module.exports = {
    getMessages,
    addMessage,
    deleteMessage
};
