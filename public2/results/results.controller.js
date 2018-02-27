(function () {
  'use strict';
  
  angular
    .module('app',[])
    .controller('results',results);
  
  results.$inject = ['$rootScope','$http','$timeout'];
  function results($rootScope,$http, $timeout){
    var vm = this;
    
    var loadTime = 5000,
        errorCount = 0,
        loadPromise;

    vm.drops = {};
    vm.year = new Date().getFullYear()

    var getData = function(){
      $http.get('/api/drops')

      .then(function(response){
        vm.drops = response.data;
        errorCount = 0;
        nextLoad();
      })
      .catch(function(error){
        nextLoad(++errorCount * 2 * loadTime);
      })
    }

    var cancelNextLoad = function() {
      $timeout.cancel(loadPromise);
    };

    var nextLoad = function(mill) {
      mill = mill || loadTime;

      //Always make sure the last timeout is cleared before starting a new one
      cancelNextLoad();
      loadPromise = $timeout(getData, mill);
    };

    getData();

    $rootScope.$on('$destroy', function() {
      cancelNextLoad();
    });
  }
})