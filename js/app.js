// create enemey with logo, location and speed
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = Math.floor((Math.random() * 3) + 1) * 73;
    this.speed = Math.floor((Math.random() * 100) + 1);
};

// moves enemy according to speed and dx
// firsts checks to see if player is within enemy box -> if so reset game
// if enemy falls of screen, reset it
Enemy.prototype.update = function(dt) {
    var collision_square = 0;
    if (this.x < 101){
        collision_square = 0;
    } else if (this.x < 202){
        collision_square = 101;
    } else if (this.x < 303){
        collision_square = 202;
    } else if (this.x < 404){
        collision_square = 303;
    } else if (this.x < 505){
        collision_square = 404;
    }
    if (this.x > 505) {
        this.x = 0;
        this.y = Math.floor((Math.random() * 3) + 1) * 73;
        this.speed = Math.floor((Math.random() * 100) + 1);
    } else if ((collision_square < player.x) && (player.x < (collision_square + 102)) && (player.y === this.y)) {
        player.x = 202;
        player.y = 73 * 5;
    }else {
       this.x = this.x + this.speed * dt;
    }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//sets inital player charater logo and location
var Player = function(){
    this.player = 'images/char-boy.png';
    this.x = 202;
    this.y = 73 * 5;
};
//resets game if player wins
Player.prototype.update = function() {
    if(this.y === 0){
        this.x = 202;
        this.y = 73 * 5;
    }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};
//takes in keyboard press and moves player one square but not outside of game area
Player.prototype.handleInput = function(input) {
    if (input === 'left' && this.x > 100){
        this.x = this.x - 101;
    } else if (input === 'right' && this.x < 403){
        this.x = this.x + 101;
    } else if (input === 'down' && this.y < 73*5){
        this.y = this.y + 73;
    } else if (input === 'up' && this.y > 0){
        this.y = this.y - 73;
    }
};
// created array of enemy objects and player object
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();


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


