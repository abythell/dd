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
          $scope.amSupplies = suppliesService.getSupplies(dateService.selectedDate, 'am')
          $scope.pmSupplies = suppliesService.getSupplies(dateService.selectedDate, 'pm')
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

    $scope.increment = function (obj, index) {
      var value = obj[index] || 0
      value = (value < $scope.settings.maxQty) ? value + 1 : $scope.settings.maxQty
      obj[index] = value
      obj.$save()
    }

    $scope.decrement = function (obj, index) {
      var value = obj[index] || 0
      value = (value === 0) ? 0 : value - 1
      obj[index] = value
      obj.$save()
      /* some comment */
    }
  }])
