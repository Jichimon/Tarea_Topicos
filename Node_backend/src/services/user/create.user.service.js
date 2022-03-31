const response = require ( "../../contracts/dtos/user/create.user.response.dto");
const findRequest = require ('../../contracts/dtos/user/find.user.request.dto');
const User = require('../../models/user.model');
const findUserService = require('../user/find.user.service');


exports.execute = async function (req) {

    var {name, phone, email, password} = req;
    
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