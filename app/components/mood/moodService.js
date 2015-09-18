(function () {
    angular.module('moodModule').service('moodService', ['$firebaseObject', 
        '$filter', function ($firebaseObject, $filter) {

            /*
             * URL of firebase app
             */
            var ref = new Firebase('https://brilliant-inferno-6689.firebaseio.com');

            /*
             * List all 'moods' here.
             * 
             */
            var moodList = [
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

            this.moodList = moodList;
           
           /*
            * Fetch object data from <firebase-url>/yyyy-MM-dd/mood
            */
            this.getMoods = function(date) {
                var key = $filter('date')(date, "yyyy-MM-dd");
                return $firebaseObject(ref.child('mood').child(key));
            };

        }]);

})();