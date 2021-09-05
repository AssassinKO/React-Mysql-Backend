// importing modules
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const rootDir = process.cwd();
const path = require('path');
const passport = require('passport')
const app = express();

const AppRouters = require('./routers');
const cronJobStart = require('./core/cron/index');
const SocketConnection = require('./socket');
const { SOCKERT_PORT } = require('./config/index');

const passportStrategies = require('./libs/passport')
passport.use(passportStrategies.jwt)
passport.use(passportStrategies.local)

var corsOptions = {
  origin: "*"
};

// cors
app.use(cors(corsOptions));

// logger
app.use(morgan('dev'));

app.use(cookieParser());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, cache-control, Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

app.use(function(err, req, res, next) {
    console.log(" --- UnauthorizedError --- ");
    if (err.name === 'UnauthorizedError') {
        res.send({
            status: 400,
            errorMessage: 'Invalid auth token provided.'
        });
        next();
    }
});

// static
app.use( express.static(path.join(rootDir, '/public')) );

// api router
AppRouters(app)

// file delete cron jobs
cronJobStart();

// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to here." });
// });

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// socket server
const socketServer = app.listen(SOCKERT_PORT, () => {
  console.log(`Sockert Server is running on port ${SOCKERT_PORT}.`);
})
const socketio = require('socket.io')(socketServer, {
  cors: {
    origin: '*'
  },
  credentials: true
});

SocketConnection(app, socketio);
