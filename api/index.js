const express = require('express'),
    app = express(),
    server = require('http').Server(app),
    _notification = require('./controllers').notification.init(server),
    bodyParser = require('body-parser'),
    fileUpload = require('express-fileupload'),
    db = require('./db'),
    path = require('path'),
    config = require('./config/index'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(session);

// public folder
app.use(fileUpload());
app.use('/public', express.static(path.join(__dirname, '/public')));

// req body
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended:true }));

// cors
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', config.frontend_url);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,uuid, message, uuid, x-access-token');
    next();
});

// session
app.use(session({
    secret: config.secret,
    rolling: true,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// routers
app.use('/', require('./router/index').user);
app.use('/quiz', require('./router/index').quiz);
app.use('/quiz/passed', require('./router/index').passed);

// db connect
db.connect(config.db_url , err => {
    if (err) {
        return console.log(err);
    }
    server.listen(3000, _ => console.log('Alloha! My dear friend.'))
});

