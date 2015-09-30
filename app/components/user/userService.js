(function () {

    angular.module('userModule').factory('userService', ['$firebaseObject',
        '$rootScope', function ($firebaseObject, $rootScope) {
            
            var ref = new Firebase($rootScope.firebaseUrl);            
            
            return function(uid) {
                return $firebaseObject(ref.child('users').child(uid));            
            };
                                    
        }]);

})();

