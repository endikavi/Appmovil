
var ctx = null;

var pasoscount = 0;

var gameMap = [
	0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0, 0, 0,  0,  0, 0, 0,  0, 0, 0,  0,  0, 0,  0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0,
	0, 51, 5, 5, 0, 5,  5, 5, 0, 5, 5, 5, 5, 5, 5, 51,  0, 51, 2, 0,  2,  2, 2, 0,  2, 2, 2,  0,  2, 2,  2, 2, 0, 51, 5, 5, 0,  0, 5, 5, 5, 5, 5,  5, 5, 5, 5, 5,  0, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 5, 5, 5, 5, 5, 5,  0,  0,  0, 2, 2,  2,  0, 2, 2,  2, 0, 2,  0,  2, 0,  0, 2, 0,  0, 5, 5, 5,  5, 5, 5, 5, 5, 5,  5, 5, 5, 5, 5,  5, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 5, 5, 5, 5, 5, 5,  5,  0,  2, 0, 0,  0,  2, 2, 0,  2, 0, 2,  0,  2, 0, 51, 2, 0,  5, 5, 5, 5,  5, 5, 5, 5, 5, 0,  5, 5, 5, 5, 5,  5, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 5, 5, 5, 5, 5, 5,  5,  0,  2, 2, 2,  2,  2, 0, 2,  2, 0, 2,  0,  2, 2,  0, 0, 0,  5, 5, 5, 5,  5, 0, 5, 5, 5, 5,  5, 5, 5, 5, 5,  5, 0,
	0,  5, 5, 0, 5, 5,  5, 5, 5, 5, 5, 5, 5, 5, 5,  5,  0,  2, 0, 0,  0,  0, 2, 2,  0, 2, 2,  2,  0, 2,  2, 2, 0,  5, 5, 0, 5,  5, 5, 5, 5, 5, 5,  5, 5, 5, 5, 5,  5, 0,
	0,  5, 5, 5, 5, 5,  5, 0, 5, 5, 5, 5, 5, 5, 5,  5,  0,  0, 2, 2,  2,  2, 0, 2,  0, 2, 0,  2,  0, 0,  0, 2, 0,  5, 5, 5, 5,  5, 5, 5, 5, 5, 5,  5, 0, 5, 5, 5,  5, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 5, 5, 5, 5, 5, 5,  5,  0,  2, 2, 0,  0,  2, 0, 2,  0, 0, 0,  2,  0, 2,  2, 2, 0,  5, 0, 5, 5,  5, 5, 0, 5, 5, 5,  5, 5, 5, 5, 5,  5, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 5, 5, 5, 5, 5, 5,  5,  0,  2, 0, 2,  0,  2, 2, 2,  0, 2, 2,  2,  0, 2,  0, 2, 0,  5, 5, 5, 5,  5, 5, 5, 5, 5, 5,  5, 5, 5, 5, 5,  0, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 5, 5, 5, 5, 5, 5,  5,  0,  2, 2, 2,  2,  0, 0, 0,  2, 2, 0,  0,  2, 2,  0, 2, 0,  0, 5, 5, 5,  5, 5, 5, 5, 5, 5,  5, 5, 5, 5, 5,  5, 0,
	0,  0, 5, 5, 5, 5,  5, 5, 5, 5, 5, 5, 5, 5, 5,  5,  0,  0, 2, 0,  0,  2, 2, 2,  2, 0, 2,  2,  2, 0,  0, 2, 0,  5, 5, 5, 5,  5, 5, 5, 5, 5, 5,  5, 5, 5, 5, 5,  5, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 5, 5, 5, 5, 5, 5,  0,  0,  2, 2, 2,  0,  2, 0, 0,  0, 2, 2,  0,  0, 0,  2, 2, 0,  5, 5, 5, 5,  5, 5, 5, 5, 5, 5,  5, 5, 5, 5, 0,  5, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 5, 5, 5, 0, 5, 5,  5,  0,  2, 0, 2,  0,  2, 2, 2,  2, 0, 2,  2,  2, 2,  0, 0, 0,  5, 5, 5, 5,  5, 5, 5, 5, 5, 5,  0, 5, 5, 5, 5,  5, 0,
	0,  5, 5, 5, 0, 5,  5, 5, 5, 5, 5, 5, 5, 5, 5,  5,  0,  2, 0, 2,  2,  0, 0, 0,  2, 2, 0,  0,  0, 2,  2, 2, 0,  5, 5, 5, 5,  5, 5, 5, 5, 0, 5,  5, 5, 5, 5, 5,  5, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 0, 5, 5, 5, 5, 5,  5,  0,  2, 0, 0,  2,  2, 2, 2,  0, 0, 2,  2,  2, 0,  0, 2, 0,  0, 5, 5, 5,  5, 5, 5, 5, 5, 5,  5, 5, 5, 5, 5,  0, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 5, 5, 5, 5, 5, 5,  5,  0,  2, 2, 2,  0,  2, 0, 2,  2, 2, 2,  0,  2, 2,  2, 2, 0,  5, 5, 5, 5,  5, 5, 5, 5, 5, 5,  5, 5, 5, 5, 5, 51, 0,
	0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0, 0, 0,  0,  0, 0, 0,  0, 0, 0,  0,  0, 0,  0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0,
	0, 51, 2, 2, 0, 2,  2, 2, 2, 2, 0, 2, 2, 2, 0,  2,  0,  1, 1, 1,  1,  1, 1, 1,  1, 1, 1,  1,  1, 1,  1, 1, 0,  2, 2, 2, 0,  2, 2, 0, 2, 2, 2,  2, 2, 0, 2, 2,  2, 0,
	0,  0, 0, 2, 2, 0,  2, 0, 0, 0, 2, 2, 0, 2, 2,  2,  0,  1, 1, 1,  1,  1, 1, 1,  1, 1, 1,  1,  1, 1,  1, 1, 0,  2, 0, 2, 2,  0, 2, 2, 2, 0, 0,  0, 2, 2, 2, 0,  2, 0,
	0,  2, 0, 0, 2, 2,  2, 2, 2, 2, 2, 0, 2, 0, 0,  2,  0,  1, 1, 1,  1,  1, 1, 2,  2, 2, 1,  1,  1, 1,  1, 1, 0,  2, 2, 0, 2,  0, 0, 0, 2, 2, 2,  2, 0, 0, 0, 2,  2, 0,
	0,  2, 2, 2, 0, 0,  2, 0, 0, 0, 0, 2, 2, 2, 0,  2,  0,  1, 1, 1,  2,  2, 2, 2, 51, 2, 2,  2,  2, 1,  1, 1, 0,  0, 2, 0, 2,  2, 2, 2, 0, 0, 0,  2, 0, 2, 2, 2,  0, 0,
	0,  2, 0, 2, 2, 0,  2, 2, 2, 2, 2, 0, 0, 2, 2,  2,  0,  1, 1, 1,  2, 51, 2, 2,  2, 2, 2, 51,  2, 1,  1, 1, 0,  2, 2, 2, 0, 51, 0, 2, 0, 2, 2,  2, 0, 2, 0, 0,  2, 0,
	0,  2, 2, 0, 2, 2,  0, 0, 0, 2, 0, 2, 2, 0, 2,  0, 50,  1, 1, 1,  2,  2, 2, 1,  1, 1, 2,  2,  2, 1,  1, 1, 0,  2, 0, 2, 2,  0, 2, 2, 0, 2, 0,  0, 2, 2, 2, 2,  2, 0,
	0,  2, 0, 2, 2, 0,  2, 0, 2, 2, 2, 0, 2, 0, 2,  2,  0,  1, 1, 2,  2,  2, 1, 3,  3, 3, 1,  2,  2, 2,  1, 1, 0,  2, 0, 0, 2,  2, 0, 0, 2, 2, 0,  2, 0, 0, 0, 0,  2, 0,
	0,  2, 0, 2, 0, 0,  2, 0, 2, 0, 0, 0, 2, 2, 0,  2,  0,  1, 1, 2, 51,  2, 1, 3,  1, 3, 1,  2, 51, 2,  1, 1, 0,  2, 2, 2, 0,  0, 2, 2, 2, 0, 2,  2, 2, 2, 0, 2,  2, 0,
	0,  2, 0, 2, 2, 0,  2, 2, 2, 0, 2, 0, 0, 2, 2,  2,  0,  1, 1, 2,  2,  2, 1, 3,  3, 3, 1,  2,  2, 2,  1, 1, 0,  0, 0, 2, 0,  2, 2, 0, 2, 0, 2,  0, 2, 0, 0, 2,  0, 0,
	0,  2, 2, 0, 2, 2,  0, 2, 0, 2, 2, 2, 2, 0, 2,  0, 50,  1, 1, 1,  2,  2, 2, 1,  1, 1, 2,  2,  2, 1,  1, 1, 0,  2, 2, 2, 2,  0, 0, 2, 2, 0, 0, 51, 2, 2, 0, 2,  2, 0,
	0,  0, 2, 0, 0, 2,  0, 2, 0, 2, 0, 0, 2, 2, 2,  2,  0,  1, 1, 1,  2, 51, 2, 2,  2, 2, 2, 51,  2, 1,  1, 1, 0,  2, 0, 0, 0,  2, 2, 0, 2, 2, 2,  0, 0, 2, 2, 0,  2, 0,
	0,  0, 2, 2, 0, 2,  2, 0, 2, 2, 0, 2, 0, 0, 0,  2,  0,  1, 1, 1,  2,  2, 2, 2, 51, 2, 2,  2,  2, 1,  1, 1, 0,  2, 0, 2, 2,  0, 2, 2, 0, 0, 2,  0, 2, 2, 0, 0,  2, 0,
	0,  2, 2, 0, 2, 0,  2, 2, 2, 0, 2, 2, 2, 2, 0,  2,  0,  1, 1, 1,  1,  1, 1, 2,  2, 2, 1,  1,  1, 1,  1, 1, 0,  2, 2, 0, 2,  0, 0, 2, 2, 2, 2,  2, 0, 2, 2, 2,  2, 0,
	0,  2, 0, 2, 2, 2,  0, 2, 0, 2, 2, 0, 0, 0, 0,  2,  0,  1, 1, 1,  1,  1, 1, 1,  1, 1, 1,  1,  1, 1,  1, 1, 0,  2, 0, 0, 2,  2, 2, 0, 0, 0, 2,  0, 2, 0, 2, 0,  0, 0,
	0, 51, 0, 2, 0, 2,  2, 2, 2, 2, 0, 2, 2, 2, 2,  2,  0,  1, 1, 1,  1,  1, 1, 1,  1, 1, 1,  1,  1, 1,  1, 1, 0,  2, 2, 2, 2,  0, 2, 2, 2, 2, 2,  0, 2, 2, 2, 2,  2, 0,
	0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0, 0, 0,  0,  0, 0, 0,  0, 0, 0,  0,  0, 0,  0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0,
	0,  5, 5, 0, 5, 5,  5, 5, 5, 0, 5, 5, 5, 5, 5,  5,  0,  2, 2, 2,  0,  2, 2, 2, 51, 2, 2,  2,  0, 2,  2, 2, 0,  5, 5, 0, 5,  5, 5, 5, 5, 5, 5,  0, 5, 5, 0, 5, 51, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 5, 5, 5, 5, 5, 5,  5,  0,  0, 2, 0,  0,  2, 0, 0,  0, 0, 0,  2,  2, 2,  0, 2, 0,  5, 5, 5, 5,  5, 5, 5, 5, 5, 5,  5, 5, 5, 5, 5,  5, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 5, 5, 5, 5, 5, 5,  5,  0,  2, 2, 2,  0,  2, 2, 2,  0, 2, 2,  0,  0, 0,  2, 2, 0,  5, 5, 5, 5,  5, 5, 0, 5, 5, 5,  5, 5, 5, 5, 5,  5, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 0, 5, 5, 5, 5, 5,  5,  0,  2, 0, 2,  2,  0, 0, 2,  0, 2, 0,  0,  2, 2,  2, 0, 0,  0, 5, 5, 5,  5, 5, 5, 5, 5, 5,  5, 5, 5, 5, 0,  5, 0,
	0,  0, 5, 5, 5, 5,  5, 5, 5, 5, 5, 0, 5, 5, 5,  0,  0,  2, 2, 0,  0,  0, 2, 2,  0, 2, 2,  0,  2, 0,  0, 2, 0,  5, 5, 5, 5,  5, 5, 5, 5, 5, 5,  5, 5, 5, 5, 5,  5, 0,
	0,  5, 5, 5, 5, 5, 51, 5, 5, 5, 5, 5, 5, 5, 5,  5,  0,  0, 2, 2,  2,  0, 2, 0,  0, 0, 2,  2,  2, 2,  2, 2, 0,  5, 5, 5, 0,  5, 5, 5, 5, 5, 5,  5, 5, 5, 5, 5,  5, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 5, 5, 5, 5, 5, 5,  5,  0,  2, 2, 0,  2,  2, 2, 2,  0, 2, 0,  0,  0, 2,  0, 2, 0,  5, 5, 5, 5,  5, 5, 5, 0, 5, 5,  5, 5, 5, 5, 5,  5, 0,
	0,  0, 5, 5, 5, 5,  5, 5, 5, 5, 5, 5, 5, 5, 5,  5,  0,  2, 0, 2,  0,  0, 0, 2,  0, 2, 0,  2,  2, 2,  0, 2, 0,  5, 5, 5, 5,  5, 5, 5, 5, 5, 5,  5, 5, 5, 5, 5,  5, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 5, 0, 5, 5, 5, 5,  5,  0,  2, 0, 2,  2,  2, 0, 2,  0, 2, 0,  2,  0, 0,  2, 2, 0,  5, 5, 5, 5,  5, 5, 5, 5, 5, 0,  5, 5, 5, 5, 5,  5, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 5, 5, 5, 5, 5, 5,  5,  0,  2, 2, 2,  0,  2, 2, 2,  0, 2, 2,  2,  0, 2,  2, 0, 0,  5, 5, 5, 5,  5, 5, 5, 5, 5, 5,  5, 5, 5, 5, 5,  0, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 5, 5, 5, 0, 5, 5,  5,  0,  0, 2, 0,  2,  0, 0, 2,  0, 2, 0,  2,  2, 0,  2, 2, 0,  5, 5, 0, 5,  5, 5, 5, 5, 5, 5,  5, 5, 5, 5, 5,  5, 0,
	0,  5, 5, 5, 0, 5,  5, 5, 5, 5, 5, 5, 5, 5, 5,  5,  0,  2, 2, 0,  2,  2, 2, 2,  0, 2, 2,  0,  2, 2,  2, 0, 0,  0, 5, 5, 5,  5, 5, 5, 5, 5, 5,  5, 5, 5, 5, 5,  5, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 5, 5, 5, 5, 5, 5,  5,  0,  2, 0, 2,  0,  0, 0, 2,  0, 0, 2,  2,  2, 0,  2, 2, 0,  5, 5, 5, 5,  5, 5, 5, 5, 5, 5,  0, 5, 5, 5, 5,  5, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 5, 5, 5, 5, 5, 5,  5,  0,  0, 2, 2,  2,  2, 2, 2,  0, 2, 2,  0,  0, 2,  0, 2, 0,  5, 5, 5, 5,  5, 0, 5, 5, 5, 5,  5, 5, 5, 5, 5,  5, 0,
	0,  5, 5, 5, 5, 5,  5, 5, 5, 0, 5, 5, 5, 5, 5,  5,  0,  2, 0, 0,  0,  2, 0, 0,  0, 0, 0,  2,  0, 2,  2, 2, 0,  5, 5, 5, 5,  5, 5, 5, 5, 5, 5,  5, 5, 5, 5, 5,  5, 0,
	0,  5, 5, 5, 5, 0,  5, 5, 5, 5, 5, 0, 5, 5, 5, 51,  0,  2, 2, 2,  2,  2, 2, 2, 51, 2, 2,  2,  2, 2,  0, 2, 0, 51, 5, 5, 5,  5, 5, 5, 5, 5, 5,  5, 5, 5, 5, 5,  5, 0,
	0,  0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0, 0, 0,  0,  0, 0, 0,  0, 0, 0,  0,  0, 0,  0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0,  0, 0
];

