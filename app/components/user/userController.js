(function () {

    angular.module('userModule').controller('UserController', ['userService',
        '$scope', 'loginService', function (userService, $scope, loginService) {

            /*
             * On init, load list of users.
             */
            userService.getAllUsers().$loaded().then(function (users) {
                $scope.users = users;
            });
            this.addUser = function () {

                loginService.$createUser({
                    email: $scope.email,
                    password: $scope.password
                }).then(function (userData) {
                    $scope.users[userData.uid] = {
                        name: $scope.name,
                        email: $scope.email,
                        active: true,
                        admin: false
                    };
                    $scope.users.$save();
                });

            };
        }]);
})();