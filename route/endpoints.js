const path = require('path');
const express = require('express');

const recordRoutes = express.Router();

recordRoutes.route('/').get(function (_req, res) {
  res.sendFile(path.dirname(__dirname) + '/views/index.html');
});

recordRoutes.route('/api/all').get(function (req, res) {
  res.json(req.headers);
});

recordRoutes.route('/api/whoami').get(function(req, res) {
  const address = req.ip;
  const language = req.get('accept-language');
  const software = req.get('user-agent');
  res.json({
    ipaddress: address,
    language: language,
    software: software,
  });
});

recordRoutes.route('/api/:headername').get(function(req, res) {
  const name = req.params.headername;
  const value = req.get(name)
  let body;
  if (isUndefined(value)) {
    body = { error: `${name} header not set` };
  } else {
    body = { [name]: value };
  }
  res.json(body);
});

module.exports = recordRoutes;

// helpers
function isUndefined(val) {
  return val === undefined;
}