var mapTileData = new TileMap();

var roofList = [
	{ x:1, y:1, w:15, h:15, data: [
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
	]},
	{ x:17, y:1, w:15, h:15, data: [
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
	]},
	{ x:33, y:1, w:16, h:15, data: [
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
	]},
	{ x:1, y:17, w:15, h:15, data: [
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
	]},
	{ x:33, y:17, w:16, h:15, data: [
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
	]},
	{ x:1, y:33, w:15, h:16, data: [
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
	]},
	{ x:17, y:33, w:15, h:16, data: [
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
	]},
	{ x:33, y:33, w:16, h:16, data: [
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
	]}
];

var tileW = 40, tileH = 40;

var mapW = 50, mapH = 50;

var currentSecond = 0, frameCount = 0, framesLastSecond = 0, lastFrameTime = 0;
var tileset = null, tilesetURL = "tileset.png", tilesetLoaded = false;

var gameTime = 0;
var gameSpeeds = [
	{name:"Normal", mult:1},
	{name:"Slow", mult:0.3},
	{name:"Fast", mult:3},
	{name:"Paused", mult:0}
];
var currentSpeed = 0;

function Sprite(data)
{
	this.animated	= data.length > 1;
	this.frameCount	= data.length;
	this.duration	= 0;
	this.loop		= true;
	
	if(data.length > 1)
	{
		for(var i in data)
		{
			if(typeof data[i].d=='undefined')
			{
				data[i].d = 100;
			}
			this.duration+= data[i].d;
			
			if(typeof data[i].loop!='undefined')
			{
				this.loop = data[i].loop ? true : false;
			}
		}
	}
	
	this.frames		= data;
}
Sprite.prototype.draw = function(t, x, y)
{
	var frameIdx = 0;
	
	if(!this.loop && this.animated && t>=this.duration)
	{
		frameIdx = (this.frames.length - 1);
	}
	else if(this.animated)
	{
		t = t % this.duration;
		var totalD = 0;
		
		for(var i in this.frames)
		{
			totalD+= this.frames[i].d;
			frameIdx = i;
			
			if(t<=totalD)
			{
				break;
			}
		}
	}
	
	var offset = (typeof this.frames[frameIdx].offset=='undefined' ?
		[0,0] : this.frames[frameIdx].offset);
	
	ctx.drawImage(tileset,
		this.frames[frameIdx].x, this.frames[frameIdx].y,
		this.frames[frameIdx].w, this.frames[frameIdx].h,
		x + offset[0], y + offset[1],
		this.frames[frameIdx].w, this.frames[frameIdx].h);
};

