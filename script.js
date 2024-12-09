// Select the music button
const musicButton = document.getElementById("play-music");

// Play birthday song
musicButton.addEventListener("click", () => {
    const audio = new Audio("birthday_song.mp3"); // Đảm bảo file mp3 có tên chính xác
    audio.play();
    musicButton.disabled = true; // Vô hiệu hóa nút sau khi bật nhạc
});

// Fireworks effect
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y, color, speed, angle) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = speed;
        this.angle = angle;
        this.alpha = 1;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha -= 0.02;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
    }
}

function createFireworks(x, y) {
    const colors = ["255, 99, 71", "144, 238, 144", "173, 216, 230", "255, 215, 0"];
    for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color, speed, angle));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter((particle) => particle.alpha > 0);
    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

// Add fireworks on click
canvas.addEventListener("click", (e) => {
    createFireworks(e.clientX, e.clientY);
});

// Start animation
animate();
