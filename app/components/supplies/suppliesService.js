/* global angular firebase */

angular.module('suppliesModule').service('suppliesService', ['$firebaseObject',
  '$filter', '$firebaseArray', function ($firebaseObject, $filter, $firebaseArray) {
    var ref = firebase.database().ref()

    this.getSingleItemList = function () {
      return $firebaseArray(ref.child('config').child('supplies').child('single'))
    }

    this.getMultiItemList = function () {
      return $firebaseArray(ref.child('config').child('supplies').child('multi'))
    }

    this.getSettings = function () {
      return $firebaseObject(ref.child('config').child('supplies').child('settings'))
    }

    this.getSupplies = function (date, tod) {
      var key = $filter('date')(date, 'yyyy-MM-dd')
      return $firebaseObject(ref.child('supplies').child(key).child(tod))
    }
  }])
