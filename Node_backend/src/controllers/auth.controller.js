const authService = require('../services/auth/login.auth.service');
const request = require ( "../contracts/dtos/auth/login.request.dto");
const response = require ( "../contracts/dtos/auth/login.response.dto");

exports.login = async function (req, res, next) {
    const { email, password } = req.body;

    var loginRequest = new request(email, password);

    var response = await authService.login(loginRequest);
    
    if (response.success) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
};