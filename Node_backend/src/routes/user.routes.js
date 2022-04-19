var express = require('express');
var authMiddleware = require('../middlewares/auth.middleware');
var controller = require('../controllers/user.controller');
const router = express.Router();

router.route('/create').post(controller.create);
router.route('/confirm-register').post(controller.activateRegisterWithCode);
router.route("/find/:id").get(controller.findOne);

module.exports = router;