var itemTypes = {
	1 : {
		name : "Star",
		maxStack : 100,
		sprite : new Sprite([{x:240,y:0,w:40,h:40}]),
		offset : [0,0]
	}
};

function Stack(id, qty)
{
	this.type = id;
	this.qty = qty;
}
function Inventory(s)
{
	this.spaces		= s;
	this.stacks		= [];
}
Inventory.prototype.addItems = function(id, qty)
{
	for(var i = 0; i < this.spaces; i++)
	{
		if(this.stacks.length<=i)
		{
			var maxHere = (qty > itemTypes[id].maxStack ?
				itemTypes[id].maxStack : qty);
			this.stacks.push(new Stack(id, maxHere));
			
			qty-= maxHere;
		}
		else if(this.stacks[i].type == id &&
			this.stacks[i].qty < itemTypes[id].maxStack)
		{
			var maxHere = (itemTypes[id].maxStack - this.stacks[i].qty);
			if(maxHere > qty) { maxHere = qty; }
			
			this.stacks[i].qty+= maxHere;
			qty-= maxHere;
		}
		
		if(qty==0) { return 0; }
	}
	
	return qty;
};

function PlacedItemStack(id, qty)
{
	this.type = id;
	this.qty = qty;
	this.x = 0;
	this.y = 0;
}
PlacedItemStack.prototype.placeAt = function(nx, ny)
{
	if(mapTileData.map[toIndex(this.x, this.y)].itemStack==this)
	{
		mapTileData.map[toIndex(this.x, this.y)].itemStack = null;
	}
	
	this.x = nx;
	this.y = ny;
	
	mapTileData.map[toIndex(nx, ny)].itemStack = this;
};

