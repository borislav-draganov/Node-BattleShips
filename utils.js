/**
 * Generate a random integer in range
 *
 * @param low - The low boundary
 * @param high - The high boundary
 */
exports.randomInt = function(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

/**
 * Generate a random boolean
 */
exports.randomBool = function() {
    return Math.random() >= 0.5;
}