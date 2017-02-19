let path = require('path');
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

let router = require('./server/config/routes');
let helpers = require('./server/config/helpers');
let app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname));

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/trial');
let db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('Mongoose connection is on ');
});

router(app, express, __dirname);
helpers.registerAdmin(process.env.ADMIN || 'admin', process.env.PASSWORD || 'Gx1234');

let port = process.env.PORT || 8080;

app.listen(port);
console.log('server listening on ', port);

module.exports = app;