'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _loginModel = require('../Models/loginModel');

var _loginModel2 = _interopRequireDefault(_loginModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginRouter = _express2.default.Router();

loginRouter.route('/:user/:password').get(function (req, res) {
  _loginModel2.default.findOne({ 'user': req.params.user }, function (err, login) {
    if (err) res.json({ response: false });else {
      if (login == null) {
        res.json({ response: false });
      } else {
        res.json({ response: login.pass === req.params.password });
      }
    }
  });
});

exports.default = loginRouter;