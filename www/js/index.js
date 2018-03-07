
document.getElementById("vibrate").addEventListener("click",vibrate);
document.getElementById("camara").addEventListener("click",camara);
document.getElementById("info").addEventListener("click",mostrarInfo);
document.getElementById("mensaje").addEventListener("click",mensaje);
document.getElementById("geo").addEventListener("click",geo);
document.getElementById("on").addEventListener("click",flashOn);
document.getElementById("off").addEventListener("click",flashOff);
document.getElementById("gallery").addEventListener("click",gallery);
document.getElementById("vermapa").addEventListener("click",getMapLocation);
document.getElementById("verlog").addEventListener("click",readLog);
document.getElementById("resetlog").addEventListener("click",resetLog);

function startLog() {
	
		window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
        	dir.getFile("log.txt", {create:true}, function(file) {
            	logOb = file;
				console.log('log working');
				writeLog("App log started");
        	});
    	});
	
}

function writeLog(str) {
    if(!logOb) return;
    var log = str + " [" + (new Date()) + "]\n";
    console.log(log);
    logOb.createWriter(function(fileWriter) {
        
        fileWriter.seek(fileWriter.length);
        
        var blob = new Blob([log], {type:'text/plain'});
        fileWriter.write(blob);
    });
}

function readLog() {
	
    logOb.file(function(file) {
        var reader = new FileReader();

        reader.onloadend = function(e) {
            console.log(this.result);
			alert(this.result);
        };

        reader.readAsText(file);
    });

}

function resetLog() {
	
	logOb.remove(function(){
                  startLog();
              },function(error){
                  startLog();
              },function(){
                  startLog();
              });
	
}

var Latitude = undefined;
var Longitude = undefined;

function getMapLocation() {

    navigator.geolocation.getCurrentPosition
    (onMapSuccess, onMapError, { enableHighAccuracy: true });
}

// Success callback for get geo coordinates

var onMapSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;

    getMap(Latitude, Longitude);

}

// Get map by using coordinates

function getMap(latitude, longitude) {
	
	console.log('hola');

    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);


    var latLong = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
        position: latLong
    });

    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.getPosition());
}

// Success callback for watching your changing position

var onMapWatchSuccess = function (position) {

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

        Latitude = updatedLatitude;
        Longitude = updatedLongitude;

        getMap(updatedLatitude, updatedLongitude);
    }
}

// Error callback

function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

// Watch your changing position

function watchMapPosition() {

    return navigator.geolocation.watchPosition
    (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
}

//////////////////////////////////////////////////////////////////

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
    
	writeLog("flash on");
    window.plugins.flashlight.switchOn()
    
}

function flashOff (){
	
	writeLog("flash off");
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
    onDeviceReady: function() {
		
        startLog();
		console.log(navigator.vibrate);
		console.log(navigator.camera);
        console.log(device.cordova);
        console.log(navigator.geolocation);
        console.log(cordova.file);
		
    },
};

app.initialize();