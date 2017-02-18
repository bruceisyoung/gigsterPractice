let path = require('path');
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

let router = require('./server/config/routes');
let app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname));

mongoose.connect('mongodb://localhost/trial');
let db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('Mongoose connection is on ');
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

router(app, express, __dirname);

let port = process.env.PORT || 8080;

app.listen(port);
console.log('server listening on ', port);