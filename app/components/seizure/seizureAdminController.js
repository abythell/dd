/* global angular */

(function () {
  angular.module('seizureModule').controller('SeizureAdminController', SeizureAdminController)
  SeizureAdminController.$inject = ['$scope', 'seizureService', '$q', '$filter']

  function SeizureAdminController ($scope, seizureService, $q, $filter) {
    var seizureAdminCtrl = this
    seizureAdminCtrl.export = exportCSV

    /*
         * Set datepickers to today's date.
         */
    $scope.startDate = new Date()
    $scope.endDate = new Date()

    /*
         * Header for CSV data.
         */
    $scope.csvHeader = [
      'Date',
      'Time',
      'Duration',
      'Name',
      'Notes'
    ]

    /*
         * Create a promise that resolves with the requested activity data.
         */
    function exportCSV () {
      var defer = $q.defer()
      var csvData = []

      /*
             * Loop through every day between the start and end dates, creating
             * a list of promises that will push activity data on the main
             * array once resolved.
             */
      /* jshint -W083 */
      var promises = []
      for (var d = new Date($scope.startDate); d <= $scope.endDate; d.setDate(d.getDate() + 1)) {
        var promise = seizureService.getSeizure(d).$loaded().then(function (data) {
          for (var i = 0; i < data.length; i++) {
            var activity = {
              date: $filter('date')(data[i].start, 'yyyy-MM-dd'),
              time: $filter('date')(data[i].start, 'HH:mm'),
              duration: data[i].duration,
              who: data[i].who,
              notes: data[i].notes
            }
            csvData.push(activity)
          }
          return 'done'
        })
        promises.push(promise)
      }

      /*
             * Wait until all the data has been pushed onto the main array
             * before resolving the 'master' promise.
             */
      $q.all(promises).then(function () {
        defer.resolve(csvData)
      })

      return defer.promise
    }
  }
})()
