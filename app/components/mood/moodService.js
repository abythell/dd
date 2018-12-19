/* global angular firebase */
(function () {
  angular.module('moodModule').service('moodService', ['$firebaseObject',
    '$firebaseArray', '$filter', function ($firebaseObject, $firebaseArray, $filter) {
      var ref = firebase.database().ref()

      this.getMoodList = function () {
        return $firebaseArray(ref.child('config').child('moods'))
      }

      this.getMoods = function (date, tod) {
        var key = $filter('date')(date, 'yyyy-MM-dd')
        return $firebaseObject(ref.child('mood').child(key).child(tod))
      }
    }])
})()
