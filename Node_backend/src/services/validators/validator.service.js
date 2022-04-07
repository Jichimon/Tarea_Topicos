exports.isEmpty = function(object) {
    return object === null || object === undefined;
}

exports.isEmail = function(input) {
    if (isEmpty(input)){
        return false;
    }
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return input.match(validRegex);
}

exports.validatePassword = function(password) {
    if (isEmpty(input)){
        return false;
    }
    let length = password.length;
    return length >=4 && length <=20;
}