(function () {
    angular.module('dateModule').service('dateService', function() {
    
        var date = new Date();
        //this.date = date;
        
        this.getDate = function() {
            return date;
        };

        this.isToday = function () {
            var today = new Date().toDateString();
            var selected = date.toDateString();
            return (selected === today);
        };
        
        this.addDays = function (i) {
                date.setDate(date.getDate() + i);
            };
        
    });

})();