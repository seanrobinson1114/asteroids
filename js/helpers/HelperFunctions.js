// Imports
import { CONSTANTS } from '../constants/GameConstants';

/**
 * Helper functions
 * @author seanmr
 */

// Math related functions
const CustomMath = {
    
    // Calculate the distance between two points
    calcDistanceBetweenPoints: (x1, y1, x2, y2) => {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1), 2);
    }
};

// Key action related functions
const KeyActions = {

    // KeyDown Actions
    keyDown: (event, scope) => {
        switch(event.keyCode) {
            case 32: // space bar (shoot the laser)
                scope.ship.shootLaser();
                break;
            case 37: // left arrow (rotate ship left)
                scope.ship.rotation = CONSTANTS.SHIP.TURN_SPEED / 180 * Math.PI / CONSTANTS.GENERIC.FPS;
                break;
            case 38: // up arrow (thrust ship forward)
                scope.ship.thrusting = true;
                break;
            case 39: // right arrow (rotate ship right)
                scope.ship.rotation = -CONSTANTS.SHIP.TURN_SPEED / 180 * Math.PI / CONSTANTS.GENERIC.FPS;
                break;
        }
    },
    keyUp: (event, scope) => {
        switch(event.keyCode) {
            case 32: // space bar (shoot the laser)
                scope.ship.canShoot = true;
                break;
            case 37: // left arrow (stop rotating ship left)
                scope.ship.rotation = 0;
                break;
            case 38: // up arrow (stop thrusting ship forward)
                scope.ship.thrusting = false;
                break;
            case 39: // right arrow (stop rotating ship right)
                scope.ship.rotation = 0;
                break;
        }
    }
};

// Exports
export { CustomMath, KeyActions };