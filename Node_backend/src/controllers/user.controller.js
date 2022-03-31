const createUserService = require('../services/user/create.user.service');
const request = require ( "../contracts/dtos/user/create.user.request.dto");
const Response = require ("../contracts/dtos/user/create.user.response.dto");

exports.create = async function (req, res, next) {
    
    const { name, phone, email, password } = req.body;

    var newUser = new request(name, phone, email, password);
    var response = await createUserService.execute(newUser);
    
    if (response.success) {
        res.status(200).json(response);
    } else {
        res.status().json(response);
    }

};