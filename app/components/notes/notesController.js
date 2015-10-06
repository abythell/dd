(function () {

    angular.module('notesModule').controller('NotesController', ['dateService',
        '$scope', 'userService', 'notesService', function (dateService, $scope,
                userService, notesService) {

            /*
             * Determine if the notes for this day can be changed or not.             
             */
            var setEditable = function () {
                userService.isCurrentUserAdmin().then(function (admin) {
                    if (admin | dateService.isToday()) {
                        $scope.canEdit = true;
                    } else {
                        $scope.canEdit = false;
                    }
                });
            };

            var getNotes = function () {
                userService.getCurrentUser().$loaded().then(function (user) {
                    $scope.uuid = user.$id;
                }).then(function () {
                    $scope.notes = notesService.getNotes(dateService.selectedDate);
                });
            };
                                   
            this.addNote = function (what) {
                userService.getCurrentUser().$loaded().then(function (user) {
                    var date = new Date().getTime();
                    var newNote = {
                        what: what,
                        when: date,
                        who: user.name,
                        uuid: user.$id
                    };
                    $scope.notes.$add(newNote);
                    $scope.what = '';
                });
            };                        

            /*
             * Fetch new data when the date changes - this includes the 
             * initial load.
             */
            $scope.$watch(function () {
                return dateService.selectedDate;
            }, function () {
                getNotes();
                setEditable();            
            }, true);
        }]);

})();