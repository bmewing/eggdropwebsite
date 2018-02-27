var eggDrop = angular.module('eggDrop',[]);

eggDrop.controller('mainController',function($scope,$http){
  $scope.entrantData = {};
  $scope.drops = {};
  $scope.year = new Date().getFullYear()
  
  var getData = function(){
    $http.get('/api/drops')
    
    .then(function(response){
      $scope.drops = response.data;
      $scope.status = response.status;
    })
    .catch(function(error){
      $scope.status = error.status;
    })
  }
  
  $scope.createEntrant = function(){
    var input = $scope.entrantData;
    input.year = new Date().getFullYear();
    $http.post('/api/drops', $scope.entrantData)
      .then(function(response){
        $scope.entrantData = {};
        getData();
        console.log(response);
      })
  }
  
  getData();
});

// function mainController($scope, $http){
//   $scope.entrantData = {};
//   $scope.drops = {};
  
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