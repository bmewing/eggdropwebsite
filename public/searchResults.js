(function() {
  var app = angular.module('myApp',[],function($locationProvider){
    $locationProvider.html5Mode(true);
  });
  
  app.controller('results',function($scope, $http, $location, $rootElement){
    $scope.ind = {};
    
    $scope.drop1title = '';
    $scope.drop1dweight = '';
    $scope.drop1eweight = '';
    $scope.drop1zone = '';
    $scope.drop1score = '';
    $scope.drop2title = '';
    $scope.drop2dweight = '';
    $scope.drop2eweight = '';
    $scope.drop2zone = '';
    $scope.drop2score = '';
    $scope.drop1topScore = '';
    $scope.drop1topScoreWarning = '';
    $scope.contender = false;
    
    var id = $location.path().split('/')[2];
    
    function kor1(obj){
      return(obj.round == 1);
    }
    
    function kor2(obj){
      return(obj.round == 2);
    }
    
    function getTopScore(cat,score){
      $http.get('/api/top/'+cat)
      .then(function(data){
        var tmp = data.data;
        $scope.topScore = tmp;
        
        var buffer = new ArrayBuffer(4);
        var intView = new Int32Array(buffer);
        var floatView = new Float32Array(buffer);
        floatView[0] = tmp;
        
        var tmpint = intView[0];
        
        floatView[0] = score;
        
        var scoreint = intView[0];
        
        if(scoreint <= tmpint){
          $scope.drop1topScore = 'You are in the top 3 of your category!';
          $scope.contender = true;
        } else {
          $scope.drop1topScore = '';
        }
      })
    }
    
    function getStage(){
      var thisYear = new Date().getFullYear()
      $http.get('/api/stage/'+thisYear)
      .then(function(data){
        var tmp = data.data.stage;
        $scope.stage = tmp;
        if(tmp < 2 && $scope.contender){
          $scope.drop1topScoreWarning = ' (note: this is subject to change as drops are still occurring)';
        } else {
          $scope.drop1topScoreWarning = '';
        }
      })
    }
    
    function getData(id){
      $http.get('/api/drops/'+id)
      .then(function(data){
        var tmp = data.data;
        if(tmp.category == "Team"){
          tmp.name = tmp.team;
        } else {
          tmp.name = tmp.fname + ' ' + tmp.lname;
        }
        
        var drop1 = tmp.drop.filter(kor1);
        var drop2 = tmp.drop.filter(kor2);
        
        if(drop1.length == 1){
          var d1 = drop1[0];
          $scope.drop1title = 'Round 1 Drop Results';
          if(d1.cracked == null){
            $scope.drop1score = 'Round 1 Score: '+d1.score.toFixed(2);
            getTopScore(tmp.category,d1.score);
            getStage();
          } else {
            $scope.drop1score = 'Sorry, but your egg broke.';
          }
          $scope.drop1dweight = 'Device Weight: '+d1.dweight;
          $scope.drop1eweight = 'Egg Weight: '+d1.eweight;
          $scope.drop1zone = 'Drop Zone: '+d1.zone;
        } else {
          $scope.drop1title = 'No drops recorded yet';
        }
        
        if(drop2.length == 1){
          var d2 = drop2[0];
          $scope.drop2title = 'Round 2 Drop Results';
          if(d2.cracked == null){
            $scope.drop2score = 'Round 2 Score: '+d2.score.toFixed(2);
          } else {
            $scope.drop2score = 'Sorry, but your egg broke.';
          }
          $scope.drop2dweight = 'Device Weight: '+d2.dweight;
          $scope.drop2eweight = 'Egg Weight: '+d2.eweight;
          $scope.drop2zone = 'Drop Zone: '+d2.zone;
          $scope.drop2nparts = '# of Parts: '+d2.nparts;
        }
        
        $scope.ind = tmp;
      })
    }
    
    getData(id);
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