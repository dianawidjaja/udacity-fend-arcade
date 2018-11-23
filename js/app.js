/**
 * Create the Enemy class.
 * Enemies move horizontally across the screen.
 * Colliding with an enemy reset the game.
 */
const Enemy = function(start_x, start_y) {
    // Variables for each Enemy instance

    // The image/sprite for our enemies, this uses
    this.sprite = 'images/enemy-bug.png';
    this.max_x = 500;
    this.max_y = 500;
    this.x = start_x;
    this.y = start_y;
    this.speed = 200;
};

/**
 * Update the enemy's position.
 * @param {number} dt - a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    // Multiply movement by the dt to ensure
    // the game runs at the same speed for all computers.
    this.x += this.speed * dt;

    // Loop enemies' horizontal movement
    if (this.x > 500) {
        this.x = 0;
    }
};

/**
 * Draw enemies on the screen.
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Create the Player class.
 * Players move vertically and horizontally on the screen.
 * Colliding with an enemy resets the game.
 * To win the game,
 * a player must reach the water area at the top of the screen.
 */
const Player = function() {
    this.sprite = 'images/char-boy.png';
    this.max_x = 400;
    this.max_y = 400;
    this.x = 200;
    this.y = 385;
    this.min_x = 0;
    this.min_y = 0;
}

/**
 * Update the player's position.
 * Handles keyboard input within the boundaries of the game area.
 * @param {number} dt - a time delta between ticks
 */
Player.prototype.update = function(dt) {
    if (this.x < this.min_x) {
        this.handleInput('right');
    }
    if (this.x > this.max_x) {
        this.handleInput('left');
    }
    if (this.y > this.max_y) {
        this.handleInput('up');
        console.log("y: "+ this.y, "max_y: " + this.max_y);
    }
    // Handle win
    if (this.y < this.min_y) {
        console.log("y: "+ this.y, "min_y: " + this.min_y);
        this.reset();
    }

    // Reset player to initial position
    if (this.y > 500) {
        this.y = 0;
    }
}

/**
 * Renders the player on screen.
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Map arrow keys to movements on screen.
 * @param {string} key 
 */
Player.prototype.handleInput = function(key) {
    var directions = {
        left: function() {
            this.x -= 100;
        }.bind(this),
        right: function() {
            this.x += 100;
        }.bind(this),
        up: function() {
            this.y -= 80;
        }.bind(this),
        down: function() {
            this.y += 80;
        }.bind(this)
    };
    return directions[key] && directions[key]();
}

/**
 * Determine whether an enemy has collided with the player.
 * If an enemy has close x and y coordinates as
 * the player, the player loses and the game resets.
 */
function checkCollisions() {
    allEnemies.forEach(function(enemy) {
    if(isXColliding() && isYColliding()){
        player.reset();
    }
    function isXColliding() {
        const compareX = player.x >= (enemy.x - 20);
        const approachX = (player.x) <= (enemy.x + 20);
        return compareX && approachX;
    }
    function isYColliding() {
        const compareY = player.y >= (enemy.y - 20);
        const approachY = (player.y) <= (enemy.y + 20);
        return compareY && approachY;
    }
    })

}
    

/**
 * Reset the game when a player wins or loses.
 * The player starts again at the bottom of the screen.
 */
Player.prototype.reset = function() {
    //this.x = this.start_x;
    //this.y = this.start_y;
    this.x = 200;
    this.y = 385;
    console.log("reset");
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy(-50, 150);
const enemy2 = new Enemy(-200, 60);
const allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);

const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function setSpeed(selectEl) {
    for (const enemy of allEnemies) {
        player.reset();
        enemy.speed = selectEl.value;
        
    }
}
