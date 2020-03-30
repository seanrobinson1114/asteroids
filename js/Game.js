// Imports
import { KeyActions } from './helpers/HelperFunctions';
import { Asteroid } from './Asteroid';

/**
 * Game class
 * @author seanmr
 */

class Game {

    constructor() {
        // Attach keyboard event listeners
        this.createEventListeners();

        // Create the asteroid belt
        Asteroid.createAsteroidBelt();
    }

    // Add keyboard event listeners
    createEventListeners() {
        document.addEventListener("keyDown", KeyActions.KeyDown);
        document.addEventListener("keyUp", KeyActions.KeyUp);
    }

    // Start the game
    startGame() {
        setInterval( update, 1000 / FPS );
    }

    update() {
        let blinkOn = ship.blinkNumber % 2 == 0;
        let exploding = ship.explodeTime > 0;

        // Draw space
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Thrust the ship
        if(ship.thrusting) {
            ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
            ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;

            // Draw the thruster
            if(!exploding && blinkOn) {
                context.strokeStyle = "yellow";
                context.fillStyle = "red";
                context.lineWidth = SHIP_SIZE / 10;
                context.beginPath();
                context.moveTo( // rear left
                    ship.x - ship.r * (2/3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
                    ship.y + ship.r * (2/3 * Math.sin(ship.a) - 0.5 * Math.cos(ship.a))
                );
                context.lineTo( // rear center behind the ship
                    ship.x - ship.r * 8/3 * Math.cos(ship.a),
                    ship.y + ship.r * 8/3 * Math.sin(ship.a)
                );
                context.lineTo( // rear right
                    ship.x - ship.r * (2/3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
                    ship.y + ship.r * (2/3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
                );
                context.closePath();
                context.fill();
                context.stroke();
            }
        } else {
            ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
            ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
        }
        
        // Draw triangular ship
        if(!exploding) {
            if(blinkOn) {
                context.strokeStyle = "white";
                context.lineWidth = SHIP_SIZE / 20;
                context.beginPath();
                context.moveTo( // nose of the ship
                    ship.x + 4/3 * ship.r * Math.cos(ship.a),
                    ship.y - 4/3 * ship.r * Math.sin(ship.a)
                );
                context.lineTo( // rear left of the ship
                    ship.x - ship.r * (2/3 * Math.cos(ship.a) + Math.sin(ship.a)),
                    ship.y + ship.r * (2/3 * Math.sin(ship.a) - Math.cos(ship.a))
                );
                context.lineTo( // rear right of the ship
                    ship.x - ship.r * (2/3 * Math.cos(ship.a) - Math.sin(ship.a)),
                    ship.y + ship.r * (2/3 * Math.sin(ship.a) + Math.cos(ship.a))
                );
                context.closePath();
                context.stroke();
            }
            // handle blinking
            if(ship.blinkNumber > 0) {
                // reduce the blink time
                ship.blinkTime--;

                // reduce the blink number
                if(ship.blinkTime == 0) {
                    ship.blinkTime = Math.ceil(SHIP_BLINK_DURATION * FPS);
                    ship.blinkNumber--;
                }
            }
        } else {
            // draw the explosion
            context.fillStyle = "darkred";
            context.beginPath();
            context.arc(ship.x, ship.y, ship.r * 1.7, 0, Math.PI * 2, false);
            context.fill();

            context.fillStyle = "red";
            context.beginPath();
            context.arc(ship.x, ship.y, ship.r * 1.4, 0, Math.PI * 2, false);
            context.fill();

            context.fillStyle = "orange";
            context.beginPath();
            context.arc(ship.x, ship.y, ship.r * 1.1, 0, Math.PI * 2, false);
            context.fill();

            context.fillStyle = "yellow";
            context.beginPath();
            context.arc(ship.x, ship.y, ship.r * 0.8, 0, Math.PI * 2, false);
            context.fill();
            
            context.fillStyle = "white";
            context.beginPath();
            context.arc(ship.x, ship.y, ship.r * 0.5, 0, Math.PI * 2, false);
            context.fill();
        }

        if(SHOW_BOUNDING) {
            context.strokeStyle = "lime";
            context.beginPath();
            context.arc(ship.x, ship.y, ship.r, 0, Math.PI * 2, false);
            context.stroke();
        }

        // Draw the asteroids
        var x, y, radius, angle, vertices, offsets;
        for(let i = 0; i < roids.length; ++i) {
            context.strokeStyle = "slategrey";
             context.lineWidth = SHIP_SIZE / 20;
            
            // Get the asteroid properties
            x = roids[i].x;
            y = roids[i].y;
            radius = roids[i].radius;
            angle = roids[i].angle;
            vertices = roids[i].vertices;
            offsets = roids[i].offsets;

            // draw a path
            context.beginPath();
            context.moveTo(
                x + radius * offsets[0] * Math.cos(angle),
                y + radius * offsets[0] * Math.sin(angle)
            );

            // draw the polygon
            for(let j = 1; j < vertices; ++j) {
                context.lineTo(
                    x + radius * offsets[j] * Math.cos(angle + j * Math.PI * 2 / vertices),
                    y + radius * offsets[j] * Math.sin(angle + j * Math.PI * 2 / vertices)
                )
            }
            context.closePath();
            context.stroke();

            if(SHOW_BOUNDING) {
                context.strokeStyle = "lime";
                context.beginPath();
                context.arc(x, y, radius, 0, Math.PI * 2, false);
                context.stroke();
            }
        }

        // Check for asteroid collisions
        if(!exploding) {
            if(ship.blinkNumber == 0) {
                for(let i = 0; i < roids.length; ++i) {
                    if(distanceBetweenPoints(ship.x, ship.y, roids[i].x, roids[i].y) < ship.r + roids[i].radius) {
                        explodeShip();
                    }
                }
            }
            // move the ship
            ship.x += ship.thrust.x;
            ship.y += ship.thrust.y; 

            // rotate the ship
            ship.a += ship.rotation;
        } else {
            ship.explodeTime--;

            if(ship.explodeTime == 0)
                ship = newShip();
        }

        // handle edge of screen
        if(ship.x < 0 - ship.r) {
            ship.x = canvas.width + ship.rotation;
        } else if(ship.x > canvas.width + ship.r) {
            ship.x = 0 - ship.rotation;
        }

        if(ship.y < 0 - ship.r) {
            ship.y = canvas.height + ship.rotation;
        } else if(ship.y > canvas.height + ship.r) {
            ship.y = 0 - ship.rotation;
        }

        // move the lasers
        for(let i = ship.lasers.length - 1; i >= 0; --i) {
            // check distance traveled
            if(ship.lasers[i].distanceTraveled > LASER_DISTANCE * canvas.width) {
                ship.lasers.splice(i, 1);
                continue;
            }
            
            // move the laser
            ship.lasers[i].x += ship.lasers[i].xv;
            ship.lasers[i].y += ship.lasers[i].yv;

            // calculate the distance traveled
            ship.lasers[i].distanceTraveled += Math.sqrt(Math.pow(ship.lasers[i].xv, 2) + Math.pow(ship.lasers[i].yv, 2));

            // handle edge of screen
            if(ship.lasers[i].x < 0) {
                ship.lasers[i].x = canvas.width;
            } else if(ship.lasers[i].x > canvas.width) {
                ship.lasers[i].x = 0;
            }

            if(ship.lasers[i].y < 0) {
                ship.lasers[i].y = canvas.height;
            } else if(ship.lasers[i].y > canvas.height) {
                ship.lasers[i].y = 0;
            }
        }

        // move the asteroids
        for(let i = 0; i < roids.length; ++i) {
            roids[i].x += roids[i].xv;
            roids[i].y += roids[i].yv;

            // handle screen edge
            if(roids[i].x < 0 - roids[i].radius) {
                roids[i].x = canvas.width + roids[i].radius;
            } else if(roids[i].x > canvas.width + roids[i].radius) {
                roids[i].x = 0 - roids[i].radius;
            }

            if(roids[i].y < 0 - roids[i].radius) {
                roids[i].y = canvas.height + roids[i].radius;
            } else if(roids[i].y > canvas.height + roids[i].radius) {
                roids[i].y = 0 - roids[i].radius;
            }
        }

        if(SHOW_CENTER_DOT) {
            // center dot
            context.fillStyle = "red";
            context.fillRect(ship.x - 1, ship.y - 1, 2, 2);
        }

        // Draw the lasers
        for(let i = 0; i < ship.lasers.length; ++i) {
            context.fillStyle = "salmon";
            context.beginPath();
            context.arc(ship.lasers[i].x, ship.lasers[i].y, SHIP_SIZE / 15, 0, Math.PI * 2, false);
            context.fill();
        }

        // detect asteroid hits on lasers
        var ax, ay, ar, lx, ly;
        for(let i = roids.length - 1; i >= 0; --i) {

            // get the asteroid properties
            ax = roids[i].x;
            ay = roids[i].y;
            ar = roids[i].radius;

            // loop over the lasers
            for(let j = ship.lasers.length - 1; j >= 0; --j) {

                // get the laser properties
                lx = ship.lasers[j].x;
                ly = ship.lasers[j].y;

                // detect hits
                if(distanceBetweenPoints(ax, ay, lx, ly) < ar) {
                    // remove the laser
                    ship.lasers.splice(j, 1);
                    
                    //remove the asteroid
                    destroyAsteroid(i);
                    // roids.splice(i, 1);

                    break;
                }
            }
        }

    }
}

// Exports
export { Game }; 