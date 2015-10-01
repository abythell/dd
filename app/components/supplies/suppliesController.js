(function () {

    angular.module('suppliesModule').controller('SuppliesController', ['suppliesService',
        'dateService', '$scope', 'userService', function (suppliesService,
                dateService, $scope, userService) {
                        
            $scope.items = suppliesService.getSupplies(dateService.selectedDate);

            /*
             * When a button is clicked, increment the quantity and the label,
             * then save the updates.              
             */
            $scope.buttonChanged = function(id) {
                var item = $scope.items.$getRecord(id);
                                
                item.qty = item.qty + 1;
                if (item.qty > item.max) item.qty = 0;
                
                /*
                 * Update the label to show the qty.
                 */
                if (item.qty) {
                    item.label = item.name + ' (' + item.qty + ')';
                    item.selected = true;
                } else {
                    item.label = item.name;
                    item.selected = false;
                }
                
                /*
                 * Save the changes
                 */
                $scope.items.$save(item);                                
            };
            
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
            
            /*
             * Fetch new data when the date changes - this includes the 
             * initial load.
             */
            $scope.$watch(function () {
                return dateService.selectedDate;
            }, function () {
                $scope.items = suppliesService.getSupplies(dateService.selectedDate);
                setEditable();
            }, true);

        }]);

})();