const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('../controllers/resourcesController');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

router.get('/', controller.getResources);
router.post('/', controller.addResource);
router.delete('/:resourceId', controller.deleteResource);

module.exports = router;