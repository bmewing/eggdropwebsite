var app = angular
    .module('app', ['ngRoute','ngCookies'])
    .config(config)
    .run(run);
  
config.$inject = ['$routeProvider','$locationProvider'];
function config($routeProvider,$locationProvider){
  $routeProvider
    .when('/', {
      controller: 'results',
      templateUrl: 'results/results.html',
      controllerAs: 'vm'
    })
//     .when('/login',{
//       controller: 'loginController',
//       templateUrl: 'login/login.html',
//       controllerAs: 'vm'
//     })
//     .when('/data',{
//       controller: 'dataController',
//       templateUrl: 'data/data.html',
//       controllerAs: 'vm'
//     })
    .otherwise({ redirectTo: '/' });
}

run.$inject = ['$rootScope','$location','$cookies','$http'];
function run($rootScope,$location,$cookies,$http){
  $rootScope.globals = $cookies.getObject('globals') || {};
  if ($rootScope.globals.currentUser) {
    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
  }

  $rootScope.$on('$locationChangeStart', function (event, next, current) {
      // redirect to login page if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path(), ['/login', '/']) === -1;
      var loggedIn = $rootScope.globals.currentUser;
      if (restrictedPage && !loggedIn) {
          $location.path('/login');
      }
  });
}