const response = require ( "../../contracts/dtos/auth/login.response.dto.js");
const findUserService = require('../user/find.user.service');
const findRequest = require("../../contracts/dtos/user/find.user.request.dto");
const Validator = require ("../validators/validator.service");


exports.login = async function (req) {
    var email = req.email;
    var password = req.password;

    if (!email || !password) {
        const error = new Error('Los valores no pueden estar vacíos');
        error.statusCode = 401;      
        return new response(false, error, null);       
    }

    if(!Validator.isEmail(email)){
        return new response(false, 'Formato de Correo Incorrecto', null);
    }

    var findUser = new findRequest('email', email);
    var userFound = await findUserService.execute(findUser);

    if (!userFound.success) {
        return new response(false, 'Correo o Contraseña Invalido', null);
    }


    var user = userFound.user;

    const isMatch = user.password == password;
    if (!isMatch) {
        return new response(false, 'Correo o Contraseña Invalido', null);
    }


    const payload = user.id;

    return new response(true, 'Acceso Correcto', payload);
}
