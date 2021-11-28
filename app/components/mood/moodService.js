/* global angular firebase */

angular.module('moodModule').service('moodService', ['$firebaseObject',
  '$firebaseArray', '$filter', function ($firebaseObject, $firebaseArray, $filter) {
    const ref = firebase.database().ref()

    this.getMoodList = function () {
      return $firebaseArray(ref.child('config').child('moods'))
    }

    this.getMoods = function (date, tod) {
      const key = $filter('date')(date, 'yyyy-MM-dd')
      return $firebaseObject(ref.child('mood').child(key).child(tod))
    }
  }])
