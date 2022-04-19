const Nodemailer = require('nodemailer');

exports.FROM = 'choquin64@gmail.com';

exports.Transport = Nodemailer.createTransport(
    {
        host: 'smpt.gmail.com',
        port: 465,
        service: 'gmail',
        secure: true,
        auth: {
            type: 'login',
            user: this.FROM,
            pass: 'sktuofidtkihhajn'
        }
    }
);

this.Transport.verify().then(
    () => {
        console.log('Conectado! Ahora puedes enviar correos!');
    }
);



