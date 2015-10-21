(function () {
    /*     
     * Declare Angular Modules
     */
    angular.module('dateModule', []);
    angular.module('notesModule', []);
    angular.module('moodModule', []);
    angular.module('loginModule', []);
    angular.module('userModule', []);
    angular.module('suppliesModule', []);
    angular.module('alertModule', []);
    angular.module('seizureModule', ['ngSanitize', 'ngCsv']);

    //TODO: assign dependencies to specific modules.

    var app = angular.module('appDD', ['dateModule',
        'notesModule',
        'moodModule',
        'ui.bootstrap',
        'firebase',
        'loginModule',
        'ngRoute',
        'userModule',
        'ngCookies',
        'suppliesModule',
        'alertModule',
        'seizureModule'
    ]);
    app.controller('DdController', ['$scope', '$uibModal', function ($scope, $uibModal) {
            $scope.uhfOpen = function () {
                $scope.uhfModal = $uibModal.open({
                    animation: true,
                    templateUrl: 'uhfModalContent.html',
                });
            };
        }]);

    app.run(["$rootScope", "$location", function ($rootScope,
                $location) {
            $rootScope.$on("$routeChangeError", function (event, next, previous, error) {
                if (error === "AUTH_REQUIRED") {
                    $location.path("/login");
                } else if (error === "ADMIN_REQUIRED") {
                    $location.path("/view");
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
                    when('/admin', {
                        templateUrl: 'app/partials/admin.html',
                        resolve: {
                            "currentAuth": ["loginService", function (loginService) {
                                    return loginService.$requireAuth();
                                }],
                            "isAdmin": ["userService", "$q", function (userService, $q) {
                                    var deferred = $q.defer();
                                    userService.getCurrentUser().$loaded().then(function (data) {
                                        if (data.admin) {
                                            deferred.resolve();
                                        } else {
                                            deferred.reject("ADMIN_REQUIRED");
                                        }
                                    });
                                    return deferred.promise;
                                }]
                        },
                        admin: true
                    }).
                    otherwise({
                        redirectTo: '/view'
                    });
        }]);
})();


