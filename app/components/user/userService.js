(function () {

    angular.module('userModule').factory('userService', ['$firebaseObject',
        '$rootScope', 'loginService', function ($firebaseObject, $rootScope,
        loginService) {
            
            var ref = new Firebase($rootScope.firebaseUrl);            
            
            var userService = {};
            
            /**
             * Get the firebaseObject for a user
             * @param {type} uid - Firebase registered user UID
             * @returns firebaseObject containing the name of the user.
             */
            userService.getUser = function(uid) {
                return $firebaseObject(ref.child('users').child(uid));
            };
            
            /**
             * Get the firebaseObject for the current user
             * @returns firebaseObject or null if no user is logged in.
             */
            userService.getCurrentUser = function() {
                var authData = loginService.$getAuth();
                if (authData) {
                    return $firebaseObject(ref.child('users').child(authData.uid));                
                } else {
                    return null;
                }
            };
            
            return userService;
                                    
        }]);

})();

