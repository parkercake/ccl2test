const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require("../middleware/verifyToken");

router.get("/me", verifyToken, authController.getMe);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

// router.use(verifyToken);
module.exports = router;