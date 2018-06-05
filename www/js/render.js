
var viewport = {
	
	screen		: [0,0],
	startTile	: [0,0],
	endTile		: [0,0],
	offset		: [0,0],
	update		: function(px, py) {
		
		this.offset[0] = Math.floor((this.screen[0]/2) - px);
		this.offset[1] = Math.floor((this.screen[1]/2) - py);

		var tile = [ Math.floor(px/tileW), Math.floor(py/tileH) ];

		this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0]/2) / tileW);
		this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1]/2) / tileH);

		if(this.startTile[0] < 0) { this.startTile[0] = 0; }
		if(this.startTile[1] < 0) { this.startTile[1] = 0; }

		this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0]/2) / tileW);
		this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1]/2) / tileH);

		if(this.endTile[0] >= mapW) { this.endTile[0] = mapW-1; }
		if(this.endTile[1] >= mapH) { this.endTile[1] = mapH-1; }
		
	}
};
	
var z;
var l = mapTileData.levels;
var y;
var ye = viewport.endTile[1];
var x;
var xe = viewport.endTile[0];

var mapTileNow;
var currentFrameTime;
var timeElapsed;
var sec;

var playerRoof1;
var playerRoof2;

var ot;
var o;
var is;

var stop = false;
var frameCount;
var fps, fpsInterval, startTime, now, then, elapsed;

var tileIndex;
var sensi;
var movement;

var drawGameInterval;

function renderGame() {
	
	fpsInterval = UserConf[0].fps;
    then = Date.now();
    startTime = then;
    
    autogenTiles();
	
	setMap();
    
	ctx  = document.getElementById('layer0').getContext("2d", { alpha: false ,imageSmoothingEnabled: false});
	ctx1 = document.getElementById('layer2').getContext("2d", { alpha: true });
	ctx2 = document.getElementById('layer2').getContext("2d", { alpha: true });
	ctx3 = document.getElementById('layer3').getContext("2d", { alpha: true });
	ctx.font = "bold 10pt sans-serif";
	ctx.fillStyle = "#000000";
	ctx3.fillStyle = "#ff0000";
	ctx3.font = "bold 10pt sans-serif";
	
	window.addEventListener("keydown", function(e) {
		if((e.keyCode>=37 && e.keyCode<=40) || (e.keyCode=69) ) { keysDown[e.keyCode] = true; }
		if(e.keyCode==80) { keysDown[e.keyCode] = true; }
	});
	window.addEventListener("keyup", function(e) {
		if(e.keyCode>=37 && e.keyCode<=40) { keysDown[e.keyCode] = false; }
		if(e.keyCode==83)
		{
			currentSpeed = (currentSpeed>=(gameSpeeds.length-1) ? 0 : currentSpeed+1);
		}
		if(e.keyCode==80 || e.keyCode==69) { keysDown[e.keyCode] = false; }
	});
	
	sensi = UserConf[0].sens;
    console.log(UserConf[0].resolutionX+" "+UserConf[0].resolutionY)
	viewport.screen = [UserConf[0].resolutionX,UserConf[0].resolutionY];
	mapTileData.buildMapFromData(gameMap, mapW, mapH);
	mapTileData.addRoofs(roofList);
	populateMap();
	preRender = setInterval(function (){
            preLoadSprites();
            if(UserConf[0].preRender){
                mapTileData.preLoad();
            }
			clearInterval(preRender)
    },0);
	
	if(UserConf[0].performance){
        drawGameInterval = setInterval(drawGame,0)
    }else{
        requestAnimationFrame(drawGame);
    }
};


