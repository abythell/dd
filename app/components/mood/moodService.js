(function () {
    angular.module('moodModule').service('moodService', function () {
        
        //TODO: load and save moods to a data store
        this.mood = {
                happy: true          
            };
        
        this.getMood = function() {
            return this.mood;
        };
        
        this.setMood = function(mood) {           
           this.mood = mood;           
        };
        
        //TODO: define keys and values so we avoid spaces and underscores
        //where they are unwanted.
        this.moodList = [
            "happy",
            "smiles",
            "laughing",
            "upset",
            "crying",
            "pouting",
            "drooling",
            "wet_diaper",
            "tired",
            "slept",
            "coughing",
            "gagging",
            "phlegm",
            "running_nose",
            "pale",
            "BM",
            "GERD",
            "tolerated_feeds",
            "blood_in_tube",
            "lots_of_venting",
            "cuts_bruises_etc",
            "stretches",
            "standing_frame",
            "laundry"            
        ];

    });

})();