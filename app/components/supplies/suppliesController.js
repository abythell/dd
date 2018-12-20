/* global angular */

angular.module('suppliesModule').controller('SuppliesController', ['suppliesService',
  'dateService', '$scope', 'userService', function (suppliesService,
    dateService, $scope, userService) {
    this.$onInit = function () {
      Promise.all([
        suppliesService.getSingleItemList().$loaded().then(function (items) {
          $scope.singleItems = items
        }),
        suppliesService.getMultiItemList().$loaded().then(function (items) {
          $scope.multiItems = items
        }),
        suppliesService.getSettings().$loaded().then(function (settings) {
          $scope.settings = settings
        })
      ]).then(function () {
        // Fetch new data when the date changes - this includes the initial load
        $scope.$watch(function () {
          return dateService.selectedDate
        }, function () {
          updateAmSupplies()
          updatePmSupplies()
          setEditable()
        }, true)
      })
    }

    var setEditable = function () {
      userService.isCurrentUserAdmin().then(function (admin) {
        if (admin | dateService.isToday()) {
          $scope.canEdit = true
        } else {
          $scope.canEdit = false
        }
      })
    }

    var updateAmSupplies = function () {
      suppliesService.getSupplies(dateService.selectedDate, 'am').$bindTo($scope, 'amSupplies')
    }

    var updatePmSupplies = function () {
      suppliesService.getSupplies(dateService.selectedDate, 'pm').$bindTo($scope, 'pmSupplies')
    }
  }])
