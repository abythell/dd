/* global angular */

(function () {
  angular.module('dateModule').directive('abDate', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/components/date/dateView.html',
      controller: 'DateController',
      controllerAs: 'dateCtrl'
    }
  })
})()
