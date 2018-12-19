/* global angular */

angular.module('alertModule').directive('abAlert', function () {
  return {
    restrict: 'E',
    templateUrl: 'app/components/alert/alertView.html',
    controller: 'AlertController',
    controllerAs: 'alertCtrl'
  }
})
