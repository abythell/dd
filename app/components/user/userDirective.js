/* global angular */
(function () {
  angular.module('userModule').directive('abUsers', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/components/user/userView.html',
      controller: 'UserController',
      controllerAs: 'userCtrl'
    }
  })
})()
