var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var userRouter = require('./src/routes/user.routes');
var authRouter = require('./src/routes/auth.routes');

var app = express();

//configurando CORS
app.use( cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: 'content-type, Authorization, Origin, X-Requested-With, Accept'
  }));

//estableciendo conexion con la base de datos
var database = require('./src/config/database');
database.connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/users', userRouter);
app.use('/api/auth/login', authRouter);

module.exports = app;
