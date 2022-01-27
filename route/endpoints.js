const path = require('path');
const express = require('express');

const recordRoutes = express.Router();

recordRoutes.route('/api/all').get(function (req, res) {
  const body = req.headers;
  res.status(200).json(body);
});

recordRoutes.route('/api/whoami').get(function (req, res) {
  const address = req.ip;
  const language = req.get('accept-language');
  const software = req.get('user-agent');
  const body = {
    ipaddress: address,
    language: language,
    software: software,
  }
  res.status(200).json(body);
});

recordRoutes.route('/api/:headername').get(function (req, res) {
  const name = req.params.headername;
  const value = req.get(name)
  let body, stat;
  if (isUndefined(value)) {
    stat = 400;
    body = { error: `${name} header not set` };
  } else {
    stat = 200;
    body = { [name]: value };
  }
  res.status(stat).json(body);
});

module.exports = recordRoutes;

// helpers
function isUndefined(val) {
  return val === undefined;
}