var objectCollision = {
	none		: 0,
	solid		: 1,
    push        : 2
};
var objectTypes = {
	1 : {
		name : "Box",
		sprite : new Sprite([{x:40,y:160,w:40,h:40}]),
		offset : [0,0],
		collision : objectCollision.solid,
		zIndex : 1
	},
	2 : {
		name : "Broken Box",
		sprite : new Sprite([{x:40,y:200,w:40,h:40}]),
		offset : [0,0],
		collision : objectCollision.none,
		zIndex : 1
	},
	3 : {
		name : "Tree top",
		sprite : new Sprite([{x:80,y:160,w:80,h:80}]),
		offset : [-20,-20],
		collision : objectCollision.solid,
		zIndex : 1
	},
    4 : {
		name : "Box pushable",
		sprite : new Sprite([{x:40,y:160,w:40,h:40}]),
		offset : [0,0],
		collision : objectCollision.push,
		zIndex : 1
	}
};
function MapObject(nt)
{
	this.x		= 0;
	this.y		= 0;
	this.type	= nt;
}
MapObject.prototype.placeAt = function(nx, ny)
{
	if(mapTileData.map[toIndex(this.x, this.y)].object==this)
	{
		mapTileData.map[toIndex(this.x, this.y)].object = null;
	}
	
	this.x = nx;
	this.y = ny;
	
	mapTileData.map[toIndex(nx, ny)].object = this;
};

var floorTypes = {
	solid	: 0,
	path	: 1,
	water	: 2,
	ice		: 3,
	conveyorU	: 4,
	conveyorD	: 5,
	conveyorL	: 6,
	conveyorR	: 7,
	grass		: 8
};
var tileTypes = {
	0 : { colour:"#685b48", floor:floorTypes.solid,
		sprite:new Sprite([{x:0,y:0,w:40,h:40}])	},
	1 : { colour:"#5aa457", floor:floorTypes.grass,
		sprite:new Sprite([{x:40,y:0,w:40,h:40}])	},
	2 : { colour:"#e8bd7a", floor:floorTypes.path,
		sprite:new Sprite([{x:80,y:0,w:40,h:40}])	},
	3 : { colour:"#286625", floor:floorTypes.solid,
		sprite:new Sprite([{x:120,y:0,w:40,h:40}])	},
	4 : { colour:"#678fd9", floor:floorTypes.water,
		sprite:new Sprite([
			{x:160,y:0,w:40,h:40,d:200}, {x:200,y:0,w:40,h:40,d:200},
			{x:160,y:40,w:40,h:40,d:200}, {x:200,y:40,w:40,h:40,d:200},
			{x:160,y:40,w:40,h:40,d:200}, {x:200,y:0,w:40,h:40,d:200}
		])},
	5 : { colour:"#eeeeff", floor:floorTypes.ice,
		sprite:new Sprite([{x:120,y:120,w:40,h:40}])	},
	6 : { colour:"#cccccc", floor:floorTypes.conveyorL,
		sprite:new Sprite([
			{x:0,y:40,w:40,h:40,d:200}, {x:40,y:40,w:40,h:40,d:200},
			{x:80,y:40,w:40,h:40,d:200}, {x:120,y:40,w:40,h:40,d:200}
		])},
	7 : { colour:"#cccccc", floor:floorTypes.conveyorR,
		sprite:new Sprite([
			{x:120,y:80,w:40,h:40,d:200}, {x:80,y:80,w:40,h:40,d:200},
			{x:40,y:80,w:40,h:40,d:200}, {x:0,y:80,w:40,h:40,d:200}
		])},
	8 : { colour:"#cccccc", floor:floorTypes.conveyorD,
		sprite:new Sprite([
			{x:160,y:200,w:40,h:40,d:200}, {x:160,y:160,w:40,h:40,d:200},
			{x:160,y:120,w:40,h:40,d:200}, {x:160,y:80,w:40,h:40,d:200}
		])},
	9 : { colour:"#cccccc", floor:floorTypes.conveyorU,
		sprite:new Sprite([
			{x:200,y:80,w:40,h:40,d:200}, {x:200,y:120,w:40,h:40,d:200},
			{x:200,y:160,w:40,h:40,d:200}, {x:200,y:200,w:40,h:40,d:200}
		])},
	
	10 : { colour:"#ccaa00", floor:floorTypes.solid,
		sprite:new Sprite([{x:40,y:120,w:40,h:40}])},
	11 : { colour:"#ccaa00", floor:floorTypes.solid,
		sprite:new Sprite([{x:80,y:120,w:40,h:40}])},
	12 : { colour:"rgba(0,0,0,0)", floor:floorTypes.solid,
		sprite:new Sprite([{x:0,y:0,w:0,h:0}])},
	50 : { colour:"#abcdef", floor:floorTypes.path,
		sprite:new Sprite([{x:240,y:40,w:40,h:40}])},
	51 : { colour:"#123456", floor:floorTypes.path,
		sprite:new Sprite([{x:240,y:80,w:40,h:40}])},
	112 : { colour:"#ccaa00", floor:floorTypes.path,
		sprite:new Sprite([{x:80,y:120,w:40,h:40}])},
	122 : { colour:"rgba(0,0,0,0)", floor:floorTypes.path,
		sprite:new Sprite([{x:0,y:0,w:0,h:0}])}
};

