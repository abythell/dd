/* global angular Firebase */

(function () {
  angular.module('loginModule').factory('loginService', ['$firebaseAuth',
    function ($firebaseAuth) {
      var firebaseUrl = 'https://brilliant-inferno-6689.firebaseio.com'
      var ref = new Firebase(firebaseUrl)
      return $firebaseAuth(ref)
    }])
})()
