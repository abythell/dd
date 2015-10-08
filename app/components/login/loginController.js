(function () {

    angular.module('loginModule').controller('LoginController', ['$location',
        'loginService', '$scope', '$cookies', function ($location, loginService, 
        $scope, $cookies) {

            this.email = $cookies.get('lastuser');
            this.password = '';

            this.login = function () {
                $scope.error = null;

                var credentials = {
                    email: this.email,
                    password: this.password
                };

                loginService.$authWithPassword(credentials).then(
                        function (authData) {                            
                            if (authData.password.isTemporaryPassword) {
                                $location.path("/reset");
                            } else {
                                $cookies.put('lastuser', authData.password.email);
                                $location.path("/view");
                            }
                        }).catch(function (error) {
                    $scope.error = error.message;
                });
            };

            this.clear = function () {
                this.email = '';
                this.password = '';
                $scope.error = null;
                $scope.success = null;
            };

            this.resetPassword = function () {
                $scope.error = null;
                $scope.success = null;

                var credentials = {
                    email: this.email
                };

                loginService.$resetPassword(credentials).then(function () {
                    $scope.success = "Password reset sent to " + credentials.email;
                }).catch(function (error) {
                    $scope.error = "Reset failed: " + error.message;
                });
            };

        }]);

    
    angular.module('loginModule').controller('LoginButtonController', ['$scope',
        'loginService', '$location', 'userService', function ($scope, 
        loginService, $location, userService) {            
    
            /**
             * Update when auth state changes.
             */
            loginService.$onAuth(function (authData) {
                $scope.authData = authData;
                if (!authData) {
                    /*
                     * No longer authorized, logout.
                     */
                    $location.path("/login");
                } else {                
                    /*
                     * Set the user's name if known, otherwise use the login
                     * email address.
                     */                                                                                        
                    userService.getUser(authData.uid).$loaded().then(function(data) {
                        if (!data.active) {
                            $scope.signout();
                        } else {
                            $scope.username = data.name;
                            $scope.isAdmin = data.admin;
                            if (!$scope.username) {
                                $scope.username = authData.password.email;                            
                            }                                                
                        }
                    });                     
                }
            });

            $scope.signout = function () {
                loginService.$unauth();
                $location.path("/login");
            };


        }]);

    angular.module('loginModule').controller('LoginResetController', ['$scope',
        'loginService', '$location', function ($scope, loginService, $location) {

            $scope.changePassword = function () {
                
                if ($scope.new1 !== $scope.new2) {
                    $scope.error = "New passwords don't match";
                    return;
                }

                var credentials = {
                    email: $scope.email,
                    oldPassword: $scope.old,
                    newPassword: $scope.new1
                };

                loginService.$changePassword(credentials).then(function () {
                    $location.path("/view");
                }).catch(function (error) {
                    $scope.error = error.message;
                });

            };
            
            $scope.cancel = function () {
                $location.path("/view");
            };

        }]);

})();