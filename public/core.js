var eggDrop = angular.module('eggDrop',[]);

function mainController($scope, $http){
  $scope.entrantData = {};
  $scope.dropData = {};
  
  $http.get('/api/drops')
    .success((data)=>{
      $scope.drops = data;
      console.log(data);
    })
    .error((data)=>{
      console.log('Error: '+data);
    });
  
  $scope.createEntrant = function(){
    $http.post('/api/drops', $scope.entrantData)
      .succes((data)=>{
        $scope.entrantData = {};
        $scope.drops = data
        console.log(data);
      })
      .error((data)=>{
        console.log('Error: '+data);
      });
  }
  
  $scope.deleteEntrant = function(){
    $http.delete('/api/drops/'+id)
      .succes((data)=>{
        $scope.drops = data
        console.log(data);
      })
      .error((data)=>{
        console.log('Error: '+data);
      });
  };
  
  $scope.modifyEntrant = function(){
    $http.patch('/api/drops/'+id,$scope.entrantData)
      .succes((data)=>{
        $scope.entrantData = {};
        $scope.drops = data
        console.log(data);
      })
      .error((data)=>{
        console.log('Error: '+data);
      });
  };
}