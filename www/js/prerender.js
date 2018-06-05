
var unique;
var ul;
var pl;


function preLoadSprites(){
	
	unique = gameMap.filter( onlyUnique );
	ul = unique.length;
	
	for(pl = 0;pl < ul; pl++){
		
		tileTypes[unique[pl]].sprite.preload();
		
	}
	
}
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}