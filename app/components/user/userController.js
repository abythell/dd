(function () {

    angular.module('userModule').controller('UserController', ['userService',
        '$scope', function (userService, $scope) {

            /*
             * On init, load list of users.
             */
            userService.getAllUsers().$loaded().then(function (users) {
                $scope.users = users;
            });
            
            this.addUser = function() {
              //TODO: implement this.  
            };

        }]);

})();