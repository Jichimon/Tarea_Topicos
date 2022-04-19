const createUserService = require('../services/user/create.user.service');
const createUserRequest = require ( "../contracts/dtos/user/create.user.request.dto");
const findUserService = require('../services/user/find.user.service');
const findUserRequest = require ( "../contracts/dtos/user/find.user.request.dto");
const Validator = require ("../services/validators/validator.service");

exports.create = async function (req, res, next) {
    
    const { name, phone, email, password } = req.body;

    
    var newUser = new createUserRequest(name, phone, email, password);
    var response = await createUserService.execute(newUser);
    
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(400).json(response);
    }

};


exports.activateRegisterWithCode = async function(req, res) {

    var response = await createUserService.registerInTwoSteps(req.body);
    
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(400).json(response);
    }
};


exports.findOne = async function (req, res) {
    const  id  = req.params.id;
    var userToFind;
    if (!Validator.isEmpty(id)) {
        userToFind = new findUserRequest('id', id);
    } else {
        userToFind = null;
    }

    var response = await findUserService.execute(userToFind);
    
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(400).json(response);
    }
}