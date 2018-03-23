<h1>Delete a person!</h1>
<div>There are currently {{ drops.length }} entrants registered.</div>
<br>
<br>
<form class="form" ng-submit="deleteEntrant()">
  <div class="col-md-8">
    <div class="form-group">
      <label for="category">Select Entrant to Delete:</label>
      <select class="form-control" id="category" ng-model="deleteID">
        <option ng-repeat="drop in drops" value="{{drop._id}}">{{ drop.fname }} {{drop.lname}} {{drop.team}} ({{drop.category}})</option>
      </select>
    </div>
    <br>
    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-lg">DELETE</button>
      <span class="text-danger">{{ error }}</span>
    </div>

  </div>
</form>
<hr>
<h3>All Currently Registered Entities</h3>
<div ng-repeat="drop in drops"> {{ drop.fname }} {{drop.lname}} {{drop.team}} ({{drop.category}})<br></div>