(function () {

    angular.module('seizureModule').controller('SeizureController', ['dateService',
        '$scope', 'userService', 'seizureService','$filter', function (dateService, $scope,
                userService, seizureService, $filter) {

            $scope.start = new Date();
            $scope.duration = 0;
            
            this.getDuration = function() {
                var min = Math.round($scope.duration / 60);
                var seconds = $scope.duration % 60;
                var date = new Date(0, 0, 0, 0, min, seconds);
                return $filter('date')(date, 'mm:ss');
            };
            
            /*
             * Determine if the seizure for this day can be changed or not.             
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

            var getActivity = function () {
                userService.getCurrentUser().$loaded().then(function (user) {
                    $scope.uuid = user.$id;
                }).then(function () {
                    $scope.activity = seizureService.getSeizure(dateService.selectedDate);
                });
            };

            this.addActivity = function () {
                userService.getCurrentUser().$loaded().then(function (user) {
                    var newActivity = {
                        who: user.name,
                        start: $scope.start,
                        duration: $scope.duration,
                        notes: $scope.notes,
                        uuid: user.$id
                    };
                    $scope.activity.$add(newActivity);
                    $scope.what = '';
                    $scope.start = '';
                    $scope.duration = '';
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