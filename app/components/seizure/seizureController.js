(function () {

    angular.module('seizureModule').controller('SeizureController', ['dateService',
        '$scope', 'userService', 'seizureService', '$filter', function (dateService, $scope,
                userService, seizureService, $filter) {

            /*
             * Convert seconds into mm:ss.  There are likely directives
             * and modules that can do this for us, but this is simple
             * enough not to warrant additional dependencies.
             */
            this.getDuration = function (ticks) {
                var min = Math.round(ticks / 60);
                var seconds = ticks % 60;
                var date = new Date(0, 0, 0, 0, min, seconds);
                return $filter('date')(date, 'mm:ss');
            };

            /*
             * Determine if the seizure for this day can be changed or not. 
             * Admins can add activity any day, but other users can only add
             * activity for 'today'.  Also, as enforced in the view, admins
             * can delete any observations they have recorded.  Other users
             * can only delete observations made by them "today".        
             */
            var setEditable = function () {
                userService.isCurrentUserAdmin().then(function (admin) {
                    if (admin | dateService.isToday()) {
                        $scope.canEdit = true;
                    } else {
                        $scope.canEdit = false;
                    }
                });
            };

            /*
             * Get a list of activity observations for the selected date.  Also
             * resets the form.  Called on initial load and whenever the date
             * changes.
             */
            var getActivity = function () {
                $scope.start = new Date();
                $scope.duration = 0;
                userService.getCurrentUser().$loaded().then(function (user) {
                    $scope.uuid = user.$id;
                    $scope.activity = seizureService.getSeizure(dateService.selectedDate);
                });
            };

            /*
             * Add a new observation.
             */
            this.addActivity = function () {
                userService.getCurrentUser().$loaded().then(function (user) {
                    var newActivity = {
                        who: user.name,
                        start: $scope.start.getTime(),
                        duration: $scope.duration,
                        notes: $scope.notes,
                        uuid: user.$id
                    };
                    $scope.activity.$add(newActivity);
                    
                    /*
                     * Reset the form.
                     */
                    $scope.what = '';
                    $scope.start = new Date();
                    $scope.duration = 0;
                    $scope.notes = '';
                });
            };

            /*
             * Fetch new data when the date changes - this includes the 
             * initial load.
             */
            $scope.$watch(function () {
                return dateService.selectedDate;
            }, function () {
                getActivity();
                setEditable();
            }, true);

        }]);

})();