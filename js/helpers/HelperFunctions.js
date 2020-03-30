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
    keyDown: (event) => {
        switch(event.keyCode) {
            case 32: // space bar (shoot the laser)
                shootLaser();
                break;
            case 37: // left arrow (rotate ship left)
                ship.rotation = TURN_SPEED / 180 * Math.PI / FPS;
                break;
            case 38: // up arrow (thrust ship forward)
                ship.thrusting = true;
                break;
            case 39: // right arrow (rotate ship right)
                ship.rotation = -TURN_SPEED / 180 * Math.PI / FPS;
                break;
        }
    },
    keyUp: (event) => {
        switch(event.keyCode) {
            case 32: // space bar (shoot the laser)
                ship.canShoot = true;
                break;
            case 37: // left arrow (stop rotating ship left)
                ship.rotation = 0;
                break;
            case 38: // up arrow (stop thrusting ship forward)
                ship.thrusting = false;
                break;
            case 39: // right arrow (stop rotating ship right)
                ship.rotation = 0;
                break;
        }
    }
};

// Exports
export { CustomMath, KeyActions };