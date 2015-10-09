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