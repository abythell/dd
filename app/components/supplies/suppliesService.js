(function () {
    angular.module('suppliesModule').service('suppliesService', ['$firebaseObject',
        '$filter', '$firebaseArray', function ($firebaseObject, $filter, $firebaseArray) {

            /*
             * URL of firebase app
             */
            var firebaseUrl = 'https://brilliant-inferno-6689.firebaseio.com';
            var ref = new Firebase(firebaseUrl);
                        
            this.getSingleItemList = function() {
              return $firebaseArray(ref.child('config').child('supplies').child('single'));  
            };
            
            this.getMultiItemList = function() {
                return $firebaseArray(ref.child('config').child('supplies').child('multi'));  
            };
                                    
            this.getSupplies = function (date, tod) {
                var key = $filter('date')(date, "yyyy-MM-dd");
                return $firebaseObject(ref.child('supplies').child(key).child(tod));
            };

        }]);

})();