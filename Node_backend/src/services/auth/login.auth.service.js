const { response } = require('express');
const findUserService = require('../user/find.user.service');


exports.login = async function (req) {
    var email = req.email;
    var password = req.password;

    if (!email || !password) {
        const error = new Error('Los valores no pueden estar vacíos');
        error.statusCode = 401;
        throw error;
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
