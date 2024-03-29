/* global angular */

angular.module('moodModule').controller('MoodController', ['moodService',
  'dateService', '$scope', 'userService', function (moodService,
    dateService, $scope, userService) {
    moodService.getMoodList().$loaded().then(function (list) {
      $scope.moodList = list
    })

    /**
             * Asyncronously load the mood data for the selected date.
             */
    const updateMood = function () {
      const moodAM = moodService.getMoods(dateService.selectedDate, 'am')
      moodAM.$loaded().then(function (data) {
        $scope.moodAM = data
      })

      const moodPM = moodService.getMoods(dateService.selectedDate, 'pm')
      moodPM.$loaded().then(function (data) {
        $scope.moodPM = data
      })
    }

    /**
             * Moods can only be edited for "today", unless the user is an
             * administrator in which case they can edit any day.
             * @returns {undefined}
             */
    const setEditable = function () {
      userService.isCurrentUserAdmin().then(function (admin) {
        if (admin | dateService.isToday()) {
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
      updateMood()
      setEditable()
    }, true)
  }])
