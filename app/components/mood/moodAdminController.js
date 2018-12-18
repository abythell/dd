/* global angular */

(function () {
  angular.module('moodModule').controller('MoodAdminController', ['moodService',
    '$scope', function (moodService, $scope) {
      moodService.getMoodList().$loaded().then(function (list) {
        $scope.moodList = list
      })
    }])
})()
