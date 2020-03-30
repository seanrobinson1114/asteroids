// Imports
import { CONSTANTS } from 'constants/GameConstants';

/**
 * Ship
 * @author seanmr
 */

class Ship {
    
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.radius = SHIP_SIZE / 2;
        this.angle = 90 / 180 * Math.PI, // convert angle to radians
        this.explodeTime = 0,
        this.blinkNumber = Math.ceil(CONSTANTS.SHIP.INVISIBILITY_DURATION / CONSTANTS.SHIP.BLINK_DURATION),
        this.blinkTime = Math.ceil(CONSTANTS.SHIP.BLINK_DURATION * CONSTANTS.GENERIC.FPS),
        this.rotation = 0,
        this.thrusting = false,
        this.thrust = {
            x: 0,
            y: 0
        },
        this.canShoot = true,
        this.lasers = []
    }

    // Get the x coordinate of the ship
    get x() {
        return this.x;
    }

    // Get the y coordinate of the ship
    get y() {
        return this.y;
    }

    // Explode the ship
    explodeShip() {
        // context.strokeStyle = "lime";
        // context.fillStyle = "lime";
        // context.beginPath();
        // context.arc(ship.x, ship.y, ship.r, 0, Math.PI * 2, false);
        // context.fill();
        // context.stroke();
        this.explodeTime = Math.ceil(CONSTANTS.SHIP.EXPLODE_DURATION * CONSTANTS.GENERIC.FPS);
    }

    // Shoot the laser
    shootLaser() {
        if(this.canShoot && this.lasers.length < CONSTANTS.LASER.MAX_NUMBER) {
            // create laser object
            this.lasers.push({ // from the nose of the ship
                x: this.x + 4/3 * this.radius * Math.cos(this.angle),
                y: this.y - 4/3 * this.radius * Math.sin(this.angle),
                xVelocity: CONSTANTS.LASER.SPEED * Math.cos(this.angle) / CONSTANTS.GENERIC.FPS,
                yVelocity: -CONSTANTS.LASER.SPEED * Math.sin(this.angle) / CONSTANTS.GENERIC.FPS,
                distanceTraveled: 0
            });
        }

        // prevent future shooting
        this.canShoot = false;
    }
}


// Exports
export { Ship };