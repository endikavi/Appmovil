var seven = new Framework7();

var $$ = Dom7;

function addGameCanvas() {
    
	$$('#screen').html('<canvas id="layer0" width="'+UserConf[0].resolutionX+'" height="'+UserConf[0].resolutionY+'"></canvas><canvas id="layer1" width="'+UserConf[0].resolutionX+'" height="'+UserConf[0].resolutionY+'"></canvas><canvas id="layer2" width="'+UserConf[0].resolutionX+'" height="'+UserConf[0].resolutionY+'"></canvas><canvas id="layer3" width="'+UserConf[0].resolutionX+'" height="'+UserConf[0].resolutionY+'"></canvas><div id=controlls-box></div><div class="card"></div>');
    
	mapId = 0002;
	if (multiplayerOn) {
		socket.emit('changeMap',0002);
	}
    if(UserConf[0].multiplayerCharacter== 7){player.tileset=playerTwoTileset}
    if(UserConf[0].multiplayerCharacter== 8){player.tileset=playerThreeTileset}
    if(UserConf[0].multiplayerCharacter== 9){player.tileset=playerFourTileset}
    if(UserConf[0].multiplayerCharacter==10){player.tileset=charlieTileset}
    if(UserConf[0].multiplayerCharacter==11){player.tileset=playerTileset}
    mapTileData.preLoaded = false;
    addControlls();
	renderGame();
    mapSound.play();
    menuSound.stop();
	$$('.container').attr('style','inline');
	
}

function mainMenu() {
    
	$$('#screen').html('<img class="bgimg" src="img/wolf-1341881.png" /><button class="button col button-round btn color-white btn-left" id="StartGame">&#9773  Empezar</button><button class="button col button-round btn color-white btn-left" id="ContinueGame">&#9773 Continuar</button><button class="button col button-round btn color-white" id="User">Usuario</button><button class="button col button-round btn color-white" id="Menu">Menu</button><button class="button col button-round btn color-white btn-right" id="Retos"> Logros &#9773</button><button class="button col button-round btn color-white btn-right" id="Multi">Multijugador &#9773</button><div class="card"></div>');
	$$('.container').attr('style','none');
    
    resetCanvas();
    mainMenuControlls();
    menuSound.play();
    mapSound.stop();
	
}

