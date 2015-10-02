(function () {
    angular.module('suppliesModule').service('suppliesService', ['$firebaseArray',
        '$filter', function ($firebaseArray, $filter) {

            /*
             * URL of firebase app
             */
            var firebaseUrl = 'https://brilliant-inferno-6689.firebaseio.com';
            var ref = new Firebase(firebaseUrl);
            var suppliesService = {};

            /*
             * List all 'supplies' here.  You can add new ones as needed, but
             * removing or renaming supplies will affect historical data.
             */
            var supplies = [
                {name: 'Diapers', max: 5},
                {name: 'Medicine Syringe 10cc', max: 5},
                {name: 'Flushing Syringe 20cc', max: 5},
                {name: 'Venting Syringe 60cc', max: 5},
                {name: 'Feeding Tube (thin, bent)', max: 5},
                {name: 'Venting Tube (thick, straight)', max: 5},
                {name: 'Duocal', max: 5},
                {name: 'Baclofen', max: 5},
                {name: 'Pill Crusher', max: 5},
                {name: 'Bottle (mix meds)', max: 5},
                {name: 'Food', max: 5},
                {name: 'Syringe Tips', max: 5}
            ];
                        
            var getDefaultItemList = function () {                
                for (var i = 0; i < supplies.length; i++) {
                    supplies[i].qty = 0;                    
                    supplies[i].selected = false;
                    supplies[i].label = supplies[i].name;
                };
                return supplies;
            };

            this.getSupplies = function (date) {
                var key = $filter('date')(date, "yyyy-MM-dd");
                var obj = $firebaseArray(ref.child('supplies').child(key));
                obj.$loaded().then(function(data) {
                    if (data.length === 0) {
                        var items = getDefaultItemList();
                        for (var i=0; i< items.length; i++) {
                            obj.$add(items[i]);
                        }                        
                    }
                });
                return obj;
            };

        }]);

})();