var hi_Score = 0;
var score = 0;
var hi_speed = 200;
var lo_speed = 100;
var block_height = 83;
var block_width = 101;
// passing coordinates to enemy function 
var Enemy = function(x, y) {
   // Variables applied to each of our instances go here,
   // we've provided one for you to get started

   // The image/sprite for our enemies, this uses
   // a helper we've provided to easily load images
   this.x = x;
   this.y = y;
   this.speed = this.fetch_speed(hi_speed, lo_speed);
   this.sprite = "images/Gem-Green.png";
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
   this.x += this.speed * dt;
   if (this.x > 500) {
      this.x = 0;
      this.speed = this.fetch_speed();

   } // You should multiply any movement by the dt parameter
   // which will ensure the game runs at the same speed for
   // all computers.

};


Enemy.prototype.fetch_speed = function() {
   return Math.floor(Math.random() * (hi_speed - lo_speed + 1) + lo_speed);
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var Player = function(x, y) {
   this.x = x;
   this.y = y;
   this.sprite = 'images/superman.png';
};
Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.reset = function() {

   this.x = 200;
   this.y = 400;
};
//this is a helper function,.which is used in both the Player and Enemy class
 Player.prototype.wait = function (ms){
   var start = new Date().getTime();
   var end = start;
   while (end < start + ms) {
      end = new Date().getTime();
   }
}
Player.prototype.update = function() {
   if (this.y < 0) {
      this.wait(300);
      this.reset();
      score = score + 1;
      document.getElementById("score").innerHTML = score;
      hi_speed += 50;
      lo_speed += 50;
   }
   for (var i = 0; i < allEnemies.length; i++) {

      //collision condition ...i was really stuck here.. so i got it explained, through someone
      if ((this.x < allEnemies[i].x + 50) && (this.x + 50 > allEnemies[i].x) && (this.y < allEnemies[i].y + 50) && (this.y + 50 > allEnemies[i].y)) {
         //till here
         this.wait(500);
         this.reset();
         console.log(this.x, this.y);
         score = 0;
         hi_speed = 200;
         document.getElementById("score").innerHTML = score;
      } else
      if (hi_Score < score) {
         hi_Score = score;
       document.getElementById("hi-score").innerHTML = hi_Score;
      }
   }
};
Player.prototype.handleInput = function(key) {
   if (key == 'up') {
      if (this.y > 41)
         this.y -= block_height;
      else {

         this.reset();
         score++;
         document.getElementById("score").innerHTML = score;

      }
   } else if (key == 'down') {
      if (this.y < 400) {
         this.y += block_height;
      } else {
         this.reset();
      }
   } else if (key == 'left') {
      if (this.x > 0)
         this.x -= block_width;
   } else if (key == 'right') {
      if (this.x < 400)
         this.x += block_width;
   }
};

// Now instantiate your objects.
var allEnemies = [
   new Enemy(100, 60),
   new Enemy(-50, 120),
   new Enemy(-20, 210),
   new Enemy(0, 210)
]; // Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, 400);


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