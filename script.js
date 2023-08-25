const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const EXPLOSION_RADIUS = 30;

let missiles = [];
let counterMissiles = [];
let explosions = [];

class Missile {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
    }

    draw() {
        ctx.fillStyle = "#39FF14";  // Neon Green
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

class CounterMissile extends Missile {
    draw() {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Explosion {
    constructor(x, y, maxRadius=30) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = maxRadius;
    }

    update() {
        this.radius++;
        return this.radius >= this.maxRadius;
    }

    draw() {
        ctx.fillStyle = "#39FF14";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Insert your logic for generating missiles and counter-missiles here

    // Update and draw missiles
    for (const missile of missiles) {
        missile.draw();
    }

    // Update and draw counter-missiles
    for (const counterMissile of counterMissiles) {
        counterMissile.draw();
    }

    // Update and draw explosions
    for (const explosion of explosions) {
        if (explosion.update()) {
            // Remove explosion when it has reached max size
            const index = explosions.indexOf(explosion);
            if (index > -1) {
                explosions.splice(index, 1);
            }
        }
        explosion.draw();
    }

    // Check for missile and explosion intersections here

    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
