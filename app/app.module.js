(function() {
    /*     
     * Declare Angular Modules
     */    
    angular.module('dateModule', []);
    angular.module('summaryModule', []);    
    angular.module('alertModule', []);
    angular.module('notesModule', []);
    angular.module('moodModule', []);
    
    var app = angular.module('appDD', ['dateModule', 
        'summaryModule', 
        'alertModule', 
        'notesModule',
        'moodModule',
        'ui.bootstrap',
        'firebase'
    ]);
   
   /*
    * Some sample data to show for now
    */
   var notes = [
        {
            who:"Joni",
            what:"Having a great day.",
            when:1388123412323
        },
        {
            who:"Trevor",
            what:"Best. Day. Ever.",
            when:1488123400000
        }
    ];
   
    /*
     * Primary Controller
     */    
    app.controller('DdController', function() {
        
        /*
         * For now, initialize the nodes with sample data until
         * we can pull real data from a data store
         */        
        this.notes = notes;
                        
    });
    
    /**
     * Handle adding new notes via form.
     */
    app.controller('NoteController', ['dateService', function(date) {
       this.note = {};
       this.date = date;              
       this.addNote = function(dd) {
           this.note.when = Date.now();
           dd.notes.push(this.note);
           this.note = {};
       };
       
    }]);            
    
})();


