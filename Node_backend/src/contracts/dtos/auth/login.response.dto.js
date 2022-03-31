var loginResponse = function(success, message, payload) {
    this.success = success;
    this.message = message;
    this.payload = payload;
}

module.exports = loginResponse;