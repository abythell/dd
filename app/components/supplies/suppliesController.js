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