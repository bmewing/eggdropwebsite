(function() {
  var app = angular.module('myApp', ['ui.router']);
  
  app.run(function($rootScope, $location, $state, LoginService) {
    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){ 
          console.log('Changed state to: ' + toState);
      });
    
      if(!LoginService.isAuthenticated()) {
        $state.transitionTo('login');
      }
  });
  
  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
      .state('login', {
        url : '/login',
        templateUrl : '../data-login.tpl',
        controller : 'LoginController'
      })
      .state('addPerson', {
        url : '/add',
        templateUrl : '../data-add.tpl',
        controller : 'AddController'
      })
      .state('deletePerson', {
        url : '/delete',
        templateUrl : '../data-del.tpl',
        controller : 'AddController'
      })
      .state('recordDrop1', {
        url : '/drop1',
        templateUrl : '../data-drop1.tpl',
        controller : 'AddController'
      })
      .state('recordDrop2', {
        url : '/drop2',
        templateUrl : '../data-drop2.tpl',
        controller : 'AddController'
      })
      .state('listRound1', {
        url : '/round1',
        templateUrl : '../data-round1.tpl',
        controller : 'Round1Finalists'
      })
      .state('listRound2', {
        url : '/round2',
        templateUrl : '../data-round2.tpl',
        controller : 'Round2Finalists'
      });
  }]);

  app.controller('LoginController', function($scope, $rootScope, $stateParams, $state, LoginService, $http) {
    LoginService.login('no','no');
    
    $rootScope.title = "Please Login";
    $rootScope.activePage = "none";
    
    $scope.formSubmit = function() {
      if(LoginService.login($scope.username, $scope.password)) {
        $scope.error = '';
        $scope.username = '';
        $scope.password = '';
        $state.transitionTo('addPerson');
      } else {
        $scope.error = "Incorrect username/password !";
      }   
    };
    
  });
  
  app.controller('Round1Finalists',function($scope, $rootScope, $stateParams, $state, LoginService, $http){
    $rootScope.title = "Kingsport Egg Drop Data Entry"
    
    refreshData();
    
    function keepOnlyWithDrops(obj){
      return(obj.drop.length > 0)
    }
    
    function kor1(obj){
      return(obj.round == 1);
    }
    
    function keepOnlyRound1(obj){
      obj.drop = obj.drop.filter(kor1)
      return(obj)
    }
    
    function refreshData(){
      $http.get('/api/drops')
      .then(function(data){
        var tmp = data.data;
        tmp = tmp.filter(keepOnlyWithDrops).map(keepOnlyRound1);
        console.log(tmp);
        $rootScope.drops = tmp;
      })
    }
    
    function filterCategory(cat,drop){
      if(drop.drop.length > 0){
        return drop.category == cat && !drop.drop[0].cracked;
      } else {
        return false;
      }
      
    }
    
    function sortCategory(a,b) {
      if (a.drop[0].score < b.drop[0].score)
        return -1;
      if (a.drop[0].score > b.drop[0].score)
        return 1;
      return 0;
    }
    
    function justElementary(){
//       refreshData();
      var tmp = $rootScope.drops;
      $scope.elementaryDrops = tmp.filter(filterCategory.bind(null,"Elementary")).sort(sortCategory).slice(0,3);
    }
    
    function justMiddle(){
//       refreshData();
      var tmp = $rootScope.drops;
      $scope.middleDrops = tmp.filter(filterCategory.bind(null,"Middle")).sort(sortCategory).slice(0,3);
    }
    
    function justHigh(){
//       refreshData();
      var tmp = $rootScope.drops;
      $scope.highDrops = tmp.filter(filterCategory.bind(null,"High")).sort(sortCategory).slice(0,3);
    }
    
    function justAdult(){
//       refreshData();
      var tmp = $rootScope.drops;
      $scope.adultDrops = tmp.filter(filterCategory.bind(null,"Adult")).sort(sortCategory).slice(0,3);
    }
    
    function justTeam(){
//       refreshData();
      var tmp = $rootScope.drops;
      $scope.teamDrops = tmp.filter(filterCategory.bind(null,"Team")).sort(sortCategory).slice(0,3);
    }
    
    $scope.fetchRound1Finalists = function(){
      justElementary();
      justMiddle();
      justHigh();
      justAdult();
      justTeam();
    }
  });
  
  app.controller('Round2Finalists',function($scope, $rootScope, $stateParams, $state, LoginService, $http){
    $rootScope.title = "Kingsport Egg Drop Data Entry"
    refreshData();
    
    function collapseNames(obj){
      if(obj.category == "Team"){
        obj.name = obj.team;
      } else {
        obj.name = obj.fname + ' ' + obj.lname;
      }
      return(obj)
    }
    
    function keepOnlyWithDrops(obj){
      return(obj.drop.length > 0)
    }
    
    function dropCracked(obj){
      return(typeof obj.drop[0].cracked == "undefined");
    }
    
    function kor2(obj){
      return(obj.round == 2);
    }
    
    function keepOnlyRound2(obj){
      obj.drop = obj.drop.filter(kor2)
      return(obj)
    }
    
    function sortCategory(a,b) {
      if (a.drop[0].score < b.drop[0].score)
        return -1;
      if (a.drop[0].score > b.drop[0].score)
        return 1;
      return 0;
    }
    
    function compare(a,b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }
    
    function refreshData(){
      $http.get('/api/drops')
      .then(function(data){
        var tmp = data.data;
        tmp = tmp.map(collapseNames);
        $rootScope.drops = tmp.sort(compare);
      })
    }
    
    function refreshRound2(){
      var tmp = $rootScope.drops;
      tmp = tmp.filter(keepOnlyWithDrops).map(keepOnlyRound2).filter(keepOnlyWithDrops).filter(dropCracked);
      tmp = tmp.sort(sortCategory).slice(0,3);
      $rootScope.round2drops = tmp;
    }
    
    $scope.fetchRound2Finalists = function(){
      refreshRound2();
    }
  });
  
  app.controller('AddController', function($scope, $rootScope, $stateParams, $state, LoginService, $http) {
    $rootScope.title = "Kingsport Egg Drop Data Entry";
    $scope.entrantData = {};
    $scope.localdrop1 = {};
    
    refreshData();
    
    function compare(a,b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }
    
    function collapseNames(obj){
      if(obj.category == "Team"){
        obj.name = obj.team;
      } else {
        obj.name = obj.fname + ' ' + obj.lname;
      }
      return(obj)
    }
    
    function keepOnlyWithDrops(obj){
      return(obj.drop.length === 1)
    }
    
    function keepOnlyWithoutDrops(obj){
      return(obj.drop.length === 0);
    }
    
    function refreshData(){
      $http.get('/api/drops')
      .then(function(data){
        var tmp = data.data;
        tmp = tmp.map(collapseNames);
        $rootScope.drops = tmp.sort(compare);
        $rootScope.drop1done = tmp.sort(compare).filter(keepOnlyWithDrops);
        $rootScope.drop1needed = tmp.sort(compare).filter(keepOnlyWithoutDrops);
      })
    }
    
    function filterID(drop) {
      return drop._id == $scope.drop1Data.dropID;
    }
    
    $scope.getSelectedDrops = function(){
      $scope.localdrop1 = $rootScope.drops.filter(filterID)
    }
    
    function filterID2(drop) {
      return drop._id == $scope.drop2Data.dropID;
    }
    
    $scope.getSelectedDrops2 = function(){
      $scope.localdrop1 = $rootScope.drops.filter(filterID2)
    }
    
    $scope.createEntrant = function(){
      var input = $scope.entrantData;
      input.year = new Date().getFullYear();
      
      $http.post('/api/drops', input)
          .then(function(data){
            $scope.entrantData = {};
            refreshData();
          });
    }
    
    $scope.deleteEntrant = function(){
      var rem = $scope.deleteID;
      $http.delete('/api/drops/'+rem)
        .then(function(data){
        refreshData();
      })
    }
    
    $scope.recordDrop1 = function(){
      var input = $scope.drop1Data;
      input.round = 1;
      input.score = !input.cracked * (((30*(input.dweight - input.eweight)) / 89) + (40 * input.zone / 10));
      input.dt = new Date().getTime().toString();
      console.log(input)
      $http.post('/api/drops/'+input.dropID,input)
        .then(function(data){
          $scope.drop1Data = {};
          refreshData();
        })
    }
    
    $scope.recordDrop2 = function(){
      var input = $scope.drop2Data;
      input.round = 2;
      input.score = !input.cracked * (((30*(input.dweight - input.eweight)) / 89) + (30 * input.nparts / 3) + (40 * input.zone / 10));
      input.dt = new Date().getTime().toString();
      console.log(input)
      $http.post('/api/drops/'+input.dropID,input)
        .then(function(data){
          $scope.drop2Data = {};
          refreshData();
        })
    }
    
  });
  
  app.factory('LoginService', function($http) {
    var isAuthenticated = false;
    
    return {
      login : function(username, password) {
        var hash = CryptoJS.SHA256(password);
        isAuthenticated = username === "dataentry" && hash == "b3b2c450f6a6181b813ed28073d710b9950404a9e2638768b1c8ad78fccf1dde";
        return isAuthenticated;
      },
      isAuthenticated : function() {
        return isAuthenticated;
      }
    };
    
  });
  
})();

