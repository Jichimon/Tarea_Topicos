var createUserResponse = function(success, message, user) {
    this.success = success;
    this.message = message;
    this.user = user;
}

module.exports = createUserResponse;