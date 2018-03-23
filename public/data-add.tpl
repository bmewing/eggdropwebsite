<h1>Add a person!</h1>
<div>There are currently {{ drops.length }} entrants registered.</div>
<br>
<br>
<form class="form" ng-submit="createEntrant()">
  <div class="col-md-8">
    <div class="form-group">
      <input type="text" class="form-control" ng-model="entrantData.fname" placeholder="First Name"/>
    </div> 

    <div class="form-group">
      <input type="text" class="form-control" ng-model="entrantData.lname" placeholder="Last Name"/>
    </div>
    
    <strong>OR</strong>
    
    <div class="form-group">
      <input type="text" class="form-control" ng-model="entrantData.team" placeholder="Team Name"/>
    </div>
    <br>
    <div class="form-group">
      <label for="category">Select Category:</label>
      <select class="form-control" id="category" ng-model="entrantData.category">
        <option value="Elementary">Elementary</option>
        <option value="Middle">Middle</option>
        <option value="High">High</option>
        <option value="Adult">Adult</option>
        <option value="Team">Team</option>
      </select>
    </div>
    <br>
    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-lg">Add</button>
      <span class="text-danger">{{ error }}</span>
    </div>

  </div>
</form>
<hr>
<h3>All Currently Registered Entities</h3>
<div ng-repeat="drop in drops"> {{ drop.fname }} {{drop.lname}} {{drop.team}} ({{drop.category}})<br></div>