function newUserMenu() {
    
    $$('.login-screen').html('<!-- Default view-page layout --><div class="view"><div class="page"><!-- page-content has additional login-screen content --><div class="page-content login-screen-content"><div class="login-screen-title"></div><!-- Login form --><div><div class="list"><ul><li><p>Para empezar a usar el multijugador y la funcion de datos en la nube registrese,puede activar o desactivar estas opciones en ajustes mas adelante.</p></li><li><button type="button" class="button col button-round btn color-white " id="btnSigninGoogle" >Entrar con google</button></li><br><li><button type="button" class="button col button-round btn color-white " id="btnSigninFacebook" >Entrar con facebook</button></li><br><li><button type="button" class="button col button-round btn color-white " id="btnSigninTwitter" >Entrar con twitter</button></li></ul><div class="block-footer"><div class="block"><div class="row"><button class="button col" id="closeLogin">No me interesa</button></div></div></div></div></div></div></div></div>')
    
    seven.loginScreen.open('.login-screen');
    
    $$("#btnSigninGoogle").click(function(){
        console.log('hola')
	   var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function() {
          firebase.auth().getRedirectResult().then(function(result) {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
          });
        });
    });
    
    $$('#btnSigninFacebook').on('click', function(e) {
    console.log('hola')
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function() {
            firebase.auth().getRedirectResult().then(function(result) {
                // This gives you a Google Access Token.
                // You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        });
    });
    
    $$('#btnSigninTwitter').on('click', function(e) {
    console.log('hola')
        var provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function() {
            firebase.auth().getRedirectResult().then(function(result) {
                // This gives you a Google Access Token.
                // You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        });
    });
    
	$$('#closeLogin').on('click', function () {$$('.login-screen').html('');seven.loginScreen.close('.login-screen')});
    
}

function UserMenu(){
    
    $$('.card').html('<div class="card-header"><p class="popup-title"><div class="row segmento"><button type="button" class="button col button-round btn color-white"id="exitCard">X</button></div></p></div><div class="card-content card-content-padding pop-up"><p class="popup-text">Cambiar el personaje :</p><hr><div class="row segmento"><img class="characterSelect" id="7"><img class="characterSelect" id="8"><img class="characterSelect" id="9"><img class="characterSelect" id="10"><img class="characterSelect" id="11"></div><hr><p class="popup-text">Cambiar nombre multijugador :</p> <hr><div class="item-inner"><div class="item-input-wrap"><div class="inputbox"><input type="text" class="inputname" placeholder="Nombre de usuario" value="'+ (UserConf[1].username || "") +'"><span class="input-clear-button resetinput"></span></div><hr></div></div></div><div id="gamescreen"><div class="block"><div class="row"><button class="button col" id="newUser">Cambiar Nombre</button><button class="button col" id="logOut">Salir de la cuenta</button></div></div></div>');
    
    $$('#'+UserConf[0].multiplayerCharacter).addClass("charSelected");
    
    $$('img').on('click', function (e) {
        
        UserConf[0].multiplayerCharacter = $$(this).attr('id');
        
        $$("img").removeClass("charSelected");
        $$(this).addClass("charSelected");
        
        socket.emit('set', UserConf[0].multiplayerCharacter);
        
    })
    
    $$('#logOut').on('click', function () {logOut();$$('.card').html('')})
    $$('#exitCard').on('click', function () {$$('.card').html('')});
    $$('#newUser').on('click', function () {
    
        username = $$('.inputname').val();

        if (username == undefined || username == "" || username == null){

            alert("Por favor rellene el nombre de usuario.")

        }else{
            
            updateName(username)
            
        }
    })
}

function addCard(title,text) {
    
	$$('.card').html('<div class="card-header"><p class="popup-title">' + title + '</p></div><div class="card-content card-content-padding pop-up"><p class="popup-text">' + text + '</p></div><div id="gamescreen"></div>');
    
}

function mainMenuControlls() {
    if(!pc){
	   document.removeEventListener("backbutton", mainMenu, false);   
	   document.addEventListener("backbutton", exitFromApp, false);
    }
	$$("#StartGame").on("click",function () {

		startGameMenu();

	});

	$$('#Multi').on('click', function () {
		
        if(firebase.auth().currentUser){
			if (UserConf[0].online ){
				multiplayerMenu();
			}else{
				alert('Active el multijugador')
			}
        }else{
			newUserMenu();
        }

	})

	$$('#ContinueGame').on('click', function () {

		loadGameMenu();

	})

	$$('#User').on('click',  function () {
        
        if(firebase.auth().currentUser){
          UserMenu();  
        }else{
		  newUserMenu();
        }
	})

	$$('#Menu').on('click', function () {

		configMenu();

	})

	$$('#Retos').on('click', function () {

		retosMenu();

	})
    
}

function startGameMenu(){

	startGame("prueba");
	
}

function loadGameMenu(){
	
	addCard('<div class="row segmento"><button type="button" class="button col button-round btn color-white"id="exitCard">X</button></div>','<div class="list relleno"><ul id="SeeSaves" ></ul></div>');
	
	for(var c = 2;c < UserConf.length;c++){
		
		console.log(UserConf[c]);
		
	}
	
	$$('#exitCard').on('click', function () {$$('.card').html('')})
	
}

function multiplayerMenu(){
	
	addCard('<div class="row segmento"><button type="button" class="button col button-round btn color-white" id="seeGC">Chat Global</button><button type="button" class="button col button-round btn color-white"id="seeR">Salas</button><button type="button" class="button col button-round btn color-white"id="seeRC">Chat de sala</button><button type="button" class="button col button-round btn color-white"id="exitCard">X</button></div>','<div class="list relleno"><ul id="GCmessages" ></ul></div><div class="item-input-wrap" id="multiInput"><input type="text" id="m" autocomplete="off" /><button type="button" class="button col button-round btn color-white"id="sendGC">Send</button></div>');
	
	for(var c = 0;c < chats.global.length;c++){
		
		printGlobalChat(chats.global[c])
		
	}
    
    $$('#exitCard').on('click', function () {$$('.card').html('')})
	
	$$('#sendGC').on('click' , function(){
        
		sendGlobalChat();
        
    });
	
    $$('#seeR').on('click' , function(){
        
		seeRoomList();
        
    });
    $$('#seeRC').on('click' , function(){
        
		seeRoomChat();
        
    });
}

function configMenu(){
	
	addCard('<div class="row segmento"><button type="button" class="button col button-round btn color-white"id="exitCard">X</button></div>','<div class="list simple-list relleno"><ul id="options" > <li><span>Tipo de Controles</span></li> <li><label class="item-radio item-content"><input type="radio" id="con1" name="typeControlls" value="1" checked/> <i class="icon icon-radio"></i><div class="item-inner">  <div class="item-title">joystick</div> </div>  </label> <label class="item-radio item-content"><input type="radio" id="con2" name="typeControlls" value="0" /><i class="icon icon-radio"></i><div class="item-inner"><div class="item-title">botones</div></div> </label></li><li class="item-content item-input"> <div class="item-inner"> <div class="item-title item-label">Sensibilidad</div> <div class="item-input-wrap "> <div class="range-slider range-slider-init " data-label="true"> <input type="range" id="sens" value="50" min="0" max="100" step="1"> </div> </div></div><div class="item-inner"> <div class="item-title item-label">Opacidad</div> <div class="item-input-wrap "> <div class="range-slider range-slider-init " data-label="true"> <input type="range" id="opac" value="50" min="0" max="100" step="1"> </div> </div> </div> </li><li> <span>Musica</span><label class="toggle toggle-init color-green"><input type="checkbox" id="music"><span class="toggle-icon"></span> </label> </li><li>  <span>Vibracion</span> <label class="toggle toggle-init color-green">     <input type="checkbox" id="vibrate">    <span class="toggle-icon"></span>  </label> </li><li>  <span>Multijugador</span>  <label class="toggle toggle-init color-green">   <input type="checkbox" id="online">   <span class="toggle-icon"></span>  </label>  </li><li>  <span>Partida en la nube</span>  <label class="toggle toggle-init color-green">   <input type="checkbox" id="save">   <span class="toggle-icon"></span>  </label>  </li><li><span>Calidad</span></li>  <li>  <span>Prerenderizado</span>  <label class="toggle toggle-init color-green">   <input type="checkbox" id="prere">   <span class="toggle-icon"></span>  </label>  </li><li>   <label class="item-radio item-content">  <input type="radio" id="per1" name="performance" value="1" checked />   <i class="icon icon-radio"></i> <div class="item-inner">   <div class="item-title">Movil</div> </div></label> <label class="item-radio item-content"><input type="radio" id="per2" name="performance" value="0" /><i class="icon icon-radio"></i><div class="item-inner"> <div class="item-title">Ordenador</div></div></label></li><li><span>Refresco</span></li>  <li>   <label class="item-radio item-content">  <input type="radio" id="fps1" name="fps" value="1" checked />   <i class="icon icon-radio"></i> <div class="item-inner">   <div class="item-title">30</div> </div></label> <label class="item-radio item-content"><input type="radio" id="fps2" name="fps" value="0" /><i class="icon icon-radio"></i><div class="item-inner"> <div class="item-title">60</div></div></label><label class="item-radio item-content"><input type="radio" id="fps3" name="fps" value="0" /><i class="icon icon-radio"></i><div class="item-inner"> <div class="item-title">maximo</div></div></label></li><li class="item-content item-input"> <div class="item-inner"> <div class="item-title item-label">Resolucion</div> <div class="item-input-wrap "> <div class="range-slider range-slider-init " data-label="true"> <input type="range" id="resu" value="50" min="200" max="1200" step="100"> </div> </div></div></li></ul></div>');
    
    if(UserConf[0].sens!=undefined){$$('#sens').val(UserConf[0].sens)}
    if(UserConf[0].opac!=undefined){$$('#opac').val(UserConf[0].opac)}
    if(UserConf[0].resolutionX!=undefined){$$('#resu').val(UserConf[0].resolutionX)}
    $$('#sens').on('change', function (e) {
        UserConf[0].sens=$$(this).val()
        localStorage.setItem("savedata", JSON.stringify(UserConf));
    })
    $$('#opac').on('change', function (e) {
        UserConf[0].opac=$$(this).val()
        localStorage.setItem("savedata", JSON.stringify(UserConf));
    })
    $$('#resu').on('change', function (e) {
        UserConf[0].resolutionX=$$(this).val()
        UserConf[0].resolutionY=(0.7+($$(this).val()/1.7777777777777778)|0)
        localStorage.setItem("savedata", JSON.stringify(UserConf));
    })
    if(UserConf[0].controlls==1){$$('#con2').attr("checked", "true")}
    
    $$('#con1').on('change', function () {
        UserConf[0].controlls=0
        localStorage.setItem("savedata", JSON.stringify(UserConf));
    })
    $$('#con2').on('change', function () {
        UserConf[0].controlls=1
        localStorage.setItem("savedata", JSON.stringify(UserConf));
    })
    
    if(UserConf[0].performance==true){$$('#per2').attr("checked", "true")}
    
    $$('#per1').on('change', function () {
        UserConf[0].performance=false
        localStorage.setItem("savedata", JSON.stringify(UserConf));
    })
    $$('#per2').on('change', function () {
        UserConf[0].performance=true
        localStorage.setItem("savedata", JSON.stringify(UserConf));
    })
    
    if(UserConf[0].fps==1000/30){$$('#fps1').attr("checked", "true")}
    
    $$('#fps1').on('change', function () {
        UserConf[0].fps=1000/30
        localStorage.setItem("savedata", JSON.stringify(UserConf));
    })
    
    if(UserConf[0].fps==1000/60){$$('#fps2').attr("checked", "true")}
    
    $$('#fps2').on('change', function () {
        UserConf[0].fps=1000/60
        localStorage.setItem("savedata", JSON.stringify(UserConf));
    })
    
    if(UserConf[0].fps==1){$$('#fps3').attr("checked", "true")}
    
    $$('#fps3').on('change', function () {
        UserConf[0].fps=1
        localStorage.setItem("savedata", JSON.stringify(UserConf));
    })

    $$('input').on('change',vibrate);
    
    if(UserConf[0].music==true){$$('#music').attr("checked", "true")}
    if(UserConf[0].vibrate==true){$$('#vibrate').attr("checked", "true")}
    if(UserConf[0].online==true){$$('#online').attr("checked", "true")}
    if(UserConf[0].preRender==true){$$('#prere').attr("checked", "true")}
    
    $$('#music').on('change', function (e) {
        if(this.checked){
            UserConf[0].music=true
            menuSound.play();
        }else{
            menuSound.stop();
            UserConf[0].music=false
        }
        localStorage.setItem("savedata", JSON.stringify(UserConf));
    })
    $$('#vibrate').on('change', function (e) {
        if(this.checked){UserConf[0].vibrate=true}else{UserConf[0].vibrate=false}
        localStorage.setItem("savedata", JSON.stringify(UserConf));
    })
    $$('#prere').on('change', function (e) {
        if(this.checked){UserConf[0].preRender=true}else{UserConf[0].preRender=false}
        localStorage.setItem("savedata", JSON.stringify(UserConf));
    })
    $$('#online').on('change', function (e) {
        if(this.checked){
			if (firebase.auth().currentUser){
            	UserConf[0].online=true;
            	multiplayer();
			}else{this.checked=false;newUserMenu()}
        }else{
            UserConf[0].online=false;
            socket.disconnect();
            multiplayerOn = false;
        }
        localStorage.setItem("savedata", JSON.stringify(UserConf));
    })
    $$('#save').on('change', function (e) {
        if(this.checked){UserConf[0].saves=true}else{UserConf[0].saves=false}
        localStorage.setItem("savedata", JSON.stringify(UserConf));
    })
    
    if(UserConf[0].saves==true){$$('#save').attr("checked", "true")}
    
	$$('#exitCard').on('click', function () {
        
        $$('.card').html('');
        
        if(UserConf[0].saves && firebase.auth().currentUser){
            ajaxcall("patch");
        }
        
        mainMenu();
    })
	
}

function seeRoomList(){
	
    addCard('<div class="row segmento"><button type="button" class="button col button-round btn color-white" id="seeGC">Chat Global</button><button type="button" class="button col button-round btn color-white"id="seeR">Salas</button><button type="button" class="button col button-round btn color-white"id="seeRC">Chat de sala</button><button type="button" class="button col button-round btn color-white"id="exitCard">X</button></div>','<div class="list relleno"><ul id="GCmessages" ></ul></div><div class="item-input-wrap" id="multiInput"><input type="text" id="m" autocomplete="off" /><button type="button" class="button col button-round btn color-white"id="sendGC">Send</button></div>');
    
	for (var nombre in rooms.list) {
  		if (rooms.list.hasOwnProperty(nombre)) {
			if(rooms.list[nombre] != null && rooms.list[nombre] != undefined){
				printRoom(nombre,rooms.list[nombre]);
			}
  		}
	}
    
    $$('#exitCard').on('click', function () {$$('.card').html('')})
	
	$$('#sendGC').on('click' , function(){
        
		createRoom();
        
    });
	
    $$('#seeGC').on('click' , function(){
        
		multiplayerMenu();
        
    });
    $$('#seeRC').on('click' , function(){
        
		seeRoomChat();
        
    });
	
}

function seeRoomChat(){
	
    addCard('<div class="row segmento"><button type="button" class="button col button-round btn color-white" id="seeGC">Chat Global</button><button type="button" class="button col button-round btn color-white"id="seeR">Salas</button><button type="button" class="button col button-round btn color-white"id="seeRC">Chat de sala</button><button type="button" class="button col button-round btn color-white"id="exitCard">X</button></div>','<div class="list relleno"><ul id="GCmessages" ></ul></div><div class="item-input-wrap"><input type="text" id="m" autocomplete="off" /><button type="button" class="button col button-round btn color-white"id="sendGC">Send</button></div>');
	
	for(var c = 0;c < chats.room.length;c++){
		
		printRoomChat(chats.room[c])
		
	}
    
    $$('#exitCard').on('click', function () {$$('.card').html('')})
	
	$$('#sendGC').on('click' , function(){
        
		sendRoomChat();
        
    });
	
    $$('#seeGC').on('click' , function(){
        
		multiplayerMenu();
        
    });
    $$('#seeR').on('click' , function(){
        
		seeRoomList();
        
    });
	
}

function retosMenu(){
	
	addCard('Retos','este es el menu de retos<hr><p class="segmented segmented-raised"><button class="button button-outline">Mapa 1</button><button class="button button-outline">Mapa 2</button><button class="button button-outline">Mapa 3</button><button class="button button-outline">Mapa 4</button></p><p class="segmented segmented-raised"><button class="button button-outline">Mapa 5</button><button class="button button-outline">Mapa 6</button><button class="button button-outline">Mapa 7</button><button class="button button-outline">Mapa 8</button></p>');
	
}