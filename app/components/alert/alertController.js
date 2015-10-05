(function () {

    angular.module('alertModule').controller('AlertController', ['alertService',
        'dateService', '$scope', 'userService', function (alertService,
                dateService, $scope, userService) {

            /*
             * This message will be displayed if a custom message has not
             * been set.  The default message is displayed in a "warning"
             * style alert.                 
             */
            var defaultMessage = "This tool is a means to communicate important "
                    + "information about Declan and the events of his day.  Please "
                    + "remember that we need your input to talk to Declan about what has "
                    + "transpired, because he cannot tell us himself.";

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
                }
            };

            /*
             * Remove the custom message and revert back to the default.             
             */
            this.reset = function () {
                this.editMode = false;
                $scope.alert.$remove().then(function () {
                    $scope.alert.$value = defaultMessage;
                });

                $scope.alertClass = "alert-warning";
            };

            /**
             * Asyncronously load the alert data for the selected date.             
             */
            var updateAlert = function () {
                var alert = alertService.getAlert(dateService.selectedDate);
                alert.$loaded().then(function (data) {
                    $scope.alert = data;
                    if (data.$value === null) {
                        data.$value = defaultMessage;
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