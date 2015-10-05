(function () {

    angular.module('alertModule').controller('AlertController', ['alertService',
        'dateService', '$scope', 'userService', function (alertService,
                dateService, $scope, userService) {
            
            $scope.templateUrl = "editPopover.html";
            
            this.hidden = false;
            
            this.click = function() {
              this.hidden = true;  
            };
            
            /**
             * Asyncronously load the alert data for the selected date.             
             */
            var updateAlert = function () {
                var alert = alertService.getAlert(dateService.selectedDate);
                alert.$loaded().then(function (data) {
                    $scope.alert = data;
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