function Tile(tx, ty, tt)
{
	this.x			= tx;
	this.y			= ty;
	this.type		= tt;
	this.roof		= null;
	this.roofType	= 0;
	this.eventEnter	= null;
	this.object		= null;
	this.itemStack	= null;
}

function TileMap()
{
	this.map	= [];
	this.w		= 0;
	this.h		= 0;
	this.levels	= 4;
}
TileMap.prototype.buildMapFromData = function(d, w, h)
{
	this.w		= w;
	this.h		= h;
	
	if(d.length!=(w*h)) { return false; }
	
	this.map.length	= 0;
	
	for(var y = 0; y < h; y++)
	{
		for(var x = 0; x < w; x++)
		{
			this.map.push( new Tile(x, y, d[((y*w)+x)]) );
		}
	}
	
	return true;
};
TileMap.prototype.addRoofs = function(roofs)
{
	for(var i in roofs)
	{
		var r = roofs[i];
		
		if(r.x < 0 || r.y < 0 || r.x >= this.w || r.y >= this.h ||
			(r.x+r.w)>this.w || (r.y+r.h)>this.h ||
			r.data.length!=(r.w*r.h))
		{
			continue;
		}
		
		for(var y = 0; y < r.h; y++)
		{
			for(var x = 0; x < r.w; x++)
			{
				var tileIdx = (((r.y+y)*this.w)+r.x+x);
				
				this.map[tileIdx].roof = r;
				this.map[tileIdx].roofType = r.data[((y*r.w)+x)];
			}
		}
	}
};

var directions = {
	up		: 0,
	right	: 1,
	down	: 2,
	left	: 3
};

var keysDown = {
	37 : false,
	38 : false,
	39 : false,
	40 : false,
	80 : false
};

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

var player = new Character();

function Character()
{
	this.tileFrom	= [1,1];
	this.tileTo		= [1,1];
	this.timeMoved	= 0;
	this.dimensions	= [30,30];
	this.position	= [45,45];

	this.delayMove	= {};
	this.delayMove[floorTypes.path]			= 150;
	this.delayMove[floorTypes.grass]		= 150;
	this.delayMove[floorTypes.ice]			= 100;
	this.delayMove[floorTypes.conveyorU]	= 100;
	this.delayMove[floorTypes.conveyorD]	= 100;
	this.delayMove[floorTypes.conveyorL]	= 100;
	this.delayMove[floorTypes.conveyorR]	= 100;

	this.direction	= directions.right;
	this.sprites = {};
	this.sprites[directions.up]		= new Sprite([{x:0,y:120,w:30,h:30}]);
	this.sprites[directions.right]	= new Sprite([{x:0,y:150,w:30,h:30}]);
	this.sprites[directions.down]	= new Sprite([{x:0,y:180,w:30,h:30}]);
	this.sprites[directions.left]	= new Sprite([{x:0,y:210,w:30,h:30}]);
	
	this.inventory = new Inventory(4);
}
Character.prototype.placeAt = function(x, y)
{
	this.tileFrom	= [x,y];
	this.tileTo		= [x,y];
	this.position	= [((tileW*x)+((tileW-this.dimensions[0])/2)),
		((tileH*y)+((tileH-this.dimensions[1])/2))];
};
Character.prototype.processMovement = function(t)
{
	if(this.tileFrom[0]==this.tileTo[0] && this.tileFrom[1]==this.tileTo[1]) { return false; }

	var moveSpeed = this.delayMove[tileTypes[mapTileData.map[toIndex(this.tileFrom[0],this.tileFrom[1])].type].floor];

	if((t-this.timeMoved)>=moveSpeed)
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
			if(this.canMoveDirection(this.direction))
			{
				this.moveDirection(this.direction, t);
			}
		}
        
		else if(tileFloor==floorTypes.conveyorL && this.canMoveLeft())	{ this.moveLeft(t); }
		else if(tileFloor==floorTypes.conveyorR && this.canMoveRight()) { this.moveRight(t); }
		else if(tileFloor==floorTypes.conveyorU && this.canMoveUp())	{ this.moveUp(t); }
		else if(tileFloor==floorTypes.conveyorD && this.canMoveDown())	{ this.moveDown(t); }
	}
	else
	{
		this.position[0] = (this.tileFrom[0] * tileW) + ((tileW-this.dimensions[0])/2);
		this.position[1] = (this.tileFrom[1] * tileH) + ((tileH-this.dimensions[1])/2);

		if(this.tileTo[0] != this.tileFrom[0])
		{
			var diff = (tileW / moveSpeed) * (t-this.timeMoved);
			this.position[0]+= (this.tileTo[0]<this.tileFrom[0] ? 0 - diff : diff);
		}
		if(this.tileTo[1] != this.tileFrom[1])
		{
			var diff = (tileH / moveSpeed) * (t-this.timeMoved);
			this.position[1]+= (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);
		}

		this.position[0] = Math.round(this.position[0]);
		this.position[1] = Math.round(this.position[1]);
	}
	return true;
}
Character.prototype.canMoveTo = function(x, y)
{
	if(x < 0 || x >= mapW || y < 0 || y >= mapH) { return false; }
	if(typeof this.delayMove[tileTypes[mapTileData.map[toIndex(x,y)].type].floor]=='undefined') { return false; }
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
               
            var mpo1 = new MapPushObject(1); mpo1.placeAt(x, y);
            
            if(mpo1.canPushDirection(player.direction))
			{
				mpo1.PushDirection(mpo1.direction, mpo1.timePushd);
			}
            return false;
        }
	}
			pasoscount ++;
	        return true;
};
Character.prototype.canMoveUp		= function() { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1]-1); };
Character.prototype.canMoveDown 	= function() { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1]+1); };
Character.prototype.canMoveLeft 	= function() { return this.canMoveTo(this.tileFrom[0]-1, this.tileFrom[1]); };
Character.prototype.canMoveRight 	= function() { return this.canMoveTo(this.tileFrom[0]+1, this.tileFrom[1]); };
Character.prototype.canMoveDirection = function(d) {
	switch(d)
	{
		case directions.up:
			return this.canMoveUp();
		case directions.down:
			return this.canMoveDown();
		case directions.left:
			return this.canMoveLeft();
		default:
			return this.canMoveRight();
	}
};

