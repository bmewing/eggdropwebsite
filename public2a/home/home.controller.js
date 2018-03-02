(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope','$http'];
    function HomeController($rootScope, $http) {
      var vm = this;

      vm.year = new Date().getFullYear()
      vm.user = null;

      initController();

      function initController() {
        getData();
      }
      
      function getData(){
        console.log('hello')
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

      function cancelNextLoad() {
        $timeout.cancel(loadPromise);
      }

      function nextLoad(mill) {
        mill = mill || loadTime;

        //Always make sure the last timeout is cleared before starting a new one
        cancelNextLoad();
        loadPromise = $timeout(getData, mill);
      }
      
    }

})();