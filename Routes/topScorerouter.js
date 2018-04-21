'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _entrantModel = require('../Models/entrantModel');

var _entrantModel2 = _interopRequireDefault(_entrantModel);

var _dropModel = require('../Models/dropModel');

var _dropModel2 = _interopRequireDefault(_dropModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var topScorerouter = _express2.default.Router();

topScorerouter.use('/:category', function (req, res, next) {
  _entrantModel2.default.find({ category: req.params.category }, function (err, entrants) {
    if (err) res.status(500).send(err);else {
      req.entrants = entrants;
      next();
    }
  });
});
topScorerouter.route('/:category').get(function (req, res) {
  function filterCategory(drop) {
    if (drop.drop.length > 0) {
      return !drop.drop[0].cracked;
    } else {
      return false;
    }
  }

  function sortCategory(a, b) {
    if (a.drop[0].score < b.drop[0].score) return -1;
    if (a.drop[0].score > b.drop[0].score) return 1;
    return 0;
  }

  var tmp = req.entrants;
  tmp = tmp.filter(filterCategory).sort(sortCategory);

  var output = 0;

  if (tmp.length < 3) {
    output = tmp[tmp.length - 1].drop[0].score;
  } else {
    output = tmp.slice(2, 3)[0].drop[0].score;
  }

  res.json(output);
});

exports.default = topScorerouter;