'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var dropModel = new Schema({
  round: Number,
  score: Number,
  dweight: Number,
  eweight: Number,
  nparts: Number,
  zone: Number,
  cracked: Boolean
});

exports.default = _mongoose2.default.model('dummy', dropModel);