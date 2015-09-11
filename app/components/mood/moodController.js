(function () {

    angular.module('moodModule').controller('MoodController', ['dateService', 
        'moodService', function (dateService, moodService) {
        
            //load current mood
             this.mood = moodService.getMood();
             
             //a list of all moods
             this.moods = moodService.moodList;
                          
             this.save = function() {
                 moodService.setMood(this.mood);
             };                                       
    }]);

})();