
document.getElementById("vibrate").addEventListener("click",vibrate);
document.getElementById("camara").addEventListener("click",camara);
document.getElementById("info").addEventListener("click",mostrarInfo);
document.getElementById("mensaje").addEventListener("click",mensaje);
document.getElementById("geo").addEventListener("click",geo);
document.getElementById("on").addEventListener("click",flashOn);
document.getElementById("off").addEventListener("click",flashOff);
document.getElementById("gallery").addEventListener("click",gallery);

function gallery () {
    
    navigator.camera.getPicture(gallerySuccess, galleryFail, 
    { quality: 50,destinationType: Camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM });
    
}

function gallerySuccess(imageURI) {
    
    var largeImage = document.getElementById ('imageFile');
        largeImage.style.display = 'block';
        largeImage.src = imageURI;
    
}

function galleryFail() {
    
    console.log('fallo');
    
}

function flashOn () {
    
    window.plugins.flashlight.switchOn()
    
}

function flashOff ()
{
    window.plugins.flashlight.switchOff()
}
function geo() {
    
    navigator.geolocation.getCurrentPosition(geolocationSuccess,geolocationError);
    
}

function geolocationSuccess (position){
    
    window.plugins.toast.showShortTop(
              'Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n'
    )
    
}

function geolocationError (){
    
    console.log(navigator.vibrate(500));
    window.plugins.toast.showShortTop('error al geolocalizar');
    
}

function mostrarInfo() {
    
    alert(
        
        'Fabricante: ' + device.manufacturer + '\n' +
        'Cordova: ' + device.cordova + '\n' +
        'Modelo: ' + device.model + '\n' +
        'Plataforma: ' + device.platform + '\n' +
        'Numero unico: ' + device.uuid + '\n' +
        'Version: ' + device.version + '\n' +
        'Es emulacion: ' + device.isVirtual + '\n' +
        'Serial: ' + device.serial 
        
         );
    
}

function mensaje() {
    
    window.plugins.toast.showShortTop('hola mundo');
    
}

function vibrate() {
    
	console.log(navigator.vibrate(2000));
    
}

function onBatteryStatus(status) {
    console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
	alert("Level: " + status.level + " isPlugged: " + status.isPlugged);
}

function camara() {
	
	navigator.camera.getPicture(cameraSuccess, cameraError,{ saveToPhotoAlbum:true, quality: 100 });
	
}

function cameraSuccess(entry) {
    
    var elem = document.getElementById('imageFile');
    elem.src = entry;
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
		console.log(navigator.vibrate);
		console.log(navigator.camera);
        console.log(device.cordova);
        console.log(navigator.geolocation);
        console.log(cordova.file);
        
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