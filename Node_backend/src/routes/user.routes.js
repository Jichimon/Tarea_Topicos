var express = require('express');
var authMiddleware = require('../middlewares/auth.middleware');
var controller = require('../controllers/user.controller');
const router = express.Router();

router.route('/create').post(controller.create);

module.exports = router;