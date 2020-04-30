// Imports
import { KeyActions } from './helpers/HelperFunctions';
import { Asteroid } from './Asteroid';
import { CONSTANTS } from './constants/GameConstants';
import { Ship } from './Ship';

/**
 * Game class
 * @author seanmr
 */

class Game {

    constructor() {
        console.info( 'creating new game instance' );

        // Create a new ship
        this.ship = new Ship();

        // Attach keyboard event listeners
        this.createEventListeners();

        // Create the asteroid belt
        Asteroid.createAsteroidBelt();
    }

    // Add keyboard event listeners
    createEventListeners() {
        console.info( 'creating event listeners' );
        
        document.addEventListener("keydown", (event) => {KeyActions.keyDown(event, this)});
        document.addEventListener("keyup", (event) => {KeyActions.keyUp(event, this)});
    }

    // Start the game
    startGame() {
        // bind update() function to Game class scope, otherwise will be Window
        setInterval( this.update.bind(this), 1000 / CONSTANTS.GENERIC.FPS );
    }

    // Game loop
    update() {
        // console.info( 'updating' );

        // Check if ship is blinking or exploding
        let blinkOn = this.ship.blinkNumber % 2 == 0;
        let exploding = this.ship.explodeTime > 0;

        // Draw space
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Thrust the ship
        // if(this.ship.thrusting) {
        //     console.log('thrusting');

        //     this.ship.thrust.x += CONSTANTS.SHIP.THRUST * Math.cos(this.ship.angle) / CONSTANTS.GENERIC.FPS;
        //     this.ship.thrust.y -= CONSTANTS.SHIP.THRUST * Math.sin(this.ship.angle) / CONSTANTS.GENERIC.FPS;

        //     // Draw the thruster
        //     if(!exploding && blinkOn) {
        //         console.log( 'drawing the thrusting' );

        //         context.strokeStyle = "yellow";
        //         context.fillStyle = "red";
        //         context.lineWidth = CONSTANTS.SHIP.SIZE / 10;
        //         context.beginPath();
        //         context.moveTo( // rear left
        //             this.ship.x - this.ship.radius * (2/3 * Math.cos(this.ship.angle) + 0.5 * Math.sin(this.ship.angle)),
        //             this.ship.y + this.ship.radius * (2/3 * Math.sin(this.ship.angle) - 0.5 * Math.cos(this.ship.angle))
        //         );
        //         context.lineTo( // rear center behind the ship
        //             this.ship.x - this.ship.radius * 8/3 * Math.cos(this.ship.angle),
        //             this.ship.y + this.ship.radius * 8/3 * Math.sin(this.ship.angle)
        //         );
        //         context.lineTo( // rear right
        //             this.ship.x - this.ship.radius * (2/3 * Math.cos(this.ship.angle) - 0.5 * Math.sin(this.ship.angle)),
        //             this.ship.y + this.ship.radius * (2/3 * Math.sin(this.ship.angle) + 0.5 * Math.cos(this.ship.angle))
        //         );
        //         context.closePath();
        //         context.fill();
        //         context.stroke();
        //     }
        // } else {
        //     this.ship.thrust.x -= CONSTANTS.GENERIC.FRICTION * this.ship.thrust.x / CONSTANTS.GENERIC.FPS;
        //     this.ship.thrust.y -= CONSTANTS.GENERIC.FRICTION * this.ship.thrust.y / CONSTANTS.GENERIC.FPS;
        // }
        
        // Draw the ship
        if(!exploding) {
            console.log( 'drawing the ship' );

            if(blinkOn) {
                console.log( 'blinking is on' );

                context.strokeStyle = "white";
                context.lineWidth = CONSTANTS.SHIP.SIZE / 20;
                context.beginPath();
                context.moveTo( // nose of the ship
                    this.ship.x + 4/3 * this.ship.radius * Math.cos(this.ship.angle),
                    this.ship.y - 4/3 * this.ship.radius * Math.sin(this.ship.angle)
                );
                context.lineTo( // rear left of the ship
                    this.ship.x - this.ship.radius * (2/3 * Math.cos(this.ship.angle) + Math.sin(this.ship.angle)),
                    this.ship.y + this.ship.radius * (2/3 * Math.sin(this.ship.angle) - Math.cos(this.ship.angle))
                );
                context.lineTo( // rear right of the ship
                    this.ship.x - this.ship.radius * (2/3 * Math.cos(this.ship.angle) - Math.sin(this.ship.angle)),
                    this.ship.y + this.ship.radius * (2/3 * Math.sin(this.ship.angle) + Math.cos(this.ship.angle))
                );
                context.closePath();
                context.stroke();
            }
            // handle blinking
            if(this.ship.blinkNumber > 0) {
                // reduce the blink time
                this.ship.blinkTime--;

                // reduce the blink number
                if(this.ship.blinkTime == 0) {
                    this.ship.blinkTime = Math.ceil(CONSTANTS.SHIP.BLINK_DURATION * CONSTANTS.GENERIC.FPS);
                    this.ship.blinkNumber--;
                }
            }
        } else {
            // draw the explosion
            context.fillStyle = "darkred";
            context.beginPath();
            context.arc(this.ship.x, this.ship.y, this.ship.radius * 1.7, 0, Math.PI * 2, false);
            context.fill();

            context.fillStyle = "red";
            context.beginPath();
            context.arc(this.ship.x, this.ship.y, this.ship.radius * 1.4, 0, Math.PI * 2, false);
            context.fill();

            context.fillStyle = "orange";
            context.beginPath();
            context.arc(this.ship.x, this.ship.y, this.ship.radius * 1.1, 0, Math.PI * 2, false);
            context.fill();

            context.fillStyle = "yellow";
            context.beginPath();
            context.arc(this.ship.x, this.ship.y, this.ship.radius * 0.8, 0, Math.PI * 2, false);
            context.fill();
            
            context.fillStyle = "white";
            context.beginPath();
            context.arc(this.ship.x, this.ship.y, this.ship.radius * 0.5, 0, Math.PI * 2, false);
            context.fill();
        }

        if(CONSTANTS.GENERIC.SHOW_BOUNDING) {
            context.strokeStyle = "lime";
            context.beginPath();
            context.arc(this.ship.x, this.ship.y, this.ship.radius, 0, Math.PI * 2, false);
            context.stroke();
        }

    //     // Draw the asteroids
    //     var x, y, radius, angle, vertices, offsets;
    //     for(let i = 0; i < roids.length; ++i) {
    //         context.strokeStyle = "slategrey";
    //          context.lineWidth = SHIP_SIZE / 20;
            
    //         // Get the asteroid properties
    //         x = roids[i].x;
    //         y = roids[i].y;
    //         radius = roids[i].radius;
    //         angle = roids[i].angle;
    //         vertices = roids[i].vertices;
    //         offsets = roids[i].offsets;

    //         // draw a path
    //         context.beginPath();
    //         context.moveTo(
    //             x + radius * offsets[0] * Math.cos(angle),
    //             y + radius * offsets[0] * Math.sin(angle)
    //         );

    //         // draw the polygon
    //         for(let j = 1; j < vertices; ++j) {
    //             context.lineTo(
    //                 x + radius * offsets[j] * Math.cos(angle + j * Math.PI * 2 / vertices),
    //                 y + radius * offsets[j] * Math.sin(angle + j * Math.PI * 2 / vertices)
    //             )
    //         }
    //         context.closePath();
    //         context.stroke();

    //         if(SHOW_BOUNDING) {
    //             context.strokeStyle = "lime";
    //             context.beginPath();
    //             context.arc(x, y, radius, 0, Math.PI * 2, false);
    //             context.stroke();
    //         }
    //     }

    //     // Check for asteroid collisions
    //     if(!exploding) {
    //         if(ship.blinkNumber == 0) {
    //             for(let i = 0; i < roids.length; ++i) {
    //                 if(distanceBetweenPoints(ship.x, ship.y, roids[i].x, roids[i].y) < ship.r + roids[i].radius) {
    //                     explodeShip();
    //                 }
    //             }
    //         }
    //         // move the ship
    //         ship.x += ship.thrust.x;
    //         ship.y += ship.thrust.y; 

    //         // rotate the ship
    //         ship.a += ship.rotation;
    //     } else {
    //         ship.explodeTime--;

    //         if(ship.explodeTime == 0)
    //             ship = newShip();
    //     }

    //     // handle edge of screen
    //     if(ship.x < 0 - ship.r) {
    //         ship.x = canvas.width + ship.rotation;
    //     } else if(ship.x > canvas.width + ship.r) {
    //         ship.x = 0 - ship.rotation;
    //     }

    //     if(ship.y < 0 - ship.r) {
    //         ship.y = canvas.height + ship.rotation;
    //     } else if(ship.y > canvas.height + ship.r) {
    //         ship.y = 0 - ship.rotation;
    //     }

    //     // move the lasers
    //     for(let i = ship.lasers.length - 1; i >= 0; --i) {
    //         // check distance traveled
    //         if(ship.lasers[i].distanceTraveled > LASER_DISTANCE * canvas.width) {
    //             ship.lasers.splice(i, 1);
    //             continue;
    //         }
            
    //         // move the laser
    //         ship.lasers[i].x += ship.lasers[i].xv;
    //         ship.lasers[i].y += ship.lasers[i].yv;

    //         // calculate the distance traveled
    //         ship.lasers[i].distanceTraveled += Math.sqrt(Math.pow(ship.lasers[i].xv, 2) + Math.pow(ship.lasers[i].yv, 2));

    //         // handle edge of screen
    //         if(ship.lasers[i].x < 0) {
    //             ship.lasers[i].x = canvas.width;
    //         } else if(ship.lasers[i].x > canvas.width) {
    //             ship.lasers[i].x = 0;
    //         }

    //         if(ship.lasers[i].y < 0) {
    //             ship.lasers[i].y = canvas.height;
    //         } else if(ship.lasers[i].y > canvas.height) {
    //             ship.lasers[i].y = 0;
    //         }
    //     }

    //     // move the asteroids
    //     for(let i = 0; i < roids.length; ++i) {
    //         roids[i].x += roids[i].xv;
    //         roids[i].y += roids[i].yv;

    //         // handle screen edge
    //         if(roids[i].x < 0 - roids[i].radius) {
    //             roids[i].x = canvas.width + roids[i].radius;
    //         } else if(roids[i].x > canvas.width + roids[i].radius) {
    //             roids[i].x = 0 - roids[i].radius;
    //         }

    //         if(roids[i].y < 0 - roids[i].radius) {
    //             roids[i].y = canvas.height + roids[i].radius;
    //         } else if(roids[i].y > canvas.height + roids[i].radius) {
    //             roids[i].y = 0 - roids[i].radius;
    //         }
    //     }

    //     if(SHOW_CENTER_DOT) {
    //         // center dot
    //         context.fillStyle = "red";
    //         context.fillRect(ship.x - 1, ship.y - 1, 2, 2);
    //     }

    //     // Draw the lasers
    //     for(let i = 0; i < ship.lasers.length; ++i) {
    //         context.fillStyle = "salmon";
    //         context.beginPath();
    //         context.arc(ship.lasers[i].x, ship.lasers[i].y, SHIP_SIZE / 15, 0, Math.PI * 2, false);
    //         context.fill();
    //     }

    //     // detect asteroid hits on lasers
    //     var ax, ay, ar, lx, ly;
    //     for(let i = roids.length - 1; i >= 0; --i) {

    //         // get the asteroid properties
    //         ax = roids[i].x;
    //         ay = roids[i].y;
    //         ar = roids[i].radius;

    //         // loop over the lasers
    //         for(let j = ship.lasers.length - 1; j >= 0; --j) {

    //             // get the laser properties
    //             lx = ship.lasers[j].x;
    //             ly = ship.lasers[j].y;

    //             // detect hits
    //             if(distanceBetweenPoints(ax, ay, lx, ly) < ar) {
    //                 // remove the laser
    //                 ship.lasers.splice(j, 1);
                    
    //                 //remove the asteroid
    //                 destroyAsteroid(i);
    //                 // roids.splice(i, 1);

    //                 break;
    //             }
    //         }
    //     }
    }
}

// Exports
export { Game }; 