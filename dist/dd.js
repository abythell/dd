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



(function () {

    angular.module('alertModule').controller('AlertController', ['alertService',
        'dateService', '$scope', 'userService', function (alertService,
                dateService, $scope, userService) {
            
            /*
             * Load the default message from the data store.
             */
            var defaultMessage = '';
            alertService.getDefaultMessage().$loaded().then(function(msg) {
                defaultMessage = msg;
            });

            /*
             * When hidden, the alert message is not shown.
             */
            this.hidden = false;

            /*
             * In edit mode, a text area is displayed instead of the alert.
             */
            this.editMode = false;

            /*
             * Switch from alert to edit mode.
             */
            this.edit = function () {
                if ($scope.canEdit) {
                    if ($scope.alert.$value === defaultMessage.$value) {
                        this.previousMessage = defaultMessage.$value;
                        $scope.alert.$value = '';
                    }
                    this.editMode = true;
                }
            };

            /*
             * Save text and switch back to alert mode.  Edited alerts
             * are displayed in a "danger" style alert.
             */
            this.save = function () {
                this.editMode = false;
                if ($scope.alert.$value.length > 0) {
                    $scope.alert.$save();
                    $scope.alertClass = "alert-danger";
                } else {
                    $scope.alert.$value = defaultMessage.$value;
                }
            };
              
            /*
             * Cancel editing.  Return the message to the previous one.
             */
            this.cancel = function() {
                this.editMode = false;
                if (this.previousMessage) {
                    $scope.alert.$value = this.previousMessage;
                }
            };
            
            /*
             * Clear the text box.
             */
            this.clear = function() {
                this.previousMessage = $scope.alert.$value;
                $scope.alert.$value = '';
            };

            /*
             * Remove the custom message and revert back to the default.             
             */
            this.reset = function () {
                this.editMode = false;
                $scope.alert.$remove().then(function () {
                    $scope.alert.$value = defaultMessage.$value;
                });

                $scope.alertClass = "alert-warning";
            };
            
            /*
             * Set a new default message.
             */
            this.setDefault = function() {
              defaultMessage.$value = $scope.alert.$value;  
              defaultMessage.$save();
            };

            /**
             * Asyncronously load the alert data for the selected date.             
             */
            var updateAlert = function () {
                var alert = alertService.getAlert(dateService.selectedDate);
                alert.$loaded().then(function (data) {
                    $scope.alert = data;
                    if (data.$value === null) {
                        data.$value = defaultMessage.$value;
                        $scope.alertClass = 'alert-warning';
                    } else {
                        $scope.alertClass = 'alert-danger';
                    }
                });
            };

            /**
             * Alerts can only be edited by admins.
             */
            var setEditable = function () {
                userService.isCurrentUserAdmin().then(function (admin) {
                    if (admin) {
                        $scope.canEdit = true;
                    } else {
                        $scope.canEdit = false;
                    }
                });
            };

            /*
             * Fetch new data when the date changes - this includes the 
             * initial load.
             */
            $scope.$watch(function () {
                return dateService.selectedDate;
            }, function () {
                updateAlert();
                setEditable();
            }, true);

        }]);

})();
(function () {
    angular.module('alertModule').directive('abAlert', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/alert/alertView.html',
            controller: 'AlertController',
            controllerAs: 'alertCtrl'
        };
    });
})();
(function () {
    angular.module('alertModule').service('alertService', ['$firebaseObject', 
        '$filter', function ($firebaseObject, $filter) {

            /*
             * URL of firebase app
             */            
            var firebaseUrl = 'https://brilliant-inferno-6689.firebaseio.com';
            var ref = new Firebase(firebaseUrl);
           
           /*
            * Fetch object data from <firebase-url>/mood/
            */
            this.getAlert = function(date, tod) {
                var key = $filter('date')(date, "yyyy-MM-dd");
                return $firebaseObject(ref.child('alerts').child(key));
            };
            
            this.getDefaultMessage = function() {
              return $firebaseObject(ref.child('config').child('defaultMessage'));  
            };

        }]);

})();
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
    
            $scope.location = $location;
            
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
(function () {

    angular.module('loginModule').factory('loginService', ['$firebaseAuth',
        function ($firebaseAuth) {
            var firebaseUrl = 'https://brilliant-inferno-6689.firebaseio.com';
            var ref = new Firebase(firebaseUrl);
            return $firebaseAuth(ref);            

        }]);

})();


