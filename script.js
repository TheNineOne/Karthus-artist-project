document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, .project-card');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Add a slight delay to the follower
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Hover effects for links
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.borderColor = 'transparent';
            follower.style.background = 'rgba(255, 0, 85, 0.2)';
        });

        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.borderColor = '#ff0055';
            follower.style.background = 'transparent';
        });
    });

    // Scroll Reveal Animation (Simple version)
    const revealElements = document.querySelectorAll('.bio-text, .project-card, .social-btn, .gallery-item, .email-btn');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize initial styles for reveal elements
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);

    // Trigger once on load
    revealOnScroll();

    // Glitch Text Randomizer (Optional extra flair)
    const glitchHeader = document.querySelector('.glitch');
    if (glitchHeader) {
        setInterval(() => {
            const skew = Math.random() * 10 - 5;
            glitchHeader.style.transform = `skew(${skew}deg)`;
            setTimeout(() => {
                glitchHeader.style.transform = 'skew(0deg)';
            }, 100);
        }, 2000);
    }

    // Audio Waveform Visualizer Vibe
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const heroSection = document.querySelector('.hero');
    heroSection.appendChild(canvas);

    canvas.style.position = 'absolute';
    canvas.style.bottom = '0'; // stick to bottom
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '40%'; // Occupy lower part of screen
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';

    let animationId;

    class AudioWave {
        constructor() {
            this.barWidth = 4;
            this.barGap = 4;
            this.bars = [];
            this.totalBars = 0;
            this.resize();
        }

        resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight * 0.4; // 40% height
            this.totalBars = Math.floor(canvas.width / (this.barWidth + this.barGap));
            this.bars = [];
            for (let i = 0; i < this.totalBars; i++) {
                this.bars.push({
                    h: Math.random() * 50,
                    speed: Math.random() * 2 + 0.5,
                    direction: 1
                });
            }
        }

        draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Create Gradient
            let gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
            gradient.addColorStop(0, '#ff0055'); // Pink botom
            gradient.addColorStop(1, 'rgba(0, 229, 255, 0)'); // Fade to top

            ctx.fillStyle = gradient;

            for (let i = 0; i < this.totalBars; i++) {
                let bar = this.bars[i];

                // Animate height
                bar.h += bar.speed * bar.direction;

                // Randomize heights smoothly
                if (bar.h > (Math.random() * 100 + 50)) bar.direction = -1;
                if (bar.h < 5) bar.direction = 1;

                // Draw bar
                let x = i * (this.barWidth + this.barGap);
                // Center the wave vertically in the canvas space roughly
                let y = canvas.height - bar.h;

                ctx.fillRect(x, y, this.barWidth, bar.h);
            }
        }
    }

    const wave = new AudioWave();

    function animate() {
        wave.draw();
        animationId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        wave.resize();
    });

    animate();
});
