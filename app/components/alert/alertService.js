(function () {
    angular.module('alertModule').service('alertService', ['$firebaseObject', 
        '$filter', function ($firebaseObject, $filter) {

            /*
             * URL of firebase app
             */            
            var firebaseUrl = 'https://brilliant-inferno-6689.firebaseio.com';
            var ref = new Firebase(firebaseUrl);
           
           /*
            * Fetch object data from <firebase-url>/mood/
            */
            this.getAlert = function(date, tod) {
                var key = $filter('date')(date, "yyyy-MM-dd");
                return $firebaseObject(ref.child('alerts').child(key));
            };
            
            this.getDefaultMessage = function() {
              return $firebaseObject(ref.child('config').child('defaultMessage'));  
            };

        }]);

})();