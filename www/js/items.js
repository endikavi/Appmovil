var itemTypes = {
	
	1 : {
		name : "Star",
		maxStack : 100,
		sprite : new Sprite(tileset,[{x:240,y:0,w:40,h:40}]),
		offset : [0,0]
	}
	
};

function Stack(id, qty) {
	
	this.type = id;
	this.qty = qty;
	
}

function PlacedItemStack(id, qty) {
	
	this.type = id;
	this.qty = qty;
	this.x = 0;
	this.y = 0;
	
}

PlacedItemStack.prototype.placeAt = function(nx, ny) {
	
	if(mapTileData.map[toIndex(this.x, this.y)].itemStack==this) {
		
		mapTileData.map[toIndex(this.x, this.y)].itemStack = null;
		
	}
	
	this.x = nx;
	this.y = ny;
	
	mapTileData.map[toIndex(nx, ny)].itemStack = this;
	
};