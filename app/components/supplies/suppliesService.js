(function () {
    angular.module('suppliesModule').service('suppliesService', ['$firebaseObject',
        '$filter', function ($firebaseObject, $filter) {

            /*
             * URL of firebase app
             */
            var firebaseUrl = 'https://brilliant-inferno-6689.firebaseio.com';
            var ref = new Firebase(firebaseUrl);

            /*
             * List supplies here.  You can add new ones as needed, but
             * removing or renaming supplies will affect historical data.  These
             * will be shown as a simple button (selected or unselected).
             */
            this.singleItemsList = [
                'Diapers',
                'Medicine Syringe 10cc',
                'Flushing Syringe 20cc',
                'Venting Syringe 60cc',
                'Feeding Tube (thin, bent)',
                'Venting Tube (thick, straight)',
                'Duocal',
                'Baclofen',
                'Pill Crusher',
                'Bottle (mix meds)'
            ];
            
            /*
             * List supplies that have specific quantities here.  These will
             * be shown with a slider allowing the user to select a value
             * between 1 and 5.
             */
            this.multiItemsList  = [
                'Food',
                'Syringe Tips'
            ];
                        
            this.getSupplies = function (date) {
                var key = $filter('date')(date, "yyyy-MM-dd");
                return $firebaseObject(ref.child('supplies').child(key));
            };

        }]);

})();