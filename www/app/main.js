define(function(require) {
    startTheApplication();
    
    function startTheApplication(){
        var system = require('durandal/system'), app = require('durandal/app');
        system.debug(true);
        app.title = 'Invio Bank';
        app.configurePlugins({
            router: true,
            dialog: true
        });
        app.start().then(function() {
            console.log("starting app");
            app.setRoot('shell');                
        });
    }    
});