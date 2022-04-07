const response = require ( "../../contracts/dtos/user/create.user.response.dto");
const findRequest = require ('../../contracts/dtos/user/find.user.request.dto');
const User = require('../../models/user.model');
const findUserService = require('../user/find.user.service');
const Validator = require ("../validators/validator.service");


exports.execute = async function (req) {

    var {name, phone, email, password} = req;

    if (Validator.isEmpty(name) || 
        Validator.isEmpty(email) ||
        Validator.isEmpty(password)
       ) 
    {
        return new response(false, 'Datos requeridos en blanco', null);;
    }

    if (!Validator.validatePassword(password)) {
        return new response(false, 'Contraseña no cumple con los requisitos', null);
    }
    
    if(!Validator.isEmail(email)){
        return new response(false, 'Formato de Correo Incorrecto', null);
    }
    
    var findUser = new findRequest('email', email);
    var userFound = await findUserService.execute(findUser);

    if (userFound.success) {
        return new response(false, 'existe el usuario.',null);
    }

    var user = await User.build({
        name: name,
        phone: phone,
        email: email,
        password: password
    });

    await user.save().catch(err => {
        console.log(err);
        return new response(false, 'error al crear el usuario', null);
    });

    return new response(true, 'usuario creado', user);
}