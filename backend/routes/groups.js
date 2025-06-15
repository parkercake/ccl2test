const express = require('express');
const router = express.Router();
const groupsController = require('../controllers/groupsController');
const eventRoutes = require('./events');
const memberRoutes = require('./groupMembers');
const messageRoutes = require('./messages');
const resourceRoutes = require('./resources');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

router.get('/', groupsController.getGroups);
router.get('/:id', groupsController.getGroupById);
router.post('/', groupsController.addGroup);
router.put('/:id', groupsController.updateGroup);
router.delete('/:id', groupsController.deleteGroup);

router.use('/:groupId/members', memberRoutes);
router.use('/:groupId/messages', messageRoutes);
router.use('/:groupId/resources', resourceRoutes);
router.use('/:groupId/events', eventRoutes);
module.exports = router;
