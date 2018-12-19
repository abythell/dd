/* global angular */

(function () {
  angular.module('loginModule').factory('loginService', ['$firebaseAuth',
    function ($firebaseAuth) {
      return $firebaseAuth()
    }])
})()
