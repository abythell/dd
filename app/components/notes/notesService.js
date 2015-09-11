(function () {
    angular.module('notesModule').service('notesService', function () {
        
        //TODO: load and save notes to a data store
        var notes = [
            {
                who: "Joni",
                what: "Having a great day.",
                when: 1388123412323
            },
            {
                who: "Trevor",
                what: "Best. Day. Ever.",
                when: 1488123400000
            }
        ];
        
        this.getNotes = function() {
            return notes;
        };
        
        this.addNote = function(note) {           
           notes.push(note);           
        };

    });

})();