// var dataentry = angular.module('dataentry',[]);

// function mainController($scope, $http){
//   $scope.entrantData = {};
//   $scope.dropData = {};
//   $scope.user = {};
  
//   $http.get('/api/drops')
//     .success((data)=>{
//       $scope.drops = data;
//       console.log(data);
//     })
//     .error((data)=>{
//       console.log('Error: '+data);
//     });
  
//   $scope.createEntrant = function(){
//     $http.post('/api/drops', $scope.entrantData)
//       .succes((data)=>{
//         $scope.entrantData = {};
//         $scope.drops = data
//         console.log(data);
//       })
//       .error((data)=>{
//         console.log('Error: '+data);
//       });
//   }
  
//   $scope.deleteEntrant = function(){
//     $http.delete('/api/drops/'+id)
//       .succes((data)=>{
//         $scope.drops = data
//         console.log(data);
//       })
//       .error((data)=>{
//         console.log('Error: '+data);
//       });
//   };
  
//   $scope.modifyEntrant = function(){
//     $http.patch('/api/drops/'+id,$scope.entrantData)
//       .succes((data)=>{
//         $scope.entrantData = {};
//         $scope.drops = data
//         console.log(data);
//       })
//       .error((data)=>{
//         console.log('Error: '+data);
//       });
//   };
// }