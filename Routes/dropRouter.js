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

var dropRouter = _express2.default.Router();

dropRouter.route('/').get(function (req, res) {
  _entrantModel2.default.find({}, function (err, drops) {
    res.json(drops);
  });
}).post(function (req, res) {
  var entrant = new _entrantModel2.default(req.body);
  entrant.save();
  res.status(201).json(entrant);
});

dropRouter.use('/:entrantID', function (req, res, next) {
  _entrantModel2.default.findById(req.params.entrantID, function (err, entrant) {
    if (err) res.status(500).send(err);else {
      req.entrant = entrant;
      next();
    }
  });
});
dropRouter.route('/:entrantID').get(function (req, res) {
  res.json(req.entrant);
}).post(function (req, res) {
  var drop = new _dropModel2.default(req.body);
  req.entrant.drop.push(drop);
  req.entrant.save();
  res.json(req.entrant);
}).delete(function (req, res) {
  _entrantModel2.default.remove({ _id: req.params.entrantID }, function (err, numAffected) {
    if (err) res.status(500).send(err);else res.status(200).send(numAffected);
  });
}).patch(function (req, res) {
  if (req.body._id) delete req.body._id;
  for (var p in req.body) {
    req.entrant[p] = req.body[p];
  }
  req.entrant.save();
  res.json(req.entrant);
});

dropRouter.route('/:entrantID/:dropID').get(function (req, res) {
  _entrantModel2.default.find({ _id: req.params.entrantID, "drop._id": req.params.dropID }, function (err, entrant) {
    if (err) res.status(500).send(err);else res.json(entrant);
  });
}).delete(function (req, res) {
  _entrantModel2.default.update({ "_id": req.params.entrantID }, { "$pull": { "drop": { "_id": req.params.dropID } } }, function (err, numAffected) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(numAffected);
    }
  });
}).patch(function (req, res) {
  var set = {};
  for (var field in req.body) {
    set['drop.' + field] = req.body[field];
  }
  _entrantModel2.default.update({ _id: req.params.entrantID, "drop._id": req.params.dropID }, { $set: set }, function (err, numAffected) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(numAffected);
    }
  });
});
exports.default = dropRouter;