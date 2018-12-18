/* global angular */

(function () {
  angular.module('notesModule').directive('abNotes', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/components/notes/notesView.html',
      controller: 'NotesController',
      controllerAs: 'notesCtrl'
    }
  })
})()
