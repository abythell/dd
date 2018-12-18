/* global angular */

(function () {
  angular.module('alertModule').controller('AlertController', ['alertService',
    'dateService', '$scope', 'userService', function (alertService,
      dateService, $scope, userService) {
      /*
             * Load the default message from the data store.
             */
      var defaultMessage = ''
      alertService.getDefaultMessage().$loaded().then(function (msg) {
        defaultMessage = msg
      })

      /*
             * When hidden, the alert message is not shown.
             */
      this.hidden = false

      /*
             * In edit mode, a text area is displayed instead of the alert.
             */
      this.editMode = false

      /*
             * Switch from alert to edit mode.
             */
      this.edit = function () {
        if ($scope.canEdit) {
          if ($scope.alert.$value === defaultMessage.$value) {
            this.previousMessage = defaultMessage.$value
            $scope.alert.$value = ''
          }
          this.editMode = true
        }
      }

      /*
             * Save text and switch back to alert mode.  Edited alerts
             * are displayed in a "danger" style alert.
             */
      this.save = function () {
        this.editMode = false
        if ($scope.alert.$value.length > 0) {
          $scope.alert.$save()
          $scope.alertClass = 'alert-danger'
        } else {
          $scope.alert.$value = defaultMessage.$value
        }
      }

      /*
             * Cancel editing.  Return the message to the previous one.
             */
      this.cancel = function () {
        this.editMode = false
        if (this.previousMessage) {
          $scope.alert.$value = this.previousMessage
        }
      }

      /*
             * Clear the text box.
             */
      this.clear = function () {
        this.previousMessage = $scope.alert.$value
        $scope.alert.$value = ''
      }

      /*
             * Remove the custom message and revert back to the default.
             */
      this.reset = function () {
        this.editMode = false
        $scope.alert.$remove().then(function () {
          $scope.alert.$value = defaultMessage.$value
        })

        $scope.alertClass = 'alert-warning'
      }

      /*
             * Set a new default message.
             */
      this.setDefault = function () {
        defaultMessage.$value = $scope.alert.$value
        defaultMessage.$save()
      }

      /**
             * Asyncronously load the alert data for the selected date.
             */
      var updateAlert = function () {
        var alert = alertService.getAlert(dateService.selectedDate)
        alert.$loaded().then(function (data) {
          $scope.alert = data
          if (data.$value === null) {
            data.$value = defaultMessage.$value
            $scope.alertClass = 'alert-warning'
          } else {
            $scope.alertClass = 'alert-danger'
          }
        })
      }

      /**
             * Alerts can only be edited by admins.
             */
      var setEditable = function () {
        userService.isCurrentUserAdmin().then(function (admin) {
          if (admin) {
            $scope.canEdit = true
          } else {
            $scope.canEdit = false
          }
        })
      }

      /*
             * Fetch new data when the date changes - this includes the
             * initial load.
             */
      $scope.$watch(function () {
        return dateService.selectedDate
      }, function () {
        updateAlert()
        setEditable()
      }, true)
    }])
})()