Character.prototype.moveLeft	= function(t) { this.tileTo[0]-=1; this.timeMoved = t; this.direction = directions.left;};
Character.prototype.moveRight	= function(t) { this.tileTo[0]+=1; this.timeMoved = t; this.direction = directions.right;};
Character.prototype.moveUp		= function(t) { this.tileTo[1]-=1; this.timeMoved = t; this.direction = directions.up;};
Character.prototype.moveDown	= function(t) { this.tileTo[1]+=1; this.timeMoved = t; this.direction = directions.down;};
Character.prototype.moveDirection = function(d, t) {
	
	switch(d)
	{
		case directions.up:
			return this.moveUp(t);
		case directions.down:
			return this.moveDown(t);
		case directions.left:
			return this.moveLeft(t);
		default:
			return this.moveRight(t);
	}
};
Character.prototype.pickUp = function()
{
	keysDown[80] = false; 
	if(this.tileTo[0]!=this.tileFrom[0] ||
		this.tileTo[1]!=this.tileFrom[1])
	{
		return false;
	}
	
	var is = mapTileData.map[toIndex(this.tileFrom[0],
				this.tileFrom[1])].itemStack;
	
	if(is!=null)
	{
		var remains = this.inventory.addItems(is.type, is.qty);

		if(remains) { is.qty = remains; }
		else
		{
			mapTileData.map[toIndex(this.tileFrom[0],
				this.tileFrom[1])].itemStack = null;
		}
	}
	
	return true;
};

function toIndex(x, y)
{
	return((y * mapW) + x);
}

