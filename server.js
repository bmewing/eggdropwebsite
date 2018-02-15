'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dropRouter = require('./Routes/dropRouter.js');

var _dropRouter2 = _interopRequireDefault(_dropRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 80;
var db = _mongoose2.default.connect('mongodb://admin:Ino3LyjSTeqCbqrfVo1oyc@ds231758.mlab.com:31758/tricitieseggdrop');

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use('/api/drops', _dropRouter2.default);
app.use(_express2.default.static(__dirname + '/public'));

app.get('*', function (req, res) {
  res.sendfile('./public/index.html');
});

app.listen(port, function () {
  console.log('http://localhost:' + port);
});