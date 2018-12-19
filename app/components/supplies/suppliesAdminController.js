/* global angular */

angular.module('suppliesModule').controller('SuppliesAdminController', ['suppliesService',
  '$scope', function (suppliesService, $scope) {
    suppliesService.getSingleItemList().$loaded().then(function (items) {
      $scope.singleItems = items
    })

    suppliesService.getMultiItemList().$loaded().then(function (items) {
      $scope.multiItems = items
    })

    suppliesService.getSettings().$loaded().then(function (settings) {
      $scope.settings = settings
      settings.$bindTo($scope, 'settings')
    })
  }])