(function () {

    angular.module('moodModule').controller('MoodAdminController', ['moodService',
        '$scope', function (moodService, $scope) {

            moodService.getMoodList().$loaded().then(function(list) {
                $scope.moodList = list;
            });

        }]);

})();
(function () {

    angular.module('moodModule').controller('MoodController', ['moodService',
        'dateService', '$scope', 'userService', function (moodService,
                dateService, $scope, userService) {

            moodService.getMoodList().$loaded().then(function(list) {
                $scope.moodList = list;
            });

            /**
             * Asyncronously load the mood data for the selected date.             
             */
            var updateMood = function () {
                var moodAM = moodService.getMoods(dateService.selectedDate, 'am');
                moodAM.$loaded().then(function (data) {
                    $scope.moodAM = data;
                });

                var moodPM = moodService.getMoods(dateService.selectedDate, 'pm');
                moodPM.$loaded().then(function (data) {
                    $scope.moodPM = data;
                });
            };

            /**
             * Moods can only be edited for "today", unless the user is an 
             * administrator in which case they can edit any day.
             * @returns {undefined}
             */
            var setEditable = function () {
                userService.isCurrentUserAdmin().then(function (admin) {
                    if (admin | dateService.isToday()) {
                        $scope.canEdit = true;
                    } else {
                        $scope.canEdit = false;
                    }
                });
            };

            /*
             * Fetch new data when the date changes - this includes the 
             * initial load.
             */
            $scope.$watch(function () {
                return dateService.selectedDate;
            }, function () {
                updateMood();
                setEditable();
            }, true);

        }]);

})();
(function () {
    angular.module('moodModule').directive('abMoods', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/mood/moodView.html',
            controller: 'MoodController',
            controllerAs: 'moodCtrl'
        };
    });
    
        angular.module('moodModule').directive('abMoodsadmin', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/mood/moodViewAdmin.html',
            controller: 'MoodAdminController',
            controllerAs: 'moodAdminCtrl'
        };
    });
    
    
})();
(function () {
    angular.module('moodModule').service('moodService', ['$firebaseObject', 
        '$firebaseArray', '$filter', function ($firebaseObject, $firebaseArray, 
        $filter) {

            /*
             * URL of firebase app
             */            
            var firebaseUrl = 'https://brilliant-inferno-6689.firebaseio.com';
            var ref = new Firebase(firebaseUrl);            
            
            this.getMoodList = function() {
                return $firebaseArray(ref.child('config').child('moods'));
            };
           
           /*
            * Fetch object data from <firebase-url>/mood/
            */
            this.getMoods = function(date, tod) {
                var key = $filter('date')(date, "yyyy-MM-dd");
                return $firebaseObject(ref.child('mood').child(key).child(tod));
            };

        }]);

})();
(function () {

    angular.module('notesModule').controller('NotesController', ['dateService',
        '$scope', 'userService', 'notesService', function (dateService, $scope,
                userService, notesService) {

            /*
             * Determine if the notes for this day can be changed or not.             
             */
            var setEditable = function () {
                userService.isCurrentUserAdmin().then(function (admin) {
                    if (admin | dateService.isToday()) {
                        $scope.canEdit = true;
                    } else {
                        $scope.canEdit = false;
                    }
                });
            };

            var getNotes = function () {
                userService.getCurrentUser().$loaded().then(function (user) {
                    $scope.uuid = user.$id;
                    $scope.notes = notesService.getNotes(dateService.selectedDate);                
                });
            };

            this.addNote = function (what) {
                userService.getCurrentUser().$loaded().then(function (user) {
                    var date = new Date().getTime();
                    var newNote = {
                        what: what,
                        when: date,
                        who: user.name,
                        uuid: user.$id
                    };
                    $scope.notes.$add(newNote);
                    $scope.what = '';
                });
            };

            /*
             * Fetch new data when the date changes - this includes the 
             * initial load.
             */
            $scope.$watch(function () {
                return dateService.selectedDate;
            }, function () {
                getNotes();
                setEditable();
            }, true);
        }]);

})();
(function () {
    angular.module('notesModule').directive('abNotes', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/notes/notesView.html',
            controller: 'NotesController',
            controllerAs: 'notesCtrl'
        };
    });
})();
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
(function () {

    angular.module('seizureModule').controller('SeizureAdminController', ['$scope', 
        'seizureService', '$q', '$filter', function ($scope, seizureService, $q, $filter) {
                    
            /*
             * Set datepickers to today's date.
             */
            $scope.startDate = new Date();
            $scope.endDate = new Date();
            
            /*
             * This will get populated with the CSV data.
             */
            $scope.data = [];
            
            /*
             * Header for CSV data.
             */
            $scope.csvHeader = [
                'Date',
                'Time',
                'Duration',
                'Name',
                'Notes'
            ];
            
            /*
             * Create a promise that resolves with the requested activity data.
             */
            this.export = function() {                                                                
                var defer = $q.defer();
                                
                /*
                 * Loop through every day between the start and end dates, creating
                 * a list of promises that will push activity data on the main
                 * array once resolved.                 
                 */              
                /* jshint -W083 */
                var promises = [];
                for (var d = new Date($scope.startDate); d <= $scope.endDate; d.setDate(d.getDate() + 1)) {
                    var promise = seizureService.getSeizure(d).$loaded().then(function (data) {                                                
                        for (var i=0; i< data.length; i++) {                                                        
                            var activity = {
                                date: $filter('date')(data[i].start, 'yyyy-MM-dd'),
                                time: $filter('date')(data[i].start, 'HH:mm'),
                                duration: data[i].duration,
                                who: data[i].who,
                                notes: data[i].notes
                            };
                            $scope.data.push(activity);
                        }                        
                        return 'done';
                    });
                    promises.push(promise);                    
                }
                
                /*
                 * Wait until all the data has been pushed onto the main array
                 * before resolving the 'master' promise.
                 */
                $q.all(promises).then(function() {                    
                    defer.resolve($scope.data);                    
                });
                                
                return defer.promise;
            };
                        
        }]);

})();
(function () {

    angular.module('seizureModule').controller('SeizureController', ['dateService',
        '$scope', 'userService', 'seizureService', function (dateService, $scope,
                userService, seizureService) {
            
            /*
             * Determine if the seizure for this day can be changed or not. 
             * Admins can add activity any day, but other users can only add
             * activity for 'today'.  Also, as enforced in the view, admins
             * can delete any observations they have recorded.  Other users
             * can only delete observations made by them "today".        
             */
            var setEditable = function () {
                userService.isCurrentUserAdmin().then(function (admin) {
                    if (admin | dateService.isToday()) {
                        $scope.canEdit = true;
                    } else {
                        $scope.canEdit = false;
                    }
                });
            };

            /*
             * Get a list of activity observations for the selected date.  Also
             * resets the form.  Called on initial load and whenever the date
             * changes.
             */
            var getActivity = function () {
                var currentTime = new Date().getTime();
                $scope.start = new Date(dateService.selectedDate).setTime(currentTime);
                $scope.duration = 0;
                userService.getCurrentUser().$loaded().then(function (user) {
                    $scope.uuid = user.$id;
                    $scope.activity = seizureService.getSeizure(dateService.selectedDate);
                });
            };

            /*
             * Add a new observation.
             */
            this.addActivity = function () {
                userService.getCurrentUser().$loaded().then(function (user) {
                    var newActivity = {
                        who: user.name,
                        start: $scope.start,
                        duration: $scope.duration,
                        notes: $scope.notes,
                        uuid: user.$id
                    };
                    $scope.activity.$add(newActivity);
                    
                    /*
                     * Reset the form.
                     */
                    $scope.what = '';
                    $scope.start = new Date();
                    $scope.duration = 0;
                    $scope.notes = '';
                });
            };

            /*
             * Fetch new data when the date changes - this includes the 
             * initial load.
             */
            $scope.$watch(function () {
                return dateService.selectedDate;
            }, function () {
                getActivity();
                setEditable();
            }, true);

        }]);

})();
(function () {
    angular.module('seizureModule').directive('abSeizure', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/seizure/seizureView.html',
            controller: 'SeizureController',
            controllerAs: 'seizureCtrl'
        };
    });
    
        angular.module('seizureModule').directive('abSeizureadmin', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/seizure/seizureViewAdmin.html',
            controller: 'SeizureAdminController',
            controllerAs: 'seizureAdminCtrl'
        };
    });
    
    
})();
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
(function () {

    angular.module('suppliesModule').controller('SuppliesAdminController', ['suppliesService',
        '$scope', function (suppliesService, $scope) {

            suppliesService.getSingleItemList().$loaded().then(function (items) {
                $scope.singleItems = items;
            });

            suppliesService.getMultiItemList().$loaded().then(function (items) {
                $scope.multiItems = items;
            });
            
            suppliesService.getSettings().$loaded().then(function (settings) {
                $scope.settings = settings;
                settings.$bindTo($scope, 'settings');
            });

        }]);

})();
(function () {

    angular.module('suppliesModule').controller('SuppliesController', ['suppliesService',
        'dateService', '$scope', 'userService', function (suppliesService,
                dateService, $scope, userService) {


            suppliesService.getSingleItemList().$loaded().then(function (items) {
                $scope.singleItems = items;
            });
            
            suppliesService.getMultiItemList().$loaded().then(function (items) {
                $scope.multiItems = items;
            });
            
            suppliesService.getSettings().$loaded().then(function (settings) {
                $scope.settings = settings;
            });

            /*
             * Determine if the supplies for this day can be changed or not.             
             */
            var setEditable = function () {
                userService.isCurrentUserAdmin().then(function (admin) {
                    if (admin | dateService.isToday()) {
                        $scope.canEdit = true;
                    } else {
                        $scope.canEdit = false;
                    }
                });
            };

            var updateAmSupplies = function () {
                var obj = suppliesService.getSupplies(dateService.selectedDate, 'am');
                obj.$loaded().then(function () {
                    $scope.amSupplies = obj;
                    for (var i=0; i< $scope.multiItems.length; i++) {
                        $scope.amSupplies[$scope.multiItems[i].$value] = 
                                $scope.amSupplies[$scope.multiItems[i].$value] || 0;
                    }
                });
            };
            
            var updatePmSupplies = function () {
                var obj = suppliesService.getSupplies(dateService.selectedDate, 'pm');
                obj.$loaded().then(function () {
                    $scope.pmSupplies = obj;
                    for (var i=0; i< $scope.multiItems.length; i++) {
                        $scope.pmSupplies[$scope.multiItems[i].$value] = 
                                $scope.pmSupplies[$scope.multiItems[i].$value] || 0;
                    }
                });
            };

            /*
             * Fetch new data when the date changes - this includes the 
             * initial load.
             */
            $scope.$watch(function () {
                return dateService.selectedDate;
            }, function () {
                updateAmSupplies();
                updatePmSupplies();
                setEditable();
            }, true);

        }]);

})();
(function () {
    angular.module('suppliesModule').directive('abSupplies', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/supplies/suppliesView.html',
            controller: 'SuppliesController',
            controllerAs: 'suppliesCtrl'
        };
    });
    
        angular.module('suppliesModule').directive('abSuppliesadmin', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/supplies/suppliesViewAdmin.html',
            controller: 'SuppliesAdminController',
            controllerAs: 'suppliesAdminCtrl'
        };
    });
    
    
})();
(function () {
    angular.module('suppliesModule').service('suppliesService', ['$firebaseObject',
        '$filter', '$firebaseArray', function ($firebaseObject, $filter, $firebaseArray) {

            /*
             * URL of firebase app
             */
            var firebaseUrl = 'https://brilliant-inferno-6689.firebaseio.com';
            var ref = new Firebase(firebaseUrl);
                        
            this.getSingleItemList = function() {
              return $firebaseArray(ref.child('config').child('supplies').child('single'));  
            };
            
            this.getMultiItemList = function() {
                return $firebaseArray(ref.child('config').child('supplies').child('multi'));  
            };
            
            this.getSettings = function() {
                return $firebaseObject(ref.child('config').child('supplies').child('settings'));                                        
            };
                                    
            this.getSupplies = function (date, tod) {
                var key = $filter('date')(date, "yyyy-MM-dd");
                return $firebaseObject(ref.child('supplies').child(key).child(tod));
            };

        }]);

})();
(function () {

    angular.module('userModule').controller('UserController', ['userService',
        '$scope', 'loginService', function (userService, $scope, loginService) {

            /*
             * On init, load list of users.
             */
            userService.getAllUsers().$loaded().then(function (users) {
                $scope.users = users;
            });
            this.addUser = function () {

                loginService.$createUser({
                    email: $scope.email,
                    password: $scope.password
                }).then(function (userData) {
                    $scope.users[userData.uid] = {
                        name: $scope.name,
                        email: $scope.email,
                        active: true,
                        admin: false
                    };
                    $scope.users.$save();
                });

            };
        }]);
})();
(function () {
    angular.module('userModule').directive('abUsers', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/user/userView.html',
            controller: 'UserController',
            controllerAs: 'userCtrl'
        };
    });
})();
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
            
            userService.getAllUsers = function() {
                return $firebaseObject(ref.child('users'));
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


(function () {
    angular.module('dateModule').controller('DateController', ['dateService', 
        '$scope', function (dateService, $scope) {
            $scope.date = dateService;
        }]);

})();
(function () {
    angular.module('dateModule').directive('abDate', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/date/dateView.html',
            controller: 'DateController',
            controllerAs: 'dateCtrl'
        };
    });
})();
(function () {
    angular.module('dateModule').service('dateService', [function() {

        this.selectedDate = new Date();

        this.isToday = function () {
            var today = new Date().toDateString();
            var selected = this.selectedDate.toDateString();
            return (selected === today);
        };

        this.addDays = function (i) {
            this.selectedDate.setDate(this.selectedDate.getDate() + i);            
        };

    }]);

})();