// Fire Sparks/Particles Animation
class FireSpark {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.sparks = [];
        this.resize();
        this.createSparks();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createSparks() {
        const sparkCount = 50;
        for (let i = 0; i < sparkCount; i++) {
            this.sparks.push({
                x: Math.random() * this.canvas.width,
                y: this.canvas.height + Math.random() * 100,
                size: Math.random() * 3 + 1,
                speedY: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.3,
                life: Math.random() * 100 + 50
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.sparks.forEach((spark, index) => {
            // Move spark upward
            spark.y -= spark.speedY;
            spark.x += spark.speedX;
            spark.life--;

            // Fade out as it rises
            spark.opacity -= 0.005;

            // Draw spark
            const gradient = this.ctx.createRadialGradient(
                spark.x, spark.y, 0,
                spark.x, spark.y, spark.size
            );
            gradient.addColorStop(0, `rgba(255, 200, 100, ${spark.opacity})`);
            gradient.addColorStop(0.5, `rgba(255, 100, 50, ${spark.opacity * 0.6})`);
            gradient.addColorStop(1, `rgba(255, 0, 50, 0)`);

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Reset spark when it dies
            if (spark.life <= 0 || spark.opacity <= 0) {
                spark.x = Math.random() * this.canvas.width;
                spark.y = this.canvas.height + Math.random() * 50;
                spark.opacity = Math.random() * 0.5 + 0.3;
                spark.life = Math.random() * 100 + 50;
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize fire sparks on all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = ['.hero', '.bio-section', '.projects-section', '.featured-section', '.contact-section'];

    sections.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) {
            const canvas = document.createElement('canvas');
            canvas.className = 'fire-sparks-canvas';
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '3';
            section.style.position = 'relative';
            section.appendChild(canvas);

            new FireSpark(canvas);
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        document.querySelectorAll('.fire-sparks-canvas').forEach(canvas => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        });
    });
});
