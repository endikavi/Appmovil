
var tilesetLoaded = true;

var tileset = new Tileset("img/tileset.png");

var terrainTileset = new Tileset("img/terraintileset.png");

var playerTileset = new Tileset("img/player.png");

var water = new Tileset("img/water.png");

var cartelTile = new Tileset("img/carteltile.png");

var msgbox= new Image(); msgbox.src="css/msgbox.png";

var charlieTileset = new Tileset("img/charliechar.png");

var playerTwoTileset = new Tileset("img/player2.png");

var playerThreeTileset = new Tileset("img/player3.png");

var playerFourTileset = new Tileset("img/player4.png");

function Tileset(src){
	
	this.T = new Image();
	this.T.loaded = false;
	this.T.src = src;
	
	this.T.onerror = function() {
		
		ctx = null;
		alert("Failed loading: " + src);
		tilesetLoaded = false;
		
	};
	
	this.T.onload = function() { this.loaded = true; };
	
}

function Sprite(img,data) {
	
	this.img = img
    
	this.animated	= data.length > 1;
	this.frameCount	= data.length;
	this.duration	= 1;
	this.loop		= true;
	this.preCtx		= null;
	this.pre		= null;
	
	if(data.length > 1) {
		
		for(var i in data) {
			
			if(typeof data[i].d=='undefined') {
				
				data[i].d = 100;
				
			}
			
			this.duration+= data[i].d;
			
			if(typeof data[i].loop!='undefined') {
				
				this.loop = data[i].loop ? true : false;
				
			}
		}
	}
	
	this.frames		= data;
	
}

Sprite.prototype.draw = function(t, x, y) {
	if(this.preCtx==null){
	var frameIdx = 0;
	
	if(!this.loop && this.animated && t>=this.duration) {
		
		frameIdx = (this.frames.length - 1);
		
	}else if(this.animated) {
		
		t = t % this.duration;
		var totalD = 0;
		
		for(var i in this.frames) {
			
			totalD+= this.frames[i].d;
			frameIdx = i;
			
			if(t<=totalD) {
				
				break;
				
			}
		}
	}
	
	var offset = (typeof this.frames[frameIdx].offset=='undefined' ? [0,0] : this.frames[frameIdx].offset);
	ctx1.drawImage(this.img.T,this.frames[frameIdx].x, this.frames[frameIdx].y,this.frames[frameIdx].w, this.frames[frameIdx].h,  (0.5+(x + offset[0])|0),  (0.5+(y + offset[1])|0),this.frames[frameIdx].w, this.frames[frameIdx].h);
	}else{
		
		ctx.drawImage(this.pre,x,y);
		
	}
};

Sprite.prototype.preload = function() {
	if(this.preCtx==null){
		this.pre = document.createElement('canvas');
		this.pre.width = 40 ;
		this.pre.height = 40 ;
		this.preCtx = this.pre.getContext('2d');
		this.preCtx.drawImage(this.img.T,this.frames[0].x,this.frames[0].y,40,40,0,0,40,40);
	}
};