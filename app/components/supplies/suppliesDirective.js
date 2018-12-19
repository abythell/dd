/* global angular */

angular.module('suppliesModule').directive('abSupplies', function () {
  return {
    restrict: 'E',
    templateUrl: 'app/components/supplies/suppliesView.html',
    controller: 'SuppliesController',
    controllerAs: 'suppliesCtrl'
  }
})

angular.module('suppliesModule').directive('abSuppliesadmin', function () {
  return {
    restrict: 'E',
    templateUrl: 'app/components/supplies/suppliesViewAdmin.html',
    controller: 'SuppliesAdminController',
    controllerAs: 'suppliesAdminCtrl'
  }
})
