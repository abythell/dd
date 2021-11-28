/* global angular firebase */

angular.module('alertModule').service('alertService', ['$firebaseObject',
  '$filter', function ($firebaseObject, $filter) {
    const ref = firebase.database().ref()
    this.getAlert = function (date, tod) {
      const key = $filter('date')(date, 'yyyy-MM-dd')
      return $firebaseObject(ref.child('alerts').child(key))
    }

    this.getDefaultMessage = function () {
      return $firebaseObject(ref.child('config').child('defaultMessage'))
    }
  }])
