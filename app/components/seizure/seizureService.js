/* global angular firebase */

angular.module('seizureModule').service('seizureService', ['$firebaseArray',
  '$filter', function ($firebaseArray, $filter) {
    var ref = firebase.database().ref()
    this.getSeizure = function (date) {
      var key = $filter('date')(date, 'yyyy-MM-dd')
      return $firebaseArray(ref.child('seizure').child(key))
    }
  }])
