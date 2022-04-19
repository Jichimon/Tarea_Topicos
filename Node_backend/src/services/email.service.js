const Email = require('../config/email.config');

exports.sendEmail = async function(subject, receiver, message) {
    var mailOptions = {
        from: Email.FROM,
        to: receiver,
        subject: subject,
        text: message
    }

    console.log("Sending Email...");

    Email.Transport.sendMail(
        mailOptions, 
        function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email enviado: ' + info.response);
            }
        }
    );
}