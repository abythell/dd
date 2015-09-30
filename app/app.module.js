(function () {
    /*     
     * Declare Angular Modules
     */
    angular.module('dateModule', []);
    angular.module('summaryModule', []);
    angular.module('alertModule', []);
    angular.module('notesModule', []);
    angular.module('moodModule', []);
    angular.module('loginModule', []);
    var app = angular.module('appDD', ['dateModule',
        'summaryModule',
        'alertModule',
        'notesModule',
        'moodModule',
        'ui.bootstrap',
        'firebase',
        'loginModule',
        'ngRoute'
    ]);
    app.controller('DdController', ['$rootScope', function ($rootScope) {
            $rootScope.firebaseUrl = 'https://brilliant-inferno-6689.firebaseio.com';
        }]);
    app.run(["$rootScope", "$location", function ($rootScope, $location) {
            $rootScope.$on("$routeChangeError", function (event, next, previous, error) {
                if (error === "AUTH_REQUIRED") {
                    $location.path("/login");
                }
            });
        }]);
    app.config(['$routeProvider', function ($routeProvider) {
            $routeProvider.
                    when('/view', {
                        templateUrl: 'app/partials/view.html',
                        resolve: {
                            "currentAuth": ["loginService", function (loginService) {
                                    return loginService.$requireAuth();
                                }]
                        }
                    }).
                    when('/login', {
                        templateUrl: 'app/partials/login.html'
                    }).
                    when('/reset', {
                        templateUrl: 'app/partials/reset.html',
                        resolve: {
                            "currentAuth": ["loginService", function (loginService) {
                                    return loginService.$requireAuth();
                                }]
                        }
                    }).
                    otherwise({
                        redirectTo: '/view'
                    });
        }]);
})();


