var socket;
var multiplayerOn;
var chats = {};
var players = {};
var coop = {};
var rooms = {};
coop.list ={};
rooms.list ={};
chats.room = [];
chats.global = [];

function multiplayer(){
	
	if(!multiplayerOn){
	
		multiplayerOn = true

		console.log('multijugador comenzado')

		socket = io("https://gioserver.herokuapp.com",{transports:["websocket"], forceNew: true });

		socket.emit('id', UserConf[1].multiplayerid);
		socket.emit('set', UserConf[0].multiplayerCharacter);
		socket.on('walking', function(msg){

			if(msg[0] != UserConf[1].multiplayerid){

				var o = coop.list[msg[0]];

				if(o.mapId == mapId){

					if( o.character == undefined || o.character == null ){

						coop.list[msg[0]].character = new MapObject({name:"coop",info:false,nt:players.list[msg[0]].set || 10});
						o = coop.list[msg[0]];
						if(players.list[msg[0]].set == 7){o.character.Tileset=playerTwoTileset}
						if(players.list[msg[0]].set == 8){o.character.Tileset=playerThreeTileset}
						if(players.list[msg[0]].set == 9){o.character.Tileset=playerFourTileset}
						if(players.list[msg[0]].set == 10){o.character.Tileset=charlieTileset}
                        if(players.list[msg[0]].set == 11){o.character.Tileset=playerTileset}
						if(o.character.Tileset == undefined){o.character.Tileset=charlieTileset}
					}

					o.character.objectCanMoveTo(msg[1], msg[2]);
					o.character.direction = msg[3];
					if(msg[3]=="u"){o.character.offset[1]+=40}
					if(msg[3]=="d"){o.character.offset[1]-=40}
					if(msg[3]=="l"){o.character.offset[0]+=40}
					if(msg[3]=="r"){o.character.offset[0]-=40}

				}else{

					o.character = null

				}
			}

		})

		socket.on('pushing', function(msg){

			if(msg[0] != UserConf[1].multiplayerid){

					var o = mapTileData.map[toIndex(msg[1],msg[2])].object;

					if(msg[3] == "u")		{o.objectCanMoveTo(msg[1],msg[2]-1,true);o.offset[1]+=17.5}
					if(msg[3] == "d")		{o.objectCanMoveTo(msg[1],msg[2]+1,true);o.offset[1]-=17.5}
					if(msg[3] == "l")		{o.objectCanMoveTo(msg[1]-1,msg[2],true);o.offset[0]+=17.5}
					if(msg[3] == "r")		{o.objectCanMoveTo(msg[1]+1,msg[2],true);o.offset[0]-=17.5}

			}  

		})

		socket.on('changeMap', function(msg){
			console.log('jugador cambiando de mapa')
			if(coop.list[msg[0]] == undefined){
					coop.list[msg[0]] = {};
			}
			coop.list[msg[0]].mapId = msg[1];
			coop.list[msg[0]].character = null

		})

		socket.on('playersList', function(msg){

			players.list = msg;
			console.log(msg);

		})

		socket.on('newPlayer', function(msg){

			players.list = msg;
			console.log(msg);

		})

		socket.on('roomsList', function(msg){

			rooms.list = msg;
			console.log(msg);

		})

		socket.on('allGlobalChats', function(msg){

			chats.global = msg;
			console.log(msg);

		})

		socket.on('globalChat', function(msg){

			chats.global.push(msg);
			printGlobalChat(msg);

		})

		socket.on('allRoomChats', function(msg){

			chats.room = msg;
			console.log(msg);

		})

		socket.on('roomChat', function(msg){

			chats.room.push(msg);
			printRoomChat(msg);

		})

		socket.on('newRoom', function(msg){
			console.log('nueva sala creada');
			rooms.list[msg[0]] = msg[1]
			if(UserConf[1].roomid == undefined){
				printRoom(msg[0],msg[1]);
			}
		})

		socket.on('changeRoom', function(msg){
			console.log('sala cambiada');
			rooms.list[msg[0]] = msg[1]
			if(UserConf[1].roomid == undefined){
				printRoom(msg);
			}
		})

		socket.on('enterRoom', function(msg){

			console.log('nuevo miembro en la sala');

			if(UserConf[1].roomid != undefined){
				printYourRoom(msg);
			}

		})

		socket.on('startGame', function(msg){

			console.log('Comenzando coperativo');

			addGameCanvas();

		})
		
	}
    
}

