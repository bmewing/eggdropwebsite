<h1>Round 1 Winners!</h1>

<button class="btn btn-primary btn-lg" ng-click="fetchRound1Finalists()">Fetch Data</button>

<hr>

<h3>Elementary</h3>
<div ng-repeat="drop in elementaryDrops"> {{ drop.fname }} {{drop.lname}} ({{drop.drop[0].score.toFixed(2)}})<br></div>
<br>
<h3>Middle</h3>
<div ng-repeat="drop in middleDrops"> {{ drop.fname }} {{drop.lname}} ({{drop.drop[0].score.toFixed(2)}})<br></div>
<br>
<h3>High</h3>
<div ng-repeat="drop in highDrops"> {{ drop.fname }} {{drop.lname}} ({{drop.drop[0].score.toFixed(2)}})<br></div>
<br>
<h3>Adult</h3>
<div ng-repeat="drop in adultDrops"> {{ drop.fname }} {{drop.lname}} ({{drop.drop[0].score.toFixed(2)}})<br></div>
<br>
<h3>Team</h3>
<div ng-repeat="drop in teamDrops"> {{ drop.team }} ({{drop.drop[0].score.toFixed(2)}})<br></div>
<br>