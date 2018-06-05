//Configuracion Firebase
const fireconfig = {
    apiKey: "AIzaSyAUWRPpLunFjkfgWQ-VOa-rxYBd6hXNvBI",
    authDomain: "movil-app-endika.firebaseapp.com",
    databaseURL: "https://movil-app-endika.firebaseio.com",
    projectId: "movil-app-endika",
    storageBucket: "movil-app-endika.appspot.com",
    messagingSenderId: "1014982577939"
};

//iniciar firebase
firebase.initializeApp(fireconfig);

//funcion para iniciar sesion con google

//funcion para cambiar el display name
function updateName(name){
    
	UserConf[1].username=name
    
    if(UserConf[0].saves && firebase.auth().currentUser){
        ajaxcall("patch");
    }
    
	firebase.auth().currentUser.updateProfile({
     	displayName: name
	})
	localStorage.setItem("savedata", JSON.stringify(UserConf));
}

//listener para saber si el usuario se ha conectado y recoger el id
firebase.auth().onAuthStateChanged(function(user) {
	
	if(user){
		
		UserConf[1].username=user.displayName;
        UserConf[1].multiplayerid=user.uid;
		localStorage.setItem("savedata", JSON.stringify(UserConf));
		
		if (UserConf[0].online) {
			multiplayer();
		}
        
        if(UserConf[0].saves){
            ajaxcall("get");
        }
        
        seven.loginScreen.close('.login-screen');
        
	} else {
		// User is signed out.
		console.log('Usuario desconectado');
		multiplayerOn = false;
		UserConf[0].online = false;
	}
	
});

//funcion para salir de la cuenta
function logOut(){
    firebase.auth().signOut();
    socket.disconnect();
    multiplayerOn = false;
}