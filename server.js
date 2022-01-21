require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', function(req, res) {
  let address = req.ip;
  let language = req.get('Accept-Language');
  let software = req.get('User-Agent')
  res.json({
    ipaddress: address,
    language: language,
    software: software,
  });
});

app.listen(port, function () {
  console.log('Listening at: http://localhost:' + port);
});
