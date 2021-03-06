function BaseCharacter() {
  this.velocityX = 0;
  this.velocityY = 0;

  this.posX = 0;
  this.posY = CEILING; // ceiling
  this.width = 100;
  this.height = 100;

  this.health = 1;
  this.isDestroyed = false;
}

BaseCharacter.prototype.update = function(dt) {
  applyGravity(this, dt);

  var offsetX = this.velocityX * dt / 1000;
  this.posX += offsetX;
  this.posY += this.velocityY;

  // enforce boundaries
  if (this.posX + this.width / 2 > RIGHT_BOUNDARY) {
    this.posX = RIGHT_BOUNDARY - this.width / 2;
  }
  else if (this.posX - this.width / 2 < LEFT_BOUNDARY) {
      this.posX = LEFT_BOUNDARY + this.width / 2;
  }


  if (this.posY - this.height / 2 < FLOOR) {
    this.posY = FLOOR + this.height / 2;
    this.velocityY = 0;
  }

  if (this.health <= 0) {
    this.isDestroyed = true;
  }
};


BaseCharacter.prototype.paint = function(context) {
  context.beginPath();
  context.arc(this.posX, getYDrawPoint(this.posY), this.radius, 0, Math.PI * 2, false);
  context.fill();
  context.closePath();
};


// util function
function applyGravity(character, dt) {
  character.velocityY -= 9.81 * dt / 1000;
}


function getYDrawPoint(yPos) { // canvas Y coordinates are inverted
  return CEILING - yPos;
}
