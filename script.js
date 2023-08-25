// Dino

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const EXPLOSION_RADIUS = 50;

let missiles = [];
let counterMissiles = [];
let explosions = [];

class Missile {
    constructor(x, y, targetX, targetY, speed = 3) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = speed;
    }

    update() {
        const angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
        this.x += this.speed * Math.cos(angle);
        this.y += this.speed * Math.sin(angle);
    }

    draw() {
        ctx.fillStyle = "#39FF14";  // Neon Green
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Explosion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lifetime =0;
    }

    draw() {
        this.lifetime++;
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(this.x, this.y, EXPLOSION_RADIUS, 0, Math.PI * 2);
        ctx.fill();
    }
}

function detectCollisions() {
    for (const explosion of explosions) {
        missiles = missiles.filter(missile => {
            const dist = Math.hypot(explosion.x - missile.x, explosion.y - missile.y);
            return dist > EXPLOSION_RADIUS;
        });
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Generate new missile occasionally
    if (Math.random() < 0.02) {
        const x = Math.random() * canvas.width;
        const targetX = Math.random() * canvas.width;
        missiles.push(new Missile(x, 0, targetX, canvas.height));
    }

    // Update and draw missiles
    for (const missile of missiles) {
        missile.update();
        missile.draw();
    }

    // Update and draw counter-missiles
    for (const counterMissile of counterMissiles) {
        counterMissile.update();
        counterMissile.draw();
    }

    // Update and draw explosions
    for (const explosion of explosions) {
        explosion.draw();
    }

    // Remove old explosions
    explosions = explosions.filter(explosion => explosion.lifetime < 50);

    // Detect and handle collisions
    detectCollisions();

    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    counterMissiles.push(new Missile(canvas.width / 2, canvas.height, x, y, 4));
    explosions.push(new Explosion(x, y));
});

gameLoop();
