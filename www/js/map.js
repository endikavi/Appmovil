
var gameMap = [];

var roofList = [];

var mapId = 0001;

var mapW = 50, mapH = 50;

var mapTileData = new TileMap();

function populateMap() {
	
	if(mapId == 0001) {populateMap0001()}
    
    if(mapId == 0002) {populateMap0002()}

	if(mapId == 0003) {populateMap0003()}
    
    if(mapId == 0004) {populateMap0004()}
    
    if(mapId == 0005) {populateMap0005()}
    
    if(mapId == 0006) {populateMap0006()}
    
    if(mapId == 0007) {populateMap0007()}
    
    if(mapId == 0008) {populateMap0008()}
    
    if(mapId == 000) {populateMap000()}
    
}

function setMap() {
	
	if(mapId == 0001) {setMap0001()}

    if(mapId == 0002) {setMap0002()}
    
    if(mapId == 0003) {setMap0003()}
    
    if(mapId == 0004) {setMap0004()}
    
    if(mapId == 0005) {setMap0005()}
    
    if(mapId == 0006) {setMap0006()}
    
    if(mapId == 0007) {setMap0007()}
    
    if(mapId == 0008) {setMap0008()}
    
    if(mapId == 0009) {setMap0009()}
    
    if(mapId == 000) {setMap000()}
    
}

function changeMap(id){
		if (multiplayerOn) {
			socket.emit('changeMap',id);
		}
		ctx.clearRect(0, 0, viewport.screen[0], viewport.screen[1]);
		ctx1.clearRect(0, 0, viewport.screen[0], viewport.screen[1]);
		ctx2.clearRect(0, 0, viewport.screen[0], viewport.screen[1]);
		mapTileData.preLoaded = false;
		mapId=id
        setMap();
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

}

function TileMap() {
	
	this.map	= [];
	this.w		= 0;
	this.h		= 0;
	this.levels	= 4;
	this.prem = null;
	this.premCtx = null;
	this.preLoaded = false;
	
}

TileMap.prototype.preLoad = function() {
	
	if(this.preLoaded == false){
        
		this.prem = document.createElement('canvas');
		this.prem.width = this.w*40 ;
		this.prem.height = this.h*40 ;
		this.premCtx = this.prem.getContext('2d');
        
		this.premCtx.fillStyle = "#000000";
		this.premCtx.fillRect(0, 0, this.prem.width, this.prem.height);
        
		for(var ym = 0;ym < this.h; ++ym) {

			for(var xm = 0;xm < this.w; ++xm) {

                this.premCtx.drawImage(tileTypes[mapTileData.map[toIndex(ym,xm)].type].sprite.pre, 40*ym, 40*xm);
			
				this.preLoaded = true;
			}

		}
        
		
	}	
}

TileMap.prototype.buildMapFromData = function(d, w, h) {
	
	this.w		= w;
	this.h		= h;
	
	if(d.length!=(w*h)) { return false; }
	
	this.map.length	= 0;
	
	for(var y = 0; y < h; y++) {
		
		for(var x = 0; x < w; x++) {
			
			this.map.push( new Tile(x, y, d[((y*w)+x)]) );
			
		}
	}
	
	return true;
};

TileMap.prototype.addRoofs = function(roofs) {
	
	for(var i in roofs) {
		
		var r = roofs[i];
		
		if(r.x < 0 || r.y < 0 || r.x >= this.w || r.y >= this.h ||
			(r.x+r.w)>this.w || (r.y+r.h)>this.h ||
			r.data.length!=(r.w*r.h)) {
			
			continue;
			
		}
		
		for(var y = 0; y < r.h; y++) {
			
			for(var x = 0; x < r.w; x++) {
				
				var tileIdx = (((r.y+y)*this.w)+r.x+x);
				
				this.map[tileIdx].roof = r;
				
				this.map[tileIdx].roofType = r.data[((y*r.w)+x)];
			}
		}
	}
};