function gameControlls(){

		if (!player.processMovement(gameTime) && gameSpeeds[currentSpeed].mult != 0) {
			stop = false;
			this.direction = directions.right;

			if ((keysDown[38] && player.canMoveUp()) || (joystick.deltaY() < -sensi && player.canMoveUp() && joystick.up())) {
				if (multiplayerOn) {
					socket.emit('walking', [player.tileFrom[0], player.tileFrom[1] - 1, "u"]);
				}
				player.moveUp(gameTime);
			} else if ((keysDown[40] && player.canMoveDown()) || joystick.deltaY() > sensi && player.canMoveDown() && joystick.down()) {
				if (multiplayerOn) {
					socket.emit('walking', [player.tileFrom[0], player.tileFrom[1] + 1, "d"]);
				}
				player.moveDown(gameTime);
			} else if ((keysDown[37] && player.canMoveLeft()) || joystick.deltaX() < -sensi && player.canMoveLeft() && joystick.left()) {
				if (multiplayerOn) {
					socket.emit('walking', [player.tileFrom[0] - 1, player.tileFrom[1], "l"]);
				}
				player.moveLeft(gameTime);
			} else if ((keysDown[39] && player.canMoveRight()) || joystick.deltaX() > sensi && player.canMoveRight() && joystick.right()) {
				if (multiplayerOn) {
					socket.emit('walking', [player.tileFrom[0] + 1, player.tileFrom[1], "r"]);
				}
				player.moveRight(gameTime);
			} else if (keysDown[38] || joystick.up()) {
				player.direction = directions.up;
			} else if (keysDown[40] || joystick.down()) {
				player.direction = directions.down;
			} else if (keysDown[37] || joystick.left()) {
				player.direction = directions.left;
			} else if (keysDown[39] || joystick.right()) {
				player.direction = directions.right;
			} else if (keysDown[80]) {
				
				player.pickUp();
				
			}
		} else if (keysDown[80]){
			
			player.pickUp();
			
		}

}

