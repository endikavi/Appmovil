var pushObjectType = {
    
    1 : {
		name : "Box pushable",
		sprite : new Sprite([{x:40,y:160,w:40,h:40}]),
		offset : [0,0],
		collision : objectCollision.push,
		zIndex : 1
	}
    
    
}

function MapPushObject(nt)
{
	this.x		= 0;
	this.y		= 0;
	this.type	= nt;
    this.tileFrom	= [1,1];
	this.tileTo		= [1,1];
	this.timePushd	= 20;

	this.delayPush	= {};
	this.delayPush[floorTypes.path]			= 150;
	this.delayPush[floorTypes.grass]		= 150;
	this.delayPush[floorTypes.ice]			= 100;
	this.delayPush[floorTypes.conveyorU]	= 100;
	this.delayPush[floorTypes.conveyorD]	= 100;
	this.delayPush[floorTypes.conveyorL]	= 100;
	this.delayPush[floorTypes.conveyorR]	= 100;
    
    this.direction	= directions.right;
}

MapPushObject.prototype.placeAt = function(nx, ny)
{
	if(mapTileData.map[toIndex(this.x, this.y)].object==this)
	{
		mapTileData.map[toIndex(this.x, this.y)].object = null;
	}
	
	this.x = nx;
	this.y = ny;
	
	mapTileData.map[toIndex(nx, ny)].object = this;
};

function changeMap(){
    
    gameMap[0] = 0;
    player.placeAt(1,1);
    
}

MapPushObject.prototype.processPushment = function(t)
{
	if(this.tileFrom[0]==this.tileTo[0] && this.tileFrom[1]==this.tileTo[1]) { return false; }

	var PushSpeed = this.delayPush[tileTypes[mapTileData.map[toIndex(this.tileFrom[0],this.tileFrom[1])].type].floor];

	if((t-this.timePushd)>=PushSpeed)
	{
		this.placeAt(this.tileTo[0], this.tileTo[1]);

		if(mapTileData.map[toIndex(this.tileTo[0], this.tileTo[1])].eventEnter!=null)
		{
			mapTileData.map[toIndex(this.tileTo[0], this.tileTo[1])].eventEnter(this);
		}

		var tileFloor = tileTypes[mapTileData.map[toIndex(this.tileFrom[0], this.tileFrom[1])].type].floor;

        //eventos de movimientos segun casillas
        
        
		if(tileFloor==floorTypes.ice)
		{
			if(this.canPushDirection(this.direction))
			{
				this.PushDirection(this.direction, t);
			}
		}
        
		else if(tileFloor==floorTypes.conveyorL && this.canPushLeft())	{ this.PushLeft(t); }
		else if(tileFloor==floorTypes.conveyorR && this.canPushRight()) { this.PushRight(t); }
		else if(tileFloor==floorTypes.conveyorU && this.canPushUp())	{ this.PushUp(t); }
		else if(tileFloor==floorTypes.conveyorD && this.canPushDown())	{ this.PushDown(t); }
	}
	else
	{
		this.position[0] = (this.tileFrom[0] * tileW) + ((tileW-this.dimensions[0])/2);
		this.position[1] = (this.tileFrom[1] * tileH) + ((tileH-this.dimensions[1])/2);

		if(this.tileTo[0] != this.tileFrom[0])
		{
			var diff = (tileW / PushSpeed) * (t-this.timePushd);
			this.position[0]+= (this.tileTo[0]<this.tileFrom[0] ? 0 - diff : diff);
		}
		if(this.tileTo[1] != this.tileFrom[1])
		{
			var diff = (tileH / PushSpeed) * (t-this.timePushd);
			this.position[1]+= (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);
		}

		this.position[0] = Math.round(this.position[0]);
		this.position[1] = Math.round(this.position[1]);
	}
	return true;
}
MapPushObject.prototype.canPushTo = function(x, y)
{
	if(x < 0 || x >= mapW || y < 0 || y >= mapH) { return false; }
	if(typeof this.delayPush[tileTypes[mapTileData.map[toIndex(x,y)].type].floor]=='undefined') { return false; }
	if(mapTileData.map[toIndex(x,y)].object!=null)
	{
		var o = mapTileData.map[toIndex(x,y)].object;
		if(objectTypes[o.type].collision==objectCollision.solid)
		{
			keysDown[37] = false;
			keysDown[38] = false;
			keysDown[39] = false;
			keysDown[40] = false;
			return false;
		}else if(objectTypes[o.type].collision==objectCollision.push){
            return false;
        }
	}
	        return true;
};
MapPushObject.prototype.canPushUp		= function() { return this.canPushTo(this.tileFrom[0], this.tileFrom[1]-2); };
MapPushObject.prototype.canPushDown 	= function() { return this.canPushTo(this.tileFrom[0], this.tileFrom[1]+2); };
MapPushObject.prototype.canPushLeft 	= function() { return this.canPushTo(this.tileFrom[0]-2, this.tileFrom[1]); };
MapPushObject.prototype.canPushRight 	= function() { return this.canPushTo(this.tileFrom[0]+2, this.tileFrom[1]); };
MapPushObject.prototype.canPushDirection = function(d) {
	switch(d)
	{
		case directions.up:
			return this.canPushUp();
		case directions.down:
			return this.canPushDown();
		case directions.left:
			return this.canPushLeft();
		default:
			return this.canPushRight();
	}
};

MapPushObject.prototype.PushLeft	= function(t) { this.tileTo[0]-=1; this.timePushd = t; this.direction = directions.left;};
MapPushObject.prototype.PushRight	= function(t) { this.tileTo[0]+=1; this.timePushd = t; this.direction = directions.right;};
MapPushObject.prototype.PushUp		= function(t) { this.tileTo[1]-=1; this.timePushd = t; this.direction = directions.up;};
MapPushObject.prototype.PushDown	= function(t) { this.tileTo[1]+=1; this.timePushd = t; this.direction = directions.down;};
MapPushObject.prototype.PushDirection = function(d, t) {
	
	switch(d)
	{
		case directions.up:
			return this.PushUp(t);
		case directions.down:
			return this.PushDown(t);
		case directions.left:
			return this.PushLeft(t);
		default:
			return this.PushRight(t);
	}
};


