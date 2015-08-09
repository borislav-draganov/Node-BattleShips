var constants = require('../constants'),
	utils = require('../utils');

/**
 * Constructor
 */
function Ship() {
	this.size ;
	this.lives;
	this.name;
	this.isHorizontal;
	this.x;
	this.y;
}

/**
 * Initialize the ship with random coordinates
 */
Ship.prototype.setRandomCoordinates = function() {
	if (utils.randomBool()) {
		this.isHorizontal = true;
		this.x = utils.randomInt(0, constants.FIELD_SIZE - this.size);
		this.y = utils.randomInt(0, constants.FIELD_SIZE - 1);
	} else {
		this.isHorizontal = false;
		this.x = utils.randomInt(0, constants.FIELD_SIZE - 1);
		this.y = utils.randomInt(0, constants.FIELD_SIZE - this.size);
	}
}

/**
 * Decrease the ship's lives. If they reach 0, signal that the ship has been sunk
 */
Ship.prototype.decreaseLives = function(callback) {
	this.lives--;
	
	if (this.lives <= 0) {
		callback(null, 'SANK SHIP: ' + this.name);
	} else {
		callback(null, "HIT SHIP");
	}
}

/**
 * Return an instance of a Destroyer
 */
exports.initDestroyer = function() {
	var newShip = new Ship();

	newShip.size = constants.DESTROYER_SIZE;
	newShip.lives = constants.DESTROYER_SIZE;
	newShip.name = constants.DESTROYER_NAME;

	newShip.setRandomCoordinates();

	return newShip;
}
/**
 * Return an instance of a Battleship
 */
exports.initBattleship = function() {
	var newShip = new Ship();

	newShip.size = constants.BATTLESHIP_SIZE;
	newShip.lives = constants.BATTLESHIP_SIZE;
	newShip.name = constants.BATTLESHIP_NAME;

	newShip.setRandomCoordinates();

	return newShip;
}

/**
 * Export the class
 */
exports = Ship;