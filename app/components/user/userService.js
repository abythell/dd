(function () {

    angular.module('userModule').factory('userService', ['$firebaseObject',
        'loginService', function ($firebaseObject, loginService) {
            
            var firebaseUrl = 'https://brilliant-inferno-6689.firebaseio.com';
            var ref = new Firebase(firebaseUrl);            
            
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
            
            /**
             * Get the current user's admin status.  
             * @returns A promise resolved with a boolean admin status.
             */
            userService.isCurrentUserAdmin = function() {
                var user = userService.getCurrentUser();
                return user.$loaded().then(function(data) {
                    return data.admin;
                });
            };
                                    
            return userService;
                                    
        }]);

})();

