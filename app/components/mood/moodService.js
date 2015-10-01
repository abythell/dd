(function () {
    angular.module('moodModule').service('moodService', ['$firebaseObject', 
        '$filter', function ($firebaseObject, $filter) {

            /*
             * URL of firebase app
             */            
            var firebaseUrl = 'https://brilliant-inferno-6689.firebaseio.com';
            var ref = new Firebase(firebaseUrl);

            /*
             * List all 'moods' here.  You can add new ones as needed, but
             * removing or renaming a mood will affect historical data.
             */
            var moodList = [
                "happy",
                "smiles",
                "laughing",
                "upset",
                "crying",
                "pouting",
                "drooling",
                "wet diaper",
                "tired",
                "slept",
                "coughing",
                "gagging",
                "phlegm",
                "running nose",
                "pale",
                "BM",
                "GERD",
                "tolerated feeds",
                "blood in tube",
                "lots of venting",
                "cuts, bruises, etc.",
                "stretches",
                "standing frame",
                "laundry"
            ];

            this.moodList = moodList;
           
           /*
            * Fetch object data from <firebase-url>/mood/
            */
            this.getMoods = function(date, tod) {
                var key = $filter('date')(date, "yyyy-MM-dd");
                return $firebaseObject(ref.child('mood').child(key).child(tod));
            };

        }]);

})();