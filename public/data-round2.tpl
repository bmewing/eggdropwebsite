<h1>Round 2 Winners!</h1>

<button class="btn btn-primary btn-lg" ng-click="fetchRound2Finalists()">Fetch Data</button>

<hr>

<div ng-repeat="drop in round2drops"> {{ drop.name }} ({{drop.drop[0].score.toFixed(2)}})<br></div>