let car;
let redObstacles = [];
let blueObstacles = [];
let yellowObstacles = [];
let score = 0;
let blueCollected = 0;
let yellowCollected = 0;
let redCollected = 0;
let startTime;
let timeLimit = 20; // Initial time limit is 20 seconds
let goal = 5; // Collect 5 blue, 5 yellow, and 5 red obstacles
let gameOver = false; // Initialize gameOver flag

function setup() {
  createCanvas(600, 800); // Canvas size is 600x800
  car = new Car();
  startTime = frameCount;

  setInterval(() => {
    if (!gameOver) {
      if (random(1) < 0.5) {
        blueObstacles.push(new Obstacle(color(0, 0, 255))); // Blue obstacles
      } else {
        yellowObstacles.push(new Obstacle(color(255, 255, 0))); // Yellow obstacles
      }
      redObstacles.push(new Obstacle(color(255, 0, 0))); // Red obstacles
    }
  }, 1000);
}

function draw() {
  background(220);

  if (!gameOver) {
    car.display();

    if (keyIsDown(LEFT_ARROW)) {
      car.moveLeft();
    } else if (keyIsDown(RIGHT_ARROW)) {
      car.moveRight();
    }

    for (let i = blueObstacles.length - 1; i >= 0; i--) {
      blueObstacles[i].display();
      blueObstacles[i].move();

      if (car.hits(blueObstacles[i])) {
        blueObstacles.splice(i, 1);
        score += 1;
        blueCollected += 1;
      } else if (blueObstacles[i].offscreen()) {
        blueObstacles.splice(i, 1);
      }
    }

    for (let i = yellowObstacles.length - 1; i >= 0; i--) {
      yellowObstacles[i].display();
      yellowObstacles[i].move();

      if (car.hits(yellowObstacles[i])) {
        yellowObstacles.splice(i, 1);
        score += 1;
        yellowCollected += 1;
      } else if (yellowObstacles[i].offscreen()) {
        yellowObstacles.splice(i, 1);
      }
    }

    for (let i = redObstacles.length - 1; i >= 0; i--) {
      redObstacles[i].display();
      redObstacles[i].move();

      if (car.hits(redObstacles[i])) {
        redObstacles.splice(i, 1);
        score += 1;
        redCollected += 1;
      } else if (redObstacles[i].offscreen()) {
        redObstacles.splice(i, 1);
      }
    }

    textSize(32);
    fill(0);
    text("Score: " + score, 10, 30);
    text("Blue Collected: " + blueCollected, 10, 70);
    text("Yellow Collected: " + yellowCollected, 10, 110);
    text("Red Collected: " + redCollected, 10, 150);

    let currentTime = int((frameCount - startTime) / 60); // Convert frame count to seconds

    if (
      blueCollected >= goal &&
      yellowCollected >= goal &&
      redCollected >= goal 
    ) {
      // If the goal is reached, reset the timer
      startTime = frameCount;
      blueCollected = 0; // Reset collected counts
      yellowCollected = 0;
      redCollected = 0;
    } else if (currentTime >= timeLimit) {
      // If the time limit is reached
      textSize(32);
      fill(255, 0, 0);
      text("Time's Up!", 150, height / 2);
      gameOver = true;
    } else {
      textSize(32);
      fill(0);
      text("Time: " + (timeLimit - currentTime) + "s", 10, height - 10);
    }
  } else {
    textSize(32);
    fill(255, 0, 0);
    text("Game Over", 150, height / 2);
    text("Score: " + score, 160, height / 2 + 40);
  }
}

class Car {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.width = 20; // Changed car shape to a vertical rectangle
    this.height = 40; // Changed car shape to a vertical rectangle
    this.speed = 5;
  }

  display() {
    fill(150); // Gray color
    rect(this.x, this.y, this.width, this.height);
  }

  moveLeft() {
    this.x -= this.speed;
    this.x = constrain(this.x, 0, width - this.width);
  }

  moveRight() {
    this.x += this.speed;
    this.x = constrain(this.x, 0, width - this.width);
  }

  hits(obstacle) {
    if (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    ) {
      return true;
    }
    return false;
  }
}

class Obstacle {
  constructor(col) {
    this.width = random(20, 50);
    this.height = 10;
    this.x = random(width - this.width);
    this.y = 0;
    this.speed = random(2, 6);
    this.color = col;
  }

  display() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.y += this.speed;
  }

  offscreen() {
    return this.y > height;
  }
}