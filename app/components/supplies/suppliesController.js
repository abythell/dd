(function () {

    angular.module('suppliesModule').controller('SuppliesController', ['suppliesService',
        'dateService', '$scope', 'userService', function (suppliesService,
                dateService, $scope, userService) {
                        
            $scope.singleItems = suppliesService.singleItemsList;
            $scope.multiItems = suppliesService.multiItemsList;
            
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
            
            var updateSupplies = function() {
                var obj = suppliesService.getSupplies(dateService.selectedDate);
                obj.$loaded().then(function() {
                    $scope.supplies = obj;
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