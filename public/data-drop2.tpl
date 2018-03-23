<h1>Record Round 2 Drops!</h1>
<br>
<br>
<form class="form" ng-submit="recordDrop2()">
  <div class="col-md-8">
    <div class="form-group">
      <label for="category">Select Entrant:</label>
      <select class="form-control" id="category" ng-model="drop2Data.dropID" ng-change="getSelectedDrops2()" required>
        <option ng-repeat="drop in drop1done" value="{{drop._id}}">{{ drop.fname }} {{drop.lname}} {{drop.team}} ({{drop.category}})</option>
      </select>
    </div>
    <br>
    <div class="form-group">
      <input type="checkbox" ng-model="drop2Data.cracked"> Cracked?<br>
    </div>
    <br>
    <div class="form-group">
      <label for="dweight">Device Weight:</label>
      <input type="number" id="dweight" class="form-control" ng-model="drop2Data.dweight"/ required>
    </div> 

    <div class="form-group">
      <label for="eweight">Egg Weight:</label>
      <input type="number" id="eweight" class="form-control" ng-model="drop2Data.eweight"/ required>
    </div>
    
    <div class="form-group">
      <label for="nparts"># of Parts:</label>
      <input type="number" id="nparts" class="form-control" ng-model="drop2Data.nparts"/ required>
    </div>
    
    <div class="form-group">
      <label for="zone">Drop Zone:</label>
      <input type="number" id="zone" class="form-control" ng-model="drop2Data.zone"/ required>
    </div>
    
    <br>
    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-lg">Submit</button>
      <span class="text-danger">{{ error }}</span>
    </div>

  </div>
</form>

<hr>

{{localdrop1[0].drop.length}} drops recorded already.