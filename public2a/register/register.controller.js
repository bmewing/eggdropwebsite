(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();

// (function () {
//     'use strict';

//     angular
//         .module('app')
//         .controller('RegisterController', RegisterController);

//     RegisterController.$inject = ['$location', '$rootScope', 'FlashService','$http'];
//     function RegisterController($location, $rootScope, FlashService,$http) {
//         var vm = this;

//         vm.register = register;

//         function register() {
          
//           var input = vm.user;
//           input.year = new Date().getFullYear();
//           $http.post('/api/drops', $scope.entrantData)
//             .then(function(response){
//               if (response.success){
//                 vm.user = {};
//                 FlashService.Success('Registration successful', true);
//               } else {
//                 FlashService.Error(response.message);
//               }
              
//             })
//         }
//     }

// })();
