/* global angular Firebase */
(function () {
  angular.module('moodModule').service('moodService', ['$firebaseObject',
    '$firebaseArray', '$filter', function ($firebaseObject, $firebaseArray,
      $filter) {
      /*
             * URL of firebase app
             */
      var firebaseUrl = 'https://brilliant-inferno-6689.firebaseio.com'
      var ref = new Firebase(firebaseUrl)

      this.getMoodList = function () {
        return $firebaseArray(ref.child('config').child('moods'))
      }

      /*
            * Fetch object data from <firebase-url>/mood/
            */
      this.getMoods = function (date, tod) {
        var key = $filter('date')(date, 'yyyy-MM-dd')
        return $firebaseObject(ref.child('mood').child(key).child(tod))
      }
    }])
})()
