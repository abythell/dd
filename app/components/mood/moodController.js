(function () {

    angular.module('moodModule').controller('MoodController', ['moodService',
        '$rootScope', 'dateService', function (moodService, $rootScope, dateService) {
            
            this.moodList = moodService.moodList;
            var mood = moodService.getMoods(dateService.selectedDate);
           
            this.mood = function() {
                return mood;
            }
            
            this.editable = function() {
                return dateService.isToday();
            }
            
            this.save = function() {
                if (this.editable()) {
                    mood.$save();
                }
            }
            
            /*
             * Update the data when the date changes.
             */
            $rootScope.$on('dateChangeEvent', function (event, date) {
                mood = moodService.getMoods(date);
            });
            
        }]);

})();