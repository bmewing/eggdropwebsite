(function() {
  var app = angular.module('myApp',[]);
  
  app.controller('search',function($scope, $http){
    $scope.searchTitle = "";
    $scope.matches = {};
    $scope.specificMatch = {};
    
    var options = {
      shouldSort: true,
      includeMatches: true,
      threshold: 0.5,
      location: 0,
      distance: 100,
      maxPatternLength: 100,
      minMatchCharLength: 1,
      keys: ["name"]
    };

    refreshData();
    
    function collapseNames(obj){
      if(obj.category == "Team"){
        obj.name = obj.team;
      } else {
        obj.name = obj.fname + ' ' + obj.lname;
      }
      return(obj)
    }
    
    function extractItems(obj){
      return(obj.item);
    }
    
    function refreshData(){
      $http.get('/api/drops')
      .then(function(data){
        var tmp = data.data;
        $scope.drops = tmp.map(collapseNames);
      })
    }
    
    function fs(){
      refreshData();
      var fuse = new Fuse($scope.drops, options); // "list" is the item array
      var result = fuse.search($scope.searchString);
      $scope.matches = result.map(extractItems);
      console.log($scope.matches);
      if($scope.matches.length > 0){
        $scope.searchTitle = "Results";
      } else {
        $scope.searchTitle = "No Matches Found";
      }
    }
    
    $scope.searchEntrants = function(){
      fs();
    }
    
  });
  
//   app.controller('Round2Finalists',function($scope, $rootScope, $stateParams, $state, LoginService, $http){
//     $rootScope.title = "Kingsport Egg Drop Data Entry"
//     refreshData();
    
//     function collapseNames(obj){
//       if(obj.category == "Team"){
//         obj.name = obj.team;
//       } else {
//         obj.name = obj.fname + ' ' + obj.lname;
//       }
//       return(obj)
//     }
    
//     function keepOnlyWithDrops(obj){
//       return(obj.drop.length > 0)
//     }
    
//     function kor2(obj){
//       return(obj.round == 2);
//     }
    
//     function keepOnlyRound2(obj){
//       obj.drop = obj.drop.filter(kor2)
//       return(obj)
//     }
    
//     function sortCategory(a,b) {
//       if (a.drop[0].score < b.drop[0].score)
//         return -1;
//       if (a.drop[0].score > b.drop[0].score)
//         return 1;
//       return 0;
//     }
    
//     function compare(a,b) {
//       if (a.name < b.name)
//         return -1;
//       if (a.name > b.name)
//         return 1;
//       return 0;
//     }
    
//     function refreshData(){
//       $http.get('/api/drops')
//       .then(function(data){
//         var tmp = data.data;
//         tmp = tmp.map(collapseNames);
//         $rootScope.drops = tmp.sort(compare);
//       })
//     }
    
//     function refreshRound2(){
//       var tmp = $rootScope.drops;
//       tmp = tmp.filter(keepOnlyWithDrops).map(keepOnlyRound2).filter(keepOnlyWithDrops);
//       console.log(tmp);
//       tmp = tmp.sort(sortCategory).slice(0,3);
//       $rootScope.round2drops = tmp;
//     }
    
//     $scope.fetchRound2Finalists = function(){
//       refreshRound2();
//     }
//   });
  
//   app.controller('AddController', function($scope, $rootScope, $stateParams, $state, LoginService, $http) {
//     $rootScope.title = "Kingsport Egg Drop Data Entry";
//     $scope.entrantData = {};
//     $scope.localdrop1 = {};
    
//     refreshData();
    
//     function compare(a,b) {
//       if (a.name < b.name)
//         return -1;
//       if (a.name > b.name)
//         return 1;
//       return 0;
//     }
    
//     function collapseNames(obj){
//       if(obj.category == "Team"){
//         obj.name = obj.team;
//       } else {
//         obj.name = obj.fname + ' ' + obj.lname;
//       }
//       return(obj)
//     }
    
//     function keepOnlyWithDrops(obj){
//       return(obj.drop.length === 1)
//     }
    
//     function keepOnlyWithoutDrops(obj){
//       return(obj.drop.length === 0);
//     }
    
//     function refreshData(){
//       $http.get('/api/drops')
//       .then(function(data){
//         var tmp = data.data;
//         tmp = tmp.map(collapseNames);
//         $rootScope.drops = tmp.sort(compare);
//         $rootScope.drop1done = tmp.sort(compare).filter(keepOnlyWithDrops);
//         $rootScope.drop1needed = tmp.sort(compare).filter(keepOnlyWithoutDrops);
//       })
//     }
    
//     function filterID(drop) {
//       return drop._id == $scope.drop1Data.dropID;
//     }
    
//     $scope.getSelectedDrops = function(){
//       $scope.localdrop1 = $rootScope.drops.filter(filterID)
//     }
    
//     function filterID2(drop) {
//       return drop._id == $scope.drop2Data.dropID;
//     }
    
//     $scope.getSelectedDrops2 = function(){
//       $scope.localdrop1 = $rootScope.drops.filter(filterID2)
//     }
    
//     $scope.createEntrant = function(){
//       var input = $scope.entrantData;
//       input.year = new Date().getFullYear();
      
//       $http.post('/api/drops', input)
//           .then(function(data){
//             $scope.entrantData = {};
//             refreshData();
//           });
//     }
    
//     $scope.deleteEntrant = function(){
//       var rem = $scope.deleteID;
//       $http.delete('/api/drops/'+rem)
//         .then(function(data){
//         refreshData();
//       })
//     }
    
//     $scope.recordDrop1 = function(){
//       var input = $scope.drop1Data;
//       input.round = 1;
//       input.score = !input.cracked * (((30*(input.dweight - input.eweight)) / 89) + (40 * input.zone / 10));
//       input.dt = new Date().getTime().toString();
//       console.log(input)
//       $http.post('/api/drops/'+input.dropID,input)
//         .then(function(data){
//           $scope.drop1Data = {};
//           refreshData();
//         })
//     }
    
//     $scope.recordDrop2 = function(){
//       var input = $scope.drop2Data;
//       input.round = 2;
//       input.score = !input.cracked * (((30*(input.dweight - input.eweight)) / 89) + (30 * input.nparts / 3) + (40 * input.zone / 10));
//       input.dt = new Date().getTime().toString();
//       console.log(input)
//       $http.post('/api/drops/'+input.dropID,input)
//         .then(function(data){
//           $scope.drop2Data = {};
//           refreshData();
//         })
//     }
    
//   });
  
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