/* global angular */

angular.module('userModule').controller('UserController', ['userService',
  '$scope', 'loginService', function (userService, $scope, loginService) {
    /*
             * On init, load list of users.
             */
    userService.getAllUsers().$loaded().then(function (users) {
      $scope.users = users
    })
    /**
     * This is now handled by a Firebase cloud function, as the $createUser
     * method has been replaced with $createUserWithEmailandPassword, which
     * creates the user but also signs-them in, which does not allow the
     * user profile to be created.
     */
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
        }
        $scope.users.$save()
      })
    }
  }])
