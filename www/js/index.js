
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {

        console.log("Device ready");
		
        appInit();
        
    }

};

app.initialize();

function exitFromApp() {
    
    navigator.app.exitApp();
    
}