function drawGame() {
	
	if(ctx==null) { return; }
	
	if(!tilesetLoaded && !musicLoaded) {alert("Failed loading some assets. "); ctx=null; mainMenu(); return; }
		
	currentFrameTime = Date.now();
	now = currentFrameTime;
	
	sec = Math.floor(Date.now()/1000);
    elapsed = now - then;
	
	if (elapsed > fpsInterval) {
        
        timeElapsed = currentFrameTime - lastFrameTime;
        
        gameTime+= Math.floor(timeElapsed * gameSpeeds[currentSpeed].mult);
        
        gameControlls();
        
        then = now - (elapsed % fpsInterval);

		viewport.update(player.position[0] + (player.dimensions[0]/2),player.position[1] + (player.dimensions[1]/2));

		playerRoof1 = mapTileData.map[toIndex(player.tileFrom[0], player.tileFrom[1])].roof;

		playerRoof2 = mapTileData.map[toIndex(player.tileTo[0], player.tileTo[1])].roof;

		l = mapTileData.levels;
		ye = viewport.endTile[1];
		xe = viewport.endTile[0];
		
		ctx1.clearRect(0, 0, viewport.screen[0], viewport.screen[1]);
		ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);
		if(mapTileData.preLoaded){
				
				ctx.drawImage(mapTileData.prem,-viewport.offset[0],-viewport.offset[1], viewport.screen[0], viewport.screen[1], 0, 0, viewport.screen[0], viewport.screen[1]);

		}
		
		for(z = 0;z < l; z++) {

			for(y = viewport.startTile[1];y <= ye; ++y) {

				for(x = viewport.startTile[0];x <= xe; ++x) {

				mapTileNow = mapTileData.map[toIndex(x,y)];
					
				if(z==0 && !mapTileData.preLoaded){
					
					tileTypes[mapTileNow.type].sprite.draw(
						gameTime,
						viewport.offset[0] + (x*tileW),
						viewport.offset[1] + (y*tileH));
					
				}else{

					if(z==1) {

						is = mapTileNow.itemStack;

						if(is!=null) {

							itemTypes[is.type].sprite.draw(
								gameTime,
								viewport.offset[0] + (x*tileW) + itemTypes[is.type].offset[0],
								viewport.offset[1] + (y*tileH) + itemTypes[is.type].offset[1]);
						}
					}

					o = mapTileNow.object;

					if(o!=null && objectTypes[o.type].zIndex==1 && z==1 && (y*tileH) <= player.position[1]+5) {

						o.processMovement();
                        ot = objectTypes[o.type];
						if(o.sprite == undefined){
							ot.sprite.draw(gameTime,
								viewport.offset[0] + (x*tileW) + ot.offset[0] + o.offset[0],
								viewport.offset[1] + (y*tileH) + ot.offset[1] + o.offset[1]);
						}else{
							
							o.sprite.draw(gameTime,
								viewport.offset[0] + (x*tileW) + ot.offset[0] + o.offset[0],
								viewport.offset[1] + (y*tileH) + ot.offset[1] + o.offset[1]);
						}
					}

					if(z==1 && (y*tileH) <= (player.position[1])+27) {

						player.sprites[player.direction].draw(
						gameTime,
						viewport.offset[0] + player.position[0],
						viewport.offset[1] + player.position[1]);

					}
					
					if(o!=null && objectTypes[o.type].zIndex==1 && z==1 && (y*tileH) >= player.position[1]) {

						o.processMovement();
                        ot = objectTypes[o.type];
						if(o.sprite == undefined){
							ot.sprite.draw(gameTime,
								viewport.offset[0] + (x*tileW) + ot.offset[0] + o.offset[0],
								viewport.offset[1] + (y*tileH) + ot.offset[1] + o.offset[1]);
						}else{
							
							o.sprite.draw(gameTime,
								viewport.offset[0] + (x*tileW) + ot.offset[0] + o.offset[0],
								viewport.offset[1] + (y*tileH) + ot.offset[1] + o.offset[1]);
						}
					}
					
					if(o!=null && objectTypes[o.type].zIndex==3 && z==3) {

						ot = objectTypes[o.type];

						ot.sprite.draw(gameTime,
							viewport.offset[0] + (x*tileW) + ot.offset[0] + o.offset[0],
							viewport.offset[1] + (y*tileH) + ot.offset[1] + o.offset[1]);
					}

					if(z==2 && mapTileNow.roofType!=0 && mapTileNow.roof!=playerRoof1 && mapTileNow.roof!=playerRoof2){

						tileTypes[mapTileNow.roofType].sprite.draw(
							gameTime,
							viewport.offset[0] + (x*tileW),
							viewport.offset[1] + (y*tileH));
					}
				}
			}
		}
	}
	
	if(sec!=currentSecond) {
		
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
		if(ctx3==null) { return; }
	
		ctx3.clearRect(0, 0, viewport.screen[0]/2, viewport.screen[1]/2);
	    ctx3.fillStyle = "#ff0000";
		ctx3.textAlign = "left";
        //tileIndex = parseInt(player.tileFrom[1]) * mapW + parseInt(player.tileFrom[0]);
    	ctx3.fillText("FPS: " + framesLastSecond, 10, 15);
        /*ctx3.fillText("Game speed: " + gameSpeeds[currentSpeed].name, 10, 40);
        ctx3.fillText(player.position[1] + 'X: '+ player.tileFrom[0] +' Y: '+ player.tileFrom[1] +' Indice: '+ tileIndex, 10, 60);
        ctx3.fillText("Steps: " + pasoscount, 10, 80);*/
		
	}else { frameCount++; }

	lastFrameTime = currentFrameTime;
		
	}
	
    if(!UserConf[0].performance){requestAnimationFrame(drawGame);}else{gameControlls()}
	
}

function lookingTo(){
	
	if(player.direction == directions.up)		{return ((parseInt(player.tileFrom[1])-1) * mapW + parseInt(player.tileFrom[0]))}
	else if(player.direction == directions.down)	{return ((parseInt(player.tileFrom[1])+1) * mapW + parseInt(player.tileFrom[0]))} 
	else if(player.direction == directions.left)	{return (parseInt(player.tileFrom[1]) * mapW + parseInt(player.tileFrom[0])-1)}
	else if(player.direction == directions.right){return (parseInt(player.tileFrom[1]) * mapW + parseInt(player.tileFrom[0])+1)}
	
}

function toIndex(x, y) {
	
	return((y * mapW) + x);
	
}