var readline = require('readline'),
	Ship = require('./objects/ship'),
	Grid = require('./objects/grid'),
	constants = require('./constants'),
	utils = require('./utils');
	
// Instantiate the read-line module
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var userPromt = '\nEnter the coordinates to fire at (e.g: A3)';

/**
 * Constructor
 */
function Game() { 
	this.playerGrid = new Grid(constants.FIELD_SIZE);
	this.computerGrid = new Grid(constants.FIELD_SIZE);

	this.initField(this.playerGrid);
	this.initField(this.computerGrid);
}

/**
 * Start the game
 */
Game.prototype.start = function() {
	var _this = this;
	
	_this.printLegend();

	// Listen for the player's input
	rl.on('line', function (line) {
		_this.playerTurn(line);
	});
};

/**
 * Print the game legend and instructions
 */
Game.prototype.printLegend = function() {
	console.log('Empty positions are marked with \' \'');
	console.log('Ships are numbered from from 1 and up');
	console.log('The places ships are hit are marked with the number of ship but it\'s NEGATIVE');
	console.log('Missed shots are marked with X');
	console.log('Rows are ranged from A to J and columns - from 0-9');
	
	console.log(userPromt);
};

/**
 * Initialize a field
 *
 * @param field - The field that needs initialization
 */
Game.prototype.initField = function(field) {
	// Place Destroyers
	for (var i = 0; i < constants.DESTROYER_COUNT; i++) {
		this.placeShip(Ship.initDestroyer(), field);
	}
	
	// Place Battleships
	for (var i = 0; i < constants.BATTLESHIP_COUNT; i++) {
		this.placeShip(Ship.initBattleship(), field);
	}
}

/**
 * Initialize a field
 *
 * @param field - The field that needs initialization
 */
Game.prototype.placeShip = function(newShip, field) {
	var _this = this;

	field.addShip(newShip, function(err) {
		if (err) {
			_this.retryPlaceShip(newShip, field);
		}
	});
};

/**
 * Retry to place a ship onto the field
 *
 * @param ship - The new ship
 * @param field - The field in which the ship should be placed
 */
Game.prototype.retryPlaceShip = function(ship, field) {
	var _this = this;
	ship.setRandomCoordinates();

	// Retry until successful
	field.addShip(ship, function(err) {
		if (err) {
			_this.retryPlaceShip(ship, field);
		}
	});
};

/**
 * The player makes a move
 *
 * @param place - The location where the player has chosen to shoot
 */
Game.prototype.playerTurn = function(place) {
	var _this = this;

	// Check for valid coordinates
	if (!place.match(/[a-jA-J][0-9]/)) {
		console.log("Incorrect coordinates");
		return;
	}

	// Parse coordinates
	var row = place.substring(0, 1).toUpperCase();	// Take the first (row) letter
	row = row.charCodeAt(0) - 'A'.charCodeAt(0);	// Parse row letter as number
	var column = place.substring(1, 2);				// Take the second (column) number
	
	_this.computerGrid.hit(row, column, function(err, msg, gameEnd) {
		// Wait for a valid move
		if (err) {
			console.log(err);
			return;
		}
		
		// Report status
		console.log(msg);
		
		// If the flags is true, then all ships have been sunk
		if (gameEnd) {
			process.exit();
		}
		
		// Let the computer take its turn - after it prompt the user to hit another spot
		_this.computerTurn(function() {
			// Print the user's field
			console.log(_this.playerGrid.field);
		
			// Prompt him to play
			console.log(userPromt);
		});
	});
} 

/**
 * The computer makes a move
 */
Game.prototype.computerTurn = function(callback) {
	var _this = this;
	
	// Choose a spot to fire upon
	var xToHit = utils.randomInt(0, constants.FIELD_SIZE-1);
	var yToHit = utils.randomInt(0, constants.FIELD_SIZE-1);
	
	// Take the shot
	this.playerGrid.hit(xToHit, yToHit, function(err, msg, gameEnd) {
		// Repeat try until a valid move was made
		if (err) {
			_this.computerTurn();
			return;
		}
		
		// Report status
		console.log('COMPUTER:', msg);
		
		// If the flags is true, then all ships have been sunk
		if (gameEnd) {
			process.exit();
		}
		
		callback();
	});
}

/**
 * Export the class
 */
module.exports = Game;