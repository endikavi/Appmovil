
document.getElementById("vibrate").addEventListener("click",vibrate)
document.getElementById("camara").addEventListener("click",camara)

function vibrate() {
    
	console.log(navigator.vibrate([5000,2000,5000]));
    
}

function onBatteryStatus(status) {
    console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
	alert("Level: " + status.level + " isPlugged: " + status.isPlugged);
}

function camara() {
	
	navigator.camera.getPicture(cameraSuccess, cameraError);
	
}

function cameraSuccess(data) {
	
	alert('foto guardada en:' + data);
	console.log('foto tomada');
	
}

function cameraError() {
	
	alert('error de la camara');
	console.log('error de la camara');
	
}

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
		window.addEventListener("batterystatus", onBatteryStatus, false);
		console.log(navigator.vibrate);
		console.log(navigator.camera);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();