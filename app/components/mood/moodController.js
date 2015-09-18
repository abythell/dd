(function () {

    angular.module('moodModule').controller('MoodController', ['moodService',
        '$rootScope', 'dateService', function (moodService, $rootScope, dateService) {
            
            this.moodList = moodService.moodList;
            var moodAM = moodService.getMoods(dateService.selectedDate, 'am');
            var moodPM = moodService.getMoods(dateService.selectedDate, 'pm');
           
            this.moodAM = function() {
                return moodAM;
            };
            
            this.moodPM = function() {
                return moodPM;
            };
            
            this.editable = function() {
                return dateService.isToday();
            };
            
            this.saveAM = function() {
                if (this.editable()) {
                    moodAM.$save();
                }
            };
            
            this.savePM = function() {
                if (this.editable()) {
                    moodPM.$save();
                }
            };
            
            /*
             * Update the data when the date changes.
             */
            $rootScope.$on('dateChangeEvent', function (event, date) {
                moodAM = moodService.getMoods(date, 'am');
                moodPM = moodService.getMoods(date, 'pm');
            });
            
        }]);

})();