const memberModel = require('../models/groupMemberModel');

async function getGroupMembers(req, res) {
    try {
        const members = await memberModel.getMembersByGroupId(req.params.groupId);
        res.json(members);
    } catch (err) {
        res.sendStatus(500);
    }
}

async function addGroupMember(req, res) {
    const { userId, role } = req.body;
    try {
        await memberModel.addMemberToGroup(req.params.groupId, userId, role || 'member');
        res.sendStatus(201);
    } catch (err) {
        res.sendStatus(500);
    }
}

async function updateGroupMemberRole(req, res) {
    const { role } = req.body;
    try {
        await memberModel.updateMemberRole(req.params.groupId, req.params.userId, role);
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
    }
}

async function removeGroupMember(req, res) {
    try {
        await memberModel.removeMemberFromGroup(req.params.groupId, req.params.userId);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
}

module.exports = {
    getGroupMembers,
    addGroupMember,
    updateGroupMemberRole,
    removeGroupMember
};
