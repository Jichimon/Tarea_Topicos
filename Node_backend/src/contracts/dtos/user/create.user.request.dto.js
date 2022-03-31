var createUserRequest = function(name, phone, email, password) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.password = password;
}

module.exports = createUserRequest;