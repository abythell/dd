(function () {
    angular.module('loginModule').directive('abLogin', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/login/loginView.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
        };
    });
    
    angular.module('loginModule').directive('abLoginbutton', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/login/loginButton.html',
            controller: 'LoginButtonController',
            controllerAs: 'loginButtonCtrl'
        };
    });
    
    angular.module('loginModule').directive('abLoginreset', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/login/loginReset.html',
            controller: 'LoginResetController',
            controllerAs: 'loginResetCtrl'
        };
    });
    
    
})();