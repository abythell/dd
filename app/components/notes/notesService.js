(function () {   
    angular.module('notesModule').service('notesService', ['$firebaseArray',
            '$filter', function ($firebaseArray, $filter) {

                /*
                 * URL of firebase app
                 */
                var firebaseUrl = 'https://brilliant-inferno-6689.firebaseio.com';
                var ref = new Firebase(firebaseUrl);

                this.getNotes = function (date) {
                    var key = $filter('date')(date, "yyyy-MM-dd");
                    return $firebaseArray(ref.child('notes').child(key));
                };

            }]);

})();