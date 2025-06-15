const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('../controllers/groupMembersController');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

router.get('/', controller.getGroupMembers);
router.post('/', controller.addGroupMember);
router.patch('/:userId', controller.updateGroupMemberRole);
router.delete('/:userId', controller.removeGroupMember);

module.exports = router;
