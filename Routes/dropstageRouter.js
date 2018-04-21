'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dropstageModel = require('../Models/dropstageModel');

var _dropstageModel2 = _interopRequireDefault(_dropstageModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dropstageRouter = _express2.default.Router();

dropstageRouter.route('/:year').get(function (req, res) {
  _dropstageModel2.default.findOne({ 'year': req.params.year }, function (err, dropstage) {
    if (err) res.json({ stage: 0 });else {
      res.json({ stage: dropstage.stage });
    }
  });
});

exports.default = dropstageRouter;