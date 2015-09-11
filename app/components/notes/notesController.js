(function () {

    angular.module('notesModule').controller('NotesController', ['dateService', 
        'notesService', function (dateService, notesService) {
       
            this.note = {};
       
            this.isToday = function() {
                return dateService.isToday();
            };
            
            this.getNotes = function() {
                return notesService.getNotes();
            };
            
            this.addNote = function() {
                this.note.when = Date.now();
                notesService.addNote(this.note);
                this.note = {};
            };
    }]);

})();