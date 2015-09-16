(function () {

    angular.module('moodModule').controller('MoodController', ['moodService',
        function (moodService) {
            
            this.moodList = moodService.moodList;
            
            /**
             * Bind the model to the get() function.  Notice how it binds to
             * the function, not the results of the function.
             */
            this.mood = moodService.get;            
            
            /*
             * Send button state back to the service as soon as it changes.
             * This avoids having to use a separate "save" button.
             */
            this.save = function(moodName) {
                moodService.save(moodName);
            }
            
        }]);

})();