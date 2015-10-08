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

            var updateSupplies = function () {
                var obj = suppliesService.getSupplies(dateService.selectedDate);
                obj.$loaded().then(function () {
                    $scope.supplies = obj;
                    for (var i=0; i< $scope.multiItems.length; i++) {
                        $scope.supplies[$scope.multiItems[i].$value] = 
                                $scope.supplies[$scope.multiItems[i].$value] || 0;
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
                updateSupplies();
                setEditable();
            }, true);

        }]);

})();