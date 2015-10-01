(function () {

    angular.module('moodModule').controller('MoodController', ['moodService',
        '$rootScope', 'dateService', '$scope', 'userService', function (moodService,
                $rootScope, dateService, $scope, userService) {

            this.moodList = moodService.moodList;            

            var updateMood = function () {
                var moodAM = moodService.getMoods(dateService.selectedDate, 'am');
                moodAM.$loaded().then(function (data) {
                    $scope.moodAM = data;
                }).catch(function(error) {
                    console.log(error);                
                });
                
                var moodPM = moodService.getMoods(dateService.selectedDate, 'pm');
                moodPM.$loaded().then(function (data) {
                    $scope.moodPM = data;
                }).catch(function(error) {
                    console.log(error);                
                });
            };
            
            /**
             * Moods can only be edited for "today", unless the user is an 
             * administrator in which case they can edit any day.
             * @returns {undefined}
             */
            var setEditable = function () {
                var currentUser = userService.getCurrentUser();
                currentUser.$loaded().then(function(data) {
                    return data.admin;                    
                }).then(function(admin) {
                    if (admin | dateService.isToday()) {
                        $scope.canEdit = true;
                    } else {
                        $scope.canEdit = false;
                    }
                });
            }
            
            /*
             * Set initial state.
             */
            updateMood();
            setEditable();

            /*
             * Update the data when the date changes.
             */
            $rootScope.$on('dateChangeEvent', function (event, date) {
               updateMood(); 
               setEditable();
            });            
            
        }]);

})();