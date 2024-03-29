/* global angular firebase */

angular.module('notesModule').service('notesService', ['$firebaseArray',
  '$filter', function ($firebaseArray, $filter) {
    const ref = firebase.database().ref()
    this.getNotes = function (date) {
      const key = $filter('date')(date, 'yyyy-MM-dd')
      return $firebaseArray(ref.child('notes').child(key))
    }
  }])
