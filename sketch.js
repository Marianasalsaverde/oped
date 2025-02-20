let leftCircles = [];
let rightCircles = [];
let emoji = "🤝";
let emojiPositions = [];
const palette = ["#F1C416", "orange", "#F95A76", "#EF9CC7", "#ff1020", "#3B38EB", "#9F81CD", "#FE8718", "#20903A", "#EC9E8A", "#EF9CC7", "#FFFD8A"];

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  background(0);
  cnv.parent('game-container'); // Attach canvas to the div

  // Set frame rate to a lower value
  frameRate(40); 

  // creats circles moving from left and right
  for (let i = 0; i < 40; i++) {
    leftCircles.push(new MovingCircle(-random(100, 400), random(height), random(4, 8), randomColor(), "left"));

    // Change right circle spawn position to appear at the same time
    rightCircles.push(new MovingCircle(width / 2 + random(50, 200), random(height), -random(4, 8), color(255), "right")); 
}
}

function draw() {
  background(0);



  // Move and display circles
  for (let lc of leftCircles) {
    lc.move();
    lc.display();
  }

  for (let rc of rightCircles) {
    rc.move();
    rc.display();
    // rc.x = 0.0029;
  }

  // for the collisions and to keep emoji positions
  emojiPositions = []; // Clear emoji positions each frame
  for (let lc of leftCircles) {
    for (let rc of rightCircles) {
      let d = dist(lc.x, lc.y, rc.x, rc.y);
      if (d < 50) { // Larger threshold for better visibility
        emojiPositions.push({ x: (lc.x + rc.x) / 2, y: (lc.y + rc.y) / 2 });
      }
    }
  }

  // Draw emojis at collision points
  textSize(140);
  textAlign(CENTER, CENTER);
  fill(255);
  for (let e of emojiPositions) {
    text(emoji, e.x, e.y);
  }
}

class MovingCircle {
  constructor(x, y, speed, col, side) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.col = col;
    this.trail = []; // store previous positions
    this.side = side; // "left" or "right"
  }

  move() {
    if (this.side === "right") {
        // Every 120 frames (2 seconds), move for 60 frames and stop for 60 frames
        // if (frameCount % 190 < 150) {  
            this.x += this.speed; // Move for 1 second
            this.y += random(-5, 5); // Slight vertical movement
        // } 
        // Otherwise, do nothing (stop moving)
    } else {
        this.x += this.speed; // Normal movement for left-side circles
    }

    // Reset circles when they go out of bounds
    if (this.side === "left" && this.x > width + 50) {
        this.x = -random(100, 400);
        this.y = random(height);
    } else if (this.side === "right" && this.x < -50) {
        this.x = width + random(100, 400);
        this.y = random(height);
    }

    // Save position for trail (limit to last 500 positions)
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 500) {
        this.trail.shift();
    }
}

  display() {
    noStroke();

    // **Left-side circles: gradient trail effect**
    if (this.side === "left") {
      for (let i = 0; i < this.trail.length; i++) {
        let alpha = map(i, 0, this.trail.length - 1, 0, 255); // Smooth fade
        let size = map(i, 0, this.trail.length - 1, 20, 50); // Shrinks over time

        fill(red(this.col), green(this.col), blue(this.col), alpha);
        ellipse(this.trail[i].x, this.trail[i].y, size);
      }
    }

    // Draw the actual circle on top
    fill(this.col);
    ellipse(this.x, this.y, 50);
  }
}

// Function to get random colors from palette
function randomColor() {
  let c = palette[Math.floor(Math.random() * palette.length)];
  return color(c);
}

