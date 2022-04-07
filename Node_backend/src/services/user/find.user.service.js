const User = require('../../models/user.model');
const response = require ( "../../contracts/dtos/user/find.user.response.dto");
const Validator = require ("../validators/validator.service");


exports.execute = async function (req) {

    if (req == null) {
        return new response(false, null);
    }

    var propName = req.propName;
    var propValue = req.propValue;

    var res = null;

    switch (propName) {
        case 'id':
            res = await findById(propValue);
            break;

        case 'email':
            res = await findByEmail(propValue);
            break;    
    
        default:
            res = new response(false, null);
            break;
    }

    return res;
}



async function findByEmail(email) {

    if(!Validator.isEmail(email)){
        return new response(false, 'Formato de Correo Incorrecto', null);
    }
    var user = await User.findOne({
        where: {
            email
        }
    });
    var success = true;
    if (!user) {
        success = false;
    }
    return new response(success, user);
}



async function findById(id) {

    var user = await User.findByPk(id);
    var success = true;
    if (!user) {
        success = false;
    }
    return new response(success, user);
}