function printGlobalChat(msg){
	
    $$('#GCmessages').append('<li><div class="item-content"><div class="item-inner resizable"><div class="item-title">'+msg[2]+':<div class="item-header"><p class="popup-text">'+msg[0]+' </p></div><div class="item-footer">'+msg[1]+'</div></div><div class="item-after">'+msg[3]+'</div></div></div></li>');
	
}

function printRoomChat(msg){
	
    $$('#GCmessages').append('<li><div class="item-content"><div class="item-inner resizable"><div class="item-title">'+msg[2]+':<div class="item-header"><p class="popup-text">'+msg[0]+' </p></div><div class="item-footer">'+msg[1]+'</div></div><div class="item-after">'+msg[3]+'</div></div></div></li>');
	
}

function printRoom(id,msg){
	        
    $$('#GCmessages').append('<li><div class="item-content"><div class="item-inner resizable"><div class="item-title">Sala '+ id +':<div class="item-header"><p class="popup-text">'+msg.chief+' </p></div><div class="item-footer">'+msg.people.length+'/4 </div></div><div class="item-after"><button type="button" class="button col button-round btn color-white"id="'+ id +'">Entrar</button></div></div></div></li>');
    
    $$('#' + id).on('click',function (e){
		
		console.log($$(this).attr('id'));
		enterRoom($$(this).attr('id'));
		
	})
	
}

function printYourRoom(msg){
    
    $$('#GCmessages').html('<li><div class="item-content"><div class="item-inner resizable"><div class="item-title">Sala '+UserConf[1].roomid+':<div class="item-header"><p class="popup-text">'+msg.chief+' </p></div><div class="item-footer">'+msg.people.length+'/4 </div></div><div class="item-after"><button type="button" class="button col button-round btn color-white"id="startMG">Empezar</button></div></div></div></li>');
    
    $$('#startMG').on('click',function (){
        
        socket.emit('startGame',true);
        
    })
	
}

function sendGlobalChat(){
	
	var timenow = new Date();
	
	time = timenow.getFullYear()+'-'+timenow.getMonth()+'-'+timenow.getDate()+' '+timenow.getHours()+':'+timenow.getMinutes();
	
	socket.emit('globalChat', [$$('#m').val(), UserConf[1].multiplayerid, UserConf[1].username, time]);
	
	$$('#m').val('');
    
}

function sendRoomChat(){
	
    var timenow = new Date();
	
	time = timenow.getFullYear()+'-'+timenow.getMonth()+'-'+timenow.getDate()+' '+timenow.getHours()+':'+timenow.getMinutes();
	
	socket.emit('roomChat', [$$('#m').val(), UserConf[1].multiplayerid, UserConf[1].username, time]);
	
	$$('#m').val('');
    
}

function enterRoom(msg){
	
	console.log(msg);
	
	UserConf[1].roomid = msg;
    
    socket.emit('enterRoom', [UserConf[1].roomid, UserConf[1].multiplayerid]);
    
	$$('#GCmessages').html('');
    $$('#multiInput').html('');
}

function createRoom(){
    
    UserConf[1].roomid = $$('#m').val();
	
    socket.emit('newRoom', [$$('#m').val(), UserConf[1].multiplayerid]);
	
    $$('#GCmessages').html('');
    $$('#multiInput').html('');
    
}

function exitRoom(){
	
	socket.emit('exitRoom', [UserConf[1].roomid, UserConf[1].multiplayerid, UserConf[1].username]);
    
}
    
function startMG(){
    
    
    
}