const resourceModel = require('../models/resourceModel');

async function getResources(req, res) {
    try {
        const resources = await resourceModel.getResourcesByGroupId(req.params.groupId);
        res.json(resources);
    } catch (err) {
        res.sendStatus(500);
    }
}

async function addResource(req, res) {
    try {
        const groupId = req.params.groupId;
        const resourceData = {
            ...req.body,
            uploaded_by: req.user.id
        };

        const newId = await resourceModel.addResource(groupId, resourceData);
        res.status(201).json({ id: newId });
    } catch (err) {
        res.sendStatus(500);
    }
}

async function deleteResource(req, res) {
    try {
        await resourceModel.deleteResource(req.params.resourceId);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
}

module.exports = {
    getResources,
    addResource,
    deleteResource
};
