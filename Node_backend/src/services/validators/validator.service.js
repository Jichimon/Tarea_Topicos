exports.isEmpty = function(object) {
    return !exists(object);
}

exports.isEmail = function(input) {
    if (!exists(input)){
        return false;
    }
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return input.match(validRegex);
}

exports.validatePassword = function(password) {
    if (!exists(password)){
        return false;
    }
    let length = password.length;
    return length >=4 && length <=20;
}

function exists(object) {
    let exist = object != null || object != undefined;
    return exist;
}