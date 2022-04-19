const Response = require ( "../../contracts/dtos/user/edit.user.response.dto");
const FindRequest = require ('../../contracts/dtos/user/find.user.request.dto');
const User = require('../../models/user.model');
const FindUserService = require('../user/find.user.service');
const Validator = require ("../validators/validator.service");


exports.activateUser = async function (userToBeActivated) {

    await userToBeActivated.update({
        active: true
    })
    .catch(err => {
        return processError(err);
    });

    return new Response(true, 'usuario activado', userToBeActivated);
}



function processError(err) {
    console.log(err);
    return new Response(false, 'error al editar el usuario', null);
}

