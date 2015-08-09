/**
 * Constructor
 */
 function Grid(size) {
	this.size = size;
	this.field = [];
	this.ships = [];
	this.totalShipLives = 0;
	
	for (var i = 0; i < size; i++) {
		var row = [];
		
		for (var j = 0; j < size; j++) {
			row.push(' ');
		}
		this.field.push(row);
	}
}

/**
 * Add a ship
 *
 * @param callback - Callback function
 */
Grid.prototype.addShip = function(ship, callback) {
	var _this = this;

	// Check if valid
	_this.isGridFree(ship.x, ship.y, ship.size, ship.isHorizontal, function(err) {
		if (err) {
			callback(err);
		} else {			
			_this.ships.push(ship);
			_this.totalShipLives += ship.size;
			_this.markOccupiedSpace(ship);
			
			callback(null);
		}
	});
};

/**
 * Mark where the ship is on the field
 *
 * @param ship - The that is being placed on the field
 */
Grid.prototype.markOccupiedSpace = function(ship) {
	var x = ship.x;
	var y = ship.y;
	
	for (var i = 0; i < ship.size; i++) {
		this.field[x][y] = this.ships.length;
			
		if (ship.isHorizontal) {
			y++;
		} else {
			x++;
		}
	}
};

/**
 * Check if the place where the ship wants to be placed is free.
 * This includes the ship's whole size.
 *
 * @param x - The X coordinate of the ship's head
 * @param y - The Y coordinate of the ship's head
 * @param shipSize - The size of the ship to be placed
 * @param isHorizontal - Should the check be horizontal or vertical
 * @param callback - Callback function
 */
Grid.prototype.isGridFree = function(x, y, shipSize, isHorizontal, callback) {
	// Check for out of bound
	if (x > this.size || y > this.size) {
		callback('Out of bound');
		return;
	}

	// Check for available space
	var dimension;
	if (isHorizontal) {
		dimension = y;
	} else {
		dimension = x;
	}
	
	// Check for out of bound
	if ((dimension + shipSize) > this.size) {
		callback('Out of bound');
		return;
	}
	
	// Check if the space is entirely free
	for (var i = 0; i < shipSize; i++) {
		if (this.field[x][y] != ' ') {
			callback('Space taken');
			return;
		}
		
		if (isHorizontal) {
			y++;
		} else {
			x++;
		}
	}	

	callback(null);
	return;
};

/**
 * Mark a hit
 *
 * @param x - The X coordinate of the shot
 * @param y - The Y coordinate of the shot
 * @param callback - Callback function
 */
Grid.prototype.hit = function(x, y, callback) {
	// Check if the spot was already hit
	if (this.field[x][y] < 0 || this.field[x][y] == 'X') {
		callback("SPOT WAS ALREADY HIT");
	}
	// Check for a ship on that spot
	else if (this.field[x][y] > 0) {
		var shipNumber = this.field[x][y];
		
		this.field[x][y] = shipNumber * -1;
		this.totalShipLives--;
		
		// Signal either that the ship was sunk or just hit
		if (this.totalShipLives <= 0) {
			callback(null, "ALL SHIPS DESTROYED", true);
		} else {
			this.ships[shipNumber-1].decreaseLives(function(err, msg) {
				callback(err, msg);
			});
		}
	}
	// The shot has missed
	else {
		this.field[x][y] = 'X';
		callback(null, "MISSED");
	}
}

/**
 * Export the class
 */
module.exports = Grid;