var express = require('express');
var controller = require('../controllers/auth.controller');
const authRoutes = express.Router();

authRoutes.post('/', controller.login);

module.exports = authRoutes;