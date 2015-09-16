(function () {
    angular.module('moodModule').factory('moodService', ['$rootScope', 'dateService',
        function ($rootScope, dateService) {

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


            var moodService = {};
            
            moodService.data = {};

            moodService.moodList = moodList;

            moodService.load = function () {
                if (dateService.isToday()) {
                    moodService.data = {happy: true}; //TODO: fetch real data
                } else {
                    moodService.data = {};
                }
            };

            moodService.save = function (name) {
                //TODO: save to data store
            };

            moodService.get = function () {
                return moodService.data;
            };

            /*
             * Update the data when the date changes.
             */
            $rootScope.$on('dateChangeEvent', function (event, date) {
                moodService.load(date);
            });

            moodService.load(); //Set initial value
            return moodService;

        }]);

})();