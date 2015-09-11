(function () {
    angular.module('dateModule').controller('DateController', ['dateService', function (dateService) {
            var date = dateService;
            this.date = date;
        }]);

})();