(function () {
    angular.module('moodModule').directive('abMoods', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/mood/moodView.html',
            controller: 'MoodController',
            controllerAs: 'moodCtrl'
        };
    });
})();