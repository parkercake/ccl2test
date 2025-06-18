const resourceModel = require('../models/resourceModel');

async function getResources(req, res) {
    try {
        const resources = await resourceModel.getResourcesByGroupId(req.params.groupId);
        res.json(resources);
    } catch (err) {
        console.error("Error in getResources:", err); // 👈 Add this
        res.sendStatus(500);
    }
}

async function addResource(req, res) {
    try {
        console.log(req.body);
        const groupId = req.params.groupId;
        const file = req.file;
        console.log(req.file);
        if (!file) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        const resourceData = {
            name: req.body.name || file.originalname,
            file_path: `/uploads/${file.filename}`,
            file_size: file.size,
            file_type: file.mimetype,
            uploaded_by: req.user.id
        };

        const newId = await resourceModel.addResource(groupId, resourceData);
        res.status(201).json({ id: newId });
    } catch (err) {
        console.error("Error in addResource:", err);
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
