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
        controller : 'AddController'
      })
      .state('listRound2', {
        url : '/round2',
        templateUrl : '../data-round2.tpl',
        controller : 'AddController'
      });
  }]);

  app.controller('LoginController', function($scope, $rootScope, $stateParams, $state, LoginService, $http) {
    $rootScope.title = "Please Login";
    
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
  
  app.controller('AddController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "Kingsport Egg Drop Data Entry";
    
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