window.onload =    function(){
    
	ctx = document.getElementById('game').getContext("2d");
	requestAnimationFrame(drawGame);
	ctx.font = "bold 10pt sans-serif";

	window.addEventListener("keydown", function(e) {
		if(e.keyCode>=37 && e.keyCode<=40) { keysDown[e.keyCode] = true; }
		if(e.keyCode==80) { keysDown[e.keyCode] = true; }
	});
	window.addEventListener("keyup", function(e) {
		if(e.keyCode>=37 && e.keyCode<=40) { keysDown[e.keyCode] = false; }
		if(e.keyCode==83)
		{
			currentSpeed = (currentSpeed>=(gameSpeeds.length-1) ? 0 : currentSpeed+1);
		}
		if(e.keyCode==80) { keysDown[e.keyCode] = false; }
	});

	viewport.screen = [800,450];

	tileset = new Image();
	tileset.onerror = function()
	{
		ctx = null;
		alert("Failed loading tileset.");
	};
	tileset.onload = function() { tilesetLoaded = true; };
	tileset.src = tilesetURL;
	
	mapTileData.buildMapFromData(gameMap, mapW, mapH);
	mapTileData.addRoofs(roofList);
	player.placeAt(16, 22);
    
    //eventos
	/*mapTileData.map[((2*mapW)+2)].eventEnter = function()
		{ console.log("Entered tile 2,2"); };*/
	mapTileData.map[((21+21*mapW))].eventEnter = function()
		{ player.placeAt(1, 1)};
	mapTileData.map[((15+1*mapW))].eventEnter = function()
		{ player.placeAt(21, 21)};
	mapTileData.map[((24+20*mapW))].eventEnter = function()
		{ player.placeAt(17, 1)};
	mapTileData.map[((30+3*mapW))].eventEnter = function()
		{ player.placeAt(24, 20)};
	mapTileData.map[((27+21*mapW))].eventEnter = function()
		{ player.placeAt(33, 1)};
	mapTileData.map[((48+15*mapW))].eventEnter = function()
		{ player.placeAt(27, 21)};
	mapTileData.map[((28+24*mapW))].eventEnter = function()
		{ player.placeAt(37, 21)};
	mapTileData.map[((43+26*mapW))].eventEnter = function()
		{ player.placeAt(28, 24)};
	mapTileData.map[((27+27*mapW))].eventEnter = function()
		{ player.placeAt(48, 33)};
	mapTileData.map[((33+48*mapW))].eventEnter = function()
		{ player.placeAt(27, 27)};
	mapTileData.map[((24+28*mapW))].eventEnter = function()
		{ player.placeAt(24, 33)};
	mapTileData.map[((24+48*mapW))].eventEnter = function()
		{ player.placeAt(24, 28)};
	mapTileData.map[((21+27*mapW))].eventEnter = function()
		{ player.placeAt(15, 48)};
	mapTileData.map[((6+38*mapW))].eventEnter = function()
		{ player.placeAt(21, 27)};
	mapTileData.map[((20+24*mapW))].eventEnter = function()
		{ player.placeAt(1, 17)};
	mapTileData.map[((1+31*mapW))].eventEnter = function()
		{ player.placeAt(20, 24)};
	mapTileData.map[((16+26*mapW))].eventEnter = function()
		{ player.placeAt(16, 22)};
    /*mapTileData.map[((5+1*mapW))].eventEnter = function(){
        { console.log("Entered tile 5,1"); };
        changeMap();
        mapTileData.buildMapFromData(gameMap, mapW, mapH);
	    mapTileData.addRoofs(roofList);
    };*/
    
    /*mapTileData.map[((17+17*mapW))].eventEnter = function()
    { mpo1.placeAt(7, 8)};*/
    
    //objetos de mapa
	var mo1 = new MapObject(3); mo1.placeAt(18, 18);
	var mo2 = new MapObject(3); mo2.placeAt(30, 18);
	var mo3 = new MapObject(3); mo3.placeAt(24, 24);
	var mo4 = new MapObject(3); mo4.placeAt(18, 30);
	var mo5 = new MapObject(3); mo5.placeAt(30, 30);
    //items
	var ps1 = new PlacedItemStack(1, 1); ps1.placeAt(7, 1);
	var ps2 = new PlacedItemStack(1, 1); ps2.placeAt(11, 1);
	var ps3 = new PlacedItemStack(1, 1); ps3.placeAt(15, 3);
	var ps4 = new PlacedItemStack(1, 1); ps4.placeAt(3, 4);
	var ps5 = new PlacedItemStack(1, 1); ps5.placeAt(1, 11);
	var ps6 = new PlacedItemStack(1, 1); ps6.placeAt(4, 12);
	var ps7 = new PlacedItemStack(1, 1); ps7.placeAt(9, 13);
	var ps8 = new PlacedItemStack(1, 1); ps8.placeAt(28, 1);
	var ps9 = new PlacedItemStack(1, 1); ps9.placeAt(17, 5);
	var ps10 = new PlacedItemStack(1, 1); ps10.placeAt(22, 5);
	var ps11 = new PlacedItemStack(1, 1); ps11.placeAt(25, 6);
	var ps12 = new PlacedItemStack(1, 1); ps12.placeAt(19, 8);
	var ps13 = new PlacedItemStack(1, 1); ps13.placeAt(25, 11);
	var ps14 = new PlacedItemStack(1, 1); ps14.placeAt(30, 11);
	var ps15 = new PlacedItemStack(1, 1); ps15.placeAt(25, 13);
	var ps16 = new PlacedItemStack(1, 1); ps16.placeAt(19, 15);
	var ps17 = new PlacedItemStack(1, 1); ps17.placeAt(21, 15);
	var ps18 = new PlacedItemStack(1, 1); ps18.placeAt(41, 1);
	var ps19 = new PlacedItemStack(1, 1); ps19.placeAt(39, 4);
	var ps20 = new PlacedItemStack(1, 1); ps20.placeAt(33, 6);
	var ps21 = new PlacedItemStack(1, 1); ps21.placeAt(48, 10);
	var ps22 = new PlacedItemStack(1, 1); ps22.placeAt(43, 11);
	var ps23 = new PlacedItemStack(1, 1); ps23.placeAt(40, 13);
	var ps24 = new PlacedItemStack(1, 1); ps24.placeAt(33, 15);
	var ps25 = new PlacedItemStack(1, 1); ps25.placeAt(37, 17);
	var ps26 = new PlacedItemStack(1, 1); ps26.placeAt(48, 21);
	var ps27 = new PlacedItemStack(1, 1); ps27.placeAt(38, 22);
	var ps28 = new PlacedItemStack(1, 1); ps28.placeAt(37, 23);
	var ps29 = new PlacedItemStack(1, 1); ps29.placeAt(37, 25);
	var ps30 = new PlacedItemStack(1, 1); ps30.placeAt(42, 25);
	var ps31 = new PlacedItemStack(1, 1); ps31.placeAt(46, 27);
	var ps32 = new PlacedItemStack(1, 1); ps32.placeAt(34, 29);
	var ps33 = new PlacedItemStack(1, 1); ps33.placeAt(43, 29);
	var ps34 = new PlacedItemStack(1, 1); ps34.placeAt(48, 31);
	var ps35 = new PlacedItemStack(1, 1); ps35.placeAt(33, 33);
	var ps36 = new PlacedItemStack(1, 1); ps36.placeAt(43, 34);
	var ps37 = new PlacedItemStack(1, 1); ps37.placeAt(40, 38);
	var ps38 = new PlacedItemStack(1, 1); ps38.placeAt(36, 39);
	var ps39 = new PlacedItemStack(1, 1); ps39.placeAt(42, 42);
	var ps40 = new PlacedItemStack(1, 1); ps40.placeAt(48, 43);
	var ps41 = new PlacedItemStack(1, 1); ps41.placeAt(39, 48);
	var ps42 = new PlacedItemStack(1, 1); ps42.placeAt(17, 33);
	var ps43 = new PlacedItemStack(1, 1); ps43.placeAt(26, 35);
	var ps44 = new PlacedItemStack(1, 1); ps44.placeAt(20, 36);
	var ps45 = new PlacedItemStack(1, 1); ps45.placeAt(31, 37);
	var ps46 = new PlacedItemStack(1, 1); ps46.placeAt(25, 39);
	var ps47 = new PlacedItemStack(1, 1); ps47.placeAt(19, 40);
	var ps48 = new PlacedItemStack(1, 1); ps48.placeAt(20, 43);
	var ps49 = new PlacedItemStack(1, 1); ps49.placeAt(25, 46);
	var ps50 = new PlacedItemStack(1, 1); ps50.placeAt(29, 46);
	var ps51 = new PlacedItemStack(1, 1); ps51.placeAt(17, 47);
	var ps52 = new PlacedItemStack(1, 1); ps52.placeAt(1, 33);
	var ps53 = new PlacedItemStack(1, 1); ps53.placeAt(15, 36);
	var ps54 = new PlacedItemStack(1, 1); ps54.placeAt(11, 38);
	var ps55 = new PlacedItemStack(1, 1); ps55.placeAt(9, 41);
	var ps56 = new PlacedItemStack(1, 1); ps56.placeAt(4, 43);
	var ps57 = new PlacedItemStack(1, 1); ps57.placeAt(5, 44);
	var ps58 = new PlacedItemStack(1, 1); ps58.placeAt(8, 47);
	var ps59 = new PlacedItemStack(1, 1); ps59.placeAt(9, 17);
	var ps60 = new PlacedItemStack(1, 1); ps60.placeAt(15, 17);
	var ps61 = new PlacedItemStack(1, 1); ps61.placeAt(1, 19);
	var ps62 = new PlacedItemStack(1, 1); ps62.placeAt(11, 20);
	var ps63 = new PlacedItemStack(1, 1); ps63.placeAt(6, 23);
	var ps64 = new PlacedItemStack(1, 1); ps64.placeAt(10, 23);
	var ps65 = new PlacedItemStack(1, 1); ps65.placeAt(3, 25);
	var ps66 = new PlacedItemStack(1, 1); ps66.placeAt(7, 27);
	var ps67 = new PlacedItemStack(1, 1); ps67.placeAt(13, 29);
	var ps68 = new PlacedItemStack(1, 1); ps68.placeAt(3, 31);
	var ps69 = new PlacedItemStack(1, 1); ps69.placeAt(11, 31);
	var ps70 = new PlacedItemStack(1, 1); ps70.placeAt(17, 17);
	var ps71 = new PlacedItemStack(1, 1); ps71.placeAt(31, 17);
	var ps72 = new PlacedItemStack(1, 1); ps72.placeAt(31, 31);
	var ps73 = new PlacedItemStack(1, 1); ps73.placeAt(17, 31);
    //objetos de mapa moviles
    /*var mpo1 = new MapPushObject(1); mpo1.placeAt(13, 17);*/
    
    /*
	for(var i = 3; i < 8; i++)
	{
		var ps = new PlacedItemStack(1, 1); ps.placeAt(i, 1);
	}
	for(var i = 3; i < 8; i++)
	{
		var ps = new PlacedItemStack(1, 1); ps.placeAt(3, i);
	}*/
};

function drawGame()
{
	if(ctx==null) { return; }
	if(!tilesetLoaded) { requestAnimationFrame(drawGame); return; }

	var currentFrameTime = Date.now();
	var timeElapsed = currentFrameTime - lastFrameTime;
	gameTime+= Math.floor(timeElapsed * gameSpeeds[currentSpeed].mult);

	var sec = Math.floor(Date.now()/1000);
	if(sec!=currentSecond)
	{
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
	}
	else { frameCount++; }

	if(!player.processMovement(gameTime) && gameSpeeds[currentSpeed].mult!=0)
	{
		if(keysDown[38] && player.canMoveUp())			{ player.moveUp(gameTime); }
		else if(keysDown[40] && player.canMoveDown())	{ player.moveDown(gameTime); }
		else if(keysDown[37] && player.canMoveLeft())	{ player.moveLeft(gameTime); }
		else if(keysDown[39] && player.canMoveRight())	{ player.moveRight(gameTime); }
		else if(keysDown[80]) { player.pickUp(); }
	}

	viewport.update(player.position[0] + (player.dimensions[0]/2),
		player.position[1] + (player.dimensions[1]/2));
	
	var playerRoof1 = mapTileData.map[toIndex(
		player.tileFrom[0], player.tileFrom[1])].roof;
	var playerRoof2 = mapTileData.map[toIndex(
		player.tileTo[0], player.tileTo[1])].roof;

	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);
	
	for(var z = 0; z < mapTileData.levels; z++)
	{

	for(var y = viewport.startTile[1]; y <= viewport.endTile[1]; ++y)
	{
		for(var x = viewport.startTile[0]; x <= viewport.endTile[0]; ++x)
		{
			if(z==0)
			{
				tileTypes[mapTileData.map[toIndex(x,y)].type].sprite.draw(
					gameTime,
					viewport.offset[0] + (x*tileW),
					viewport.offset[1] + (y*tileH));
			}
			else if(z==1)
			{
				var is = mapTileData.map[toIndex(x,y)].itemStack;
				if(is!=null)
				{
					itemTypes[is.type].sprite.draw(
						gameTime,
						viewport.offset[0] + (x*tileW) + itemTypes[is.type].offset[0],
						viewport.offset[1] + (y*tileH) + itemTypes[is.type].offset[1]);
				}
			}
			
			var o = mapTileData.map[toIndex(x,y)].object;
			if(o!=null && objectTypes[o.type].zIndex==z)
			{
				var ot = objectTypes[o.type];
				
				ot.sprite.draw(gameTime,
					viewport.offset[0] + (x*tileW) + ot.offset[0],
					viewport.offset[1] + (y*tileH) + ot.offset[1]);
			}
			
			if(z==2 &&
				mapTileData.map[toIndex(x,y)].roofType!=0 &&
				mapTileData.map[toIndex(x,y)].roof!=playerRoof1 &&
				mapTileData.map[toIndex(x,y)].roof!=playerRoof2)
			{
				tileTypes[mapTileData.map[toIndex(x,y)].roofType].sprite.draw(
					gameTime,
					viewport.offset[0] + (x*tileW),
					viewport.offset[1] + (y*tileH));
			}
		}
	}
	
		if(z==1)
		{
			player.sprites[player.direction].draw(
				gameTime,
				viewport.offset[0] + player.position[0],
				viewport.offset[1] + player.position[1]);
		}
	
	}
	
	ctx.textAlign = "right";
	
	for(var i = 0; i < player.inventory.spaces; i++)
	{
		ctx.fillStyle = "#ddccaa";
		ctx.fillRect(570 + (i * 50), 30,
			40, 40);
		
		if(typeof player.inventory.stacks[i]!='undefined')
		{
			var it = itemTypes[player.inventory.stacks[i].type];
			
			it.sprite.draw(gameTime,
				570 + (i * 50) + it.offset[0],
				30 + it.offset[1]);
			
			if(player.inventory.stacks[i].qty>1)
			{
				ctx.fillStyle = "#000000";
				ctx.fillText("" + player.inventory.stacks[i].qty,
					570 + (i*50) + 38,
					30 + 38);
			}
		}
	}
    
    var tileIndex= parseInt(player.tileFrom[1]) * mapW + parseInt(player.tileFrom[0])
    
	ctx.textAlign = "left";

	ctx.fillStyle = "#ff0000";
	ctx.fillText("FPS: " + framesLastSecond, 10, 20);
	ctx.fillText("Game speed: " + gameSpeeds[currentSpeed].name, 10, 40);
	ctx.fillText('X: '+ player.tileFrom[0] +' Y: '+ player.tileFrom[1] +' Indice: '+ tileIndex, 10, 60);
	ctx.fillText("Steps: " + pasoscount, 10, 80);

	lastFrameTime = currentFrameTime;
	requestAnimationFrame(drawGame);
}






function simulate(element, eventName)
{
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers)
    {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent)
    {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents')
        {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else
        {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else
    {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}