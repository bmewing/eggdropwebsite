<div class="col-md-12">
  <h3>Login Page</h3>

  <form ng-submit="formSubmit()" class="form">
    <div class="col-md-4">
      <div class="form-group">
        <input type="text" class="form-control" ng-model="username" placeholder="username" required=""/>
      </div> 

      <div class="form-group">
        <input type="password" class="form-control" ng-model="password" placeholder="password" required=""/>
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-success">Login</button>
        <span class="text-danger">{{ error }}</span>
      </div>

    </div>
  </form>
</div>