/**
 * Contains constants needed within different parts of games
 * @author seanmr
 */

class GameConstants {

    // Generics
    static GENERIC = {
        FPS : 30, // frames per second
        FRICTION : 0.7, // friction coefficient of space
        SHOW_BOUNDING : false, // show bounding boxes
        SHOW_CENTER_DOT : false // show center dot on ship
    }

    // Ship
    static SHIP = {
        SIZE : 30, // ship height in pixels
        TURN_SPEED : 360, // turn speed in degrees per second
        THRUST : 5, // acceleration of ship in pixels per second per second
        EXPLODE_DURATION : 0.3, // duration of the ships explosion in seconds
        INVISIBILITY_DURATION : 3, // duration of the ships invisibility in seconds
        BLINK_DURATION : 0.1, // duration of each blink in seconds
    };

    // Asteroid
    static ASTEROID = {
        NUMBER : 5, // number of asteroids
        SIZE : 100, // starting size of asteroids in pixels
        SPEED : 50, // max starting speed of asteroids in pixels per second
        VERTICES : 10, // average number of vertices on each asteroid
        JAGGEDNESS : 0.5 // 0 == none, 1 == lots
    };

    // Laser
    static LASER = {
        MAX_NUMBER : 10, // maximum number of lasers on screen
        SPEED : 500, // speed of lasers in pixels per second
        DISTANCE : 0.2 // max distance laser can travel as fraction of screen width
    };
}

export { GameConstants as CONSTANTS };