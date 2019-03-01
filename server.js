'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dropRouter = require('./Routes/dropRouter.js');

var _dropRouter2 = _interopRequireDefault(_dropRouter);

var _dropstageRouter = require('./Routes/dropstageRouter.js');

var _dropstageRouter2 = _interopRequireDefault(_dropstageRouter);

var _topScorerouter = require('./Routes/topScorerouter.js');

var _topScorerouter2 = _interopRequireDefault(_topScorerouter);

var _mlabconfig = require('./mlabconfig.jsconfig');

var _mlabconfig2 = _interopRequireDefault(_mlabconfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = 8080;
var HOST = '0.0.0.0';
var db = _mongoose2.default.connect(_mlabconfig2.default.admin);

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use('/api/drops', _dropRouter2.default);
app.use('/api/stage', _dropstageRouter2.default);
app.use('/api/top', _topScorerouter2.default);
app.use(_express2.default.static(__dirname + '/public'));

app.get('/search/*', function (req, res) {
  res.sendFile('search.html', { root: _path2.default.join(__dirname, './public') });
});

app.get('/searchResults/*', function (req, res) {
  res.sendFile('searchResults.html', { root: _path2.default.join(__dirname, './public') });
});

app.get('/data/*', function (req, res) {
  res.sendFile('data.html', { root: _path2.default.join(__dirname, './public') });
});

app.get('/results/*', function (req, res) {
  res.redirect('https://markewing.shinyapps.io/kpt-eggdrop/');
});

app.get('*', function (req, res) {
  res.sendFile('index.html', { root: _path2.default.join(__dirname, './public') });
});

app.listen(PORT, HOST);
console.log('Running on http://' + HOST + ':' + PORT);