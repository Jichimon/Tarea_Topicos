const Response = require ( "../../contracts/dtos/user/create.user.response.dto");
const FindRequest = require ('../../contracts/dtos/user/find.user.request.dto');
const User = require('../../models/user.model');
const FindUserService = require('./find.user.service');
const Validator = require ("../validators/validator.service");
const CodeHandler = require ("../auth/code-generator.auth.service");
const EditUserService = require("./edit.user.service");
const EmailService = require("../email.service");


exports.execute = async function (req) {

    var {name, phone, email, password} = req;

    if (Validator.isEmpty(name) || 
        Validator.isEmpty(email) ||
        Validator.isEmpty(password)
       ) 
    {
        return processWrongResponse('Datos requeridos en blanco');
    }

    if (!Validator.validatePassword(password)) {
        return processWrongResponse('Contraseña no cumple con los requisitos');
    }
    
    if(!Validator.isEmail(email)){
        return processWrongResponse('Formato de Correo Incorrecto');
    }
    
    var findUser = new FindRequest('email', email);
    var userFound = await FindUserService.execute(findUser);

    if (userFound.success) {
        return processWrongResponse('existe el usuario.');
    }

    //si el nuevo usuario a registrar pasa los filtros, se guarda en la base de datos

    var user = await User.create({
        name: name,
        phone: phone,
        email: email,
        password: password
    })
    .catch(err => {
        console.log(err);
        return processWrongResponse('error al crear el usuario');
    });

    console.log('Usuario creado correctamente en base de datos');

    //generar codigo

    var codeGenerated = await CodeHandler.generateCode(user.id);

    //enviar email con el codigo

    let subject = 'App Web III: codigo de registro en 2 pasos';
    let message = 'Copiar el siguiente código: ||  ' + codeGenerated + '  ||';
    let to = email;

    EmailService.sendEmail(subject, to, message);


    return new Response(true, 'email enviado para confirmación', user);
}


exports.registerInTwoSteps = async function(req) {

    var {code, userId} = req;

    if (Validator.isEmpty(code) || Validator.isEmpty(userId)) {
        return processWrongResponse('Datos requeridos en blanco');
    }

    var findUser = new FindRequest('id', userId);
    var userFound = await FindUserService.execute(findUser);

    if (!userFound.success) {
        return processWrongResponse('no existe el usuario');
    }

    var codeAccepted = await CodeHandler.validateCode(code, userId);

    if (!codeAccepted) {
        return processWrongResponse('código incorrecto.');
    }

    var activatedUser = await EditUserService.activateUser(userFound.user);
    return new Response(activatedUser.success, activatedUser.message, activatedUser.user);
}


function processWrongResponse(message) {
    return new Response(false, message, null);
}

