
const express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// Database connection setup
mongoose.connect('mongodb://localhost:27017/peerlyst');
const db = mongoose.connection;
db.on('error', function (err) {
    console.error('connection error:', err);
    process.exit(1);
});
db.once('open', function() {
    console.log('db connected');
});

// Express app
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// added to fetch main.js in index.html
app.use(express.static(path.join(__dirname, 'dist')));


// seesion handling

app.use(cookieParser());
app.use(session({name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  resave: true}));

let authRoutes = require('./route/authRoute')(express.Router());
let postRoutes = require('./route/postRoute')(express.Router());
let tagsRoutes = require('./route/tagsRoute')(express.Router());
let followRoutes = require('./route/followRoute')(express.Router());

// expose api end points
app.use('/api/post', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tags', tagsRoutes);
app.use('/api/follow', followRoutes);
// error handler
app.use(function(err, req, res, next) {
    res.json({error: err || 'Not found!'});
});


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

