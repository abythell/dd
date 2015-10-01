(function () {
    angular.module('dateModule').service('dateService', [function() {

        var date = {};

        date.selectedDate = new Date();

        date.isToday = function () {
            var today = new Date().toDateString();
            var selected = date.selectedDate.toDateString();
            return (selected === today);
        };

        date.addDays = function (i) {
            date.selectedDate.setDate(date.selectedDate.getDate() + i);            
        };

        return date;

    }]);

})();