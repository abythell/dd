(function () {

    angular.module('suppliesModule').controller('SuppliesAdminController', ['suppliesService',
        '$scope', function (suppliesService, $scope) {

            suppliesService.getSingleItemList().$loaded().then(function (items) {
                $scope.singleItems = items;
            });

            suppliesService.getMultiItemList().$loaded().then(function (items) {
                $scope.multiItems = items;
            });

        }]);

})();