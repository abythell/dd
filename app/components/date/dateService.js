(function () {
    angular.module('dateModule').service('dateService', ['$rootScope', 
        function($rootScope) {

        var date = {};

        date.selectedDate = new Date();

        date.isToday = function () {
            var today = new Date().toDateString();
            var selected = date.selectedDate.toDateString();
            return (selected === today);
        };

        date.addDays = function (i) {
            date.selectedDate.setDate(date.selectedDate.getDate() + i);     
            $rootScope.$emit('dateChangeEvent', date.selectedDate);
        };

        return date;

    }]);

})();