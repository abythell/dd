(function() {
    /*     
     * Declare Angular Module
     */
    var app = angular.module('dd', []);
   
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
        
        /*
         * Default to today but allow other days to be selected.
         * TODO: add a more stylish date picker.
         */
        this.date = new Date();        
        this.addDays = function(i) {            
            this.date.setDate(this.date.getDate() + i);            
        };                                
        
        this.isToday = function() {
            var today = new Date().toDateString();
            var selected = this.date.toDateString();
            return (selected === today);
        };
        
    });
    
    /**
     * Handle adding new notes via form.
     */
    app.controller('NoteController', function() {
       this.note = {};
                     
       this.addNote = function(dd) {
           this.note.when = Date.now();
           dd.notes.push(this.note);
           this.note = {};
       };
       
    });            
    
})();


