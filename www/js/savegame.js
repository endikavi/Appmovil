
var pc = true;

function appInit(){
	
    pc = false;
    UserConf[1].mobileid = device.uuid
	userdata=localStorage.getItem('savedata');
    userdata=JSON.parse(userdata);
    
    if( userdata != null){
        
        UserConf = userdata;
		
        if (UserConf[0].online) {
			
			multiplayer();
			
		}
		
		mainMenu();
		
    }else{
        
        TakeMobileInfo();
        localStorage.setItem("savedata", JSON.stringify(UserConf));
        mainMenu();
        newUserMenu();

    }
	
}

function pcInit(){
	
	userdata=localStorage.getItem('savedata');
    userdata=JSON.parse(userdata);
    
    if( userdata != null){
        
        UserConf = userdata;
		
        if (UserConf[0].online) {
			
			multiplayer();
			
		}
		
	mainMenu();
		
    }else{
        
        UserConf[1].mobileid = undefined
    
        UserConf[1].mobileinfo = {}
        
        localStorage.setItem("savedata", JSON.stringify(UserConf));
        
        mainMenu();
        newUserMenu();

    }
	
}

function TakeMobileInfo() {
    
    UserConf[1].mobileid = device.uuid
    
    UserConf[1].mobileinfo = {
        
        Fabricante:     device.manufacturer,
        Cordova:        device.cordova,
        Modelo:         device.model,
        Plataforma:     device.platform,
        Version:        device.version,
        Emulacion:      device.isVirtual,
        Serial:         device.serial,
        
    }
    
}

function vibrate() {
    if (UserConf[0].vibrate) {
		console.log(navigator.vibrate(40));
	}
}

function vibrateLong() {
    if (UserConf[0].vibrate) {
		console.log(navigator.vibrate(2000));
	}
}

function startGame(savename){
	
	UserConf.push({
		
            lvl: 1,
            name:savename,
            inventory:"",
            actualmap: 0001,
            actualpositionx: 3,
            actualpositiony: 3
        
	})
	
	addGameCanvas();
	
}

function loadGame(){
	
	
	
}

var UserConf = [
    
        {
        
            controlls: 1,
            music: true,
            vibrate: true,
			performance: true,
            preRender: true,
            fps: 60,
			resolutionX: 800,
			resolutionY: 450,
            online: true,
            saves: true,
            opac: 50,
            sens: 50, 
            multiplayerCharacter: 10,
			
        },
                
        {
            
            username: undefined,
            multiplayerid: undefined,
            roomid: undefined,
            mobileid: undefined,
            mobileinfo: undefined
        
        }
    
    ];