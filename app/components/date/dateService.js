(function () {
    angular.module('dateModule').service('dateService', [function() {

        this.selectedDate = new Date();

        this.isToday = function () {
            var today = new Date().toDateString();
            var selected = this.selectedDate.toDateString();
            return (selected === today);
        };

        this.addDays = function (i) {
            this.selectedDate.setDate(this.selectedDate.getDate() + i);            
        };

    }]);

})();