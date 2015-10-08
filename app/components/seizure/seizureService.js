(function () {   
    angular.module('seizureModule').service('seizureService', ['$firebaseArray',
            '$filter', function ($firebaseArray, $filter) {

                /*
                 * URL of firebase app
                 */
                var firebaseUrl = 'https://brilliant-inferno-6689.firebaseio.com';
                var ref = new Firebase(firebaseUrl);

                this.getSeizure = function (date) {
                    var key = $filter('date')(date, "yyyy-MM-dd");
                    return $firebaseArray(ref.child('seizure').child(key));
                };

            }]);

})();