(function () {
    angular.module('dateModule').controller('DateController', ['dateService', 
        '$scope', function (dateService, $scope) {
            $scope.date = dateService;
        }]);

})();