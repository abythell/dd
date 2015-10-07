(function () {
    angular.module('seizureModule').directive('abSeizure', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/seizure/seizureView.html',
            controller: 'SeizureController',
            controllerAs: 'seizureCtrl'
        };
    });
})();