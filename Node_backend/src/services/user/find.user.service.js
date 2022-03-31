const User = require('../../models/user.model');
const response = require ( "../../contracts/dtos/user/find.user.response.dto");


exports.execute = async function (req) {
    var propName = req.propName;
    var propValue = req.propValue;

    var res = null;

    if (propName == 'email') {
        res = await findByEmail(propValue);
    }
    res = new response(false, null);

    return res;
}



async function findByEmail(email) {
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