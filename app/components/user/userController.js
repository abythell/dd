/* global angular */

angular.module('userModule').controller('UserController', ['userService',
  '$scope', 'loginService', function (userService, $scope, loginService) {
    /*
             * On init, load list of users.
             */
    userService.getAllUsers().$loaded().then(function (users) {
      $scope.users = users
    })
  }])
