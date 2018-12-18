/* global angular */
(function () {
  angular.module('moodModule').directive('abMoods', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/components/mood/moodView.html',
      controller: 'MoodController',
      controllerAs: 'moodCtrl'
    }
  })

  angular.module('moodModule').directive('abMoodsadmin', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/components/mood/moodViewAdmin.html',
      controller: 'MoodAdminController',
      controllerAs: 'moodAdminCtrl'
    }
  })
})()
