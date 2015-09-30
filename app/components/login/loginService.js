(function () {

    angular.module('loginModule').factory('loginService', ['$firebaseAuth',
        '$rootScope', function ($firebaseAuth, $rootScope) {
            var ref = new Firebase($rootScope.firebaseUrl);
            return $firebaseAuth(ref);            

        }]);

})();

