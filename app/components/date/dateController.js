(function () {
    angular.module('dateModule').controller('DateController', ['dateService', function (dateService) {
            
            this.getDate = function() {
                return dateService.selectedDate;
            }
            
            this.isToday = function() {
                return dateService.isToday();
            }
            
            this.addDays = function(i) {
                return dateService.addDays(i);
            }
            
        }]);

})();