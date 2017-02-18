let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

let port = process.env.PORT || 8080;

app.listen(port);
console.log('server listening on ', port);