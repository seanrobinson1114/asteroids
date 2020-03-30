// Imports
import { CONSTANTS } from './constants/GameConstants';
import { CustomMath } from './helpers/HelperFunctions';


/**
 * Asteroid
 * @author seanmr
 */

class Asteroid {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xVelocity = Math.random() * CONSTANTS.ASTEROID.SPEED / CONSTANTS.GENERIC.FPS * (Math.random() < 0.5 ? 1 : -1);
        this.yVelocity = Math.random() * CONSTANTS.ASTEROID.SPEED / CONSTANTS.GENERIC.FPS * (Math.random() < 0.5 ? 1 : -1);
        this.radius = CONSTANTS.ASTEROID.SIZE / 2;
        this.angle = Math.random() * Math.PI * 2; // in radians
        this.vertices = Math.floor(Math.random() * (CONSTANTS.ASTEROID.VERTICES + 1) + CONSTANTS.ASTEROID.VERTICES / 2);
        this.offsets = [CONSTANTS.ASTEROID.VERTICES].map(() => {Math.random() * CONSTANTS.ASTEROID.JAGGEDNESS * 2 + 1 - CONSTANTS.ASTEROID.JAGGEDNESS});
    }

    static asteroidBelt = [];

    // Create all asteroids
    static createAsteroidBelt = (shipX, shipY) => {
        let x, y;

        for(let i = 0; i < CONSTANTS.ASTEROID.NUMBER; ++i) {
            do {
                x = Math.floor(Math.random() * canvas.width);
                y = Math.floor(Math.random() * canvas.height);
            } while(CustomMath.calcDistanceBetweenPoints(shipX, shipY, x, y))
            
            Asteroid.asteroidBelt.push(new Asteroid(x, y));
        }
    }
}

// Exports
export { Asteroid };