(function () {
    angular.module('suppliesModule').directive('abSupplies', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/supplies/suppliesView.html',
            controller: 'SuppliesController',
            controllerAs: 'suppliesCtrl'
        };
    });
})();