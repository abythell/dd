(function () {

    angular.module('seizureModule').controller('SeizureAdminController', ['$scope', 
        'seizureService', '$q', '$filter', function ($scope, seizureService, $q, $filter) {
                    
            /*
             * Set datepickers to today's date.
             */
            $scope.startDate = new Date();
            $scope.endDate = new Date();
            
            /*
             * This will get populated with the CSV data.
             */
            $scope.data = [];
            
            /*
             * Header for CSV data.
             */
            $scope.csvHeader = [
                'Date',
                'Time',
                'Duration',
                'Name',
                'Notes'
            ];
            
            /*
             * Create a promise that resolves with the requested activity data.
             */
            this.export = function() {                                                                
                var defer = $q.defer();
                                
                /*
                 * Loop through every day between the start and end dates, creating
                 * a list of promises that will push activity data on the main
                 * array once resolved.
                 */                
                var promises = [];
                for (var d = new Date($scope.startDate); d <= $scope.endDate; d.setDate(d.getDate() + 1)) {
                    var promise = seizureService.getSeizure(d).$loaded().then(function (data) {                                                
                        for (var i=0; i< data.length; i++) {                                                        
                            var activity = {
                                date: $filter('date')(data[i].start, 'yyyy-MM-dd'),
                                time: $filter('date')(data[i].start, 'HH:mm'),
                                duration: data[i].duration,
                                who: data[i].who,
                                notes: data[i].notes
                            };
                            $scope.data.push(activity);
                        }                        
                        return 'done';
                    });
                    promises.push(promise);                    
                }
                
                /*
                 * Wait until all the data has been pushed onto the main array
                 * before resolving the 'master' promise.
                 */
                $q.all(promises).then(function() {                    
                    defer.resolve($scope.data);                    
                });
                                
                return defer.promise;
            };
                        
        }]);

})();