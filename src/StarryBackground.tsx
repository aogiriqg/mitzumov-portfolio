import React, { useRef, useEffect } from 'react';

const STAR_COUNT = 180;
const SHOOTING_STAR_INTERVAL = 1200;
const SHOOTING_STAR_MIN_ANGLE = 40;
const SHOOTING_STAR_MAX_ANGLE = 60;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
}

const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<Star[]>([]);
  const shootingStars = useRef<ShootingStar[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Звезды
    stars.current = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.2,
      alpha: randomBetween(0.5, 1)
    }));

    // Луна
    const moon = {
      x: width * 0.8,
      y: height * 0.18,
      radius: Math.max(60, width * 0.07)
    };

    // Падающие звезды
    let lastShootingStar = Date.now();

    function drawMoon() {
      if (!ctx) return;
      // Glow
      const gradient = ctx.createRadialGradient(
        moon.x, moon.y, moon.radius * 0.7,
        moon.x, moon.y, moon.radius * 2.2
      );
      gradient.addColorStop(0, 'rgba(255,255,220,0.7)');
      gradient.addColorStop(1, 'rgba(255,255,220,0)');
      ctx.save();
      ctx.beginPath();
      ctx.arc(moon.x, moon.y, moon.radius * 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
      // Moon
      ctx.save();
      ctx.beginPath();
      ctx.arc(moon.x, moon.y, moon.radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,255,220,0.95)';
      ctx.shadowColor = '#fffbe6';
      ctx.shadowBlur = 30;
      ctx.fill();
      ctx.restore();
    }

    function drawStars() {
      if (!ctx) return;
      for (const star of stars.current) {
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }
    }

    function drawShootingStars() {
      if (!ctx) return;
      for (const s of shootingStars.current) {
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x - Math.cos(s.angle) * s.length,
          s.y - Math.sin(s.angle) * s.length
        );
        ctx.stroke();
        ctx.restore();
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      // Night gradient
      const night = ctx.createLinearGradient(0, 0, 0, height);
      night.addColorStop(0, '#181e36');
      night.addColorStop(1, '#0a1026');
      ctx.fillStyle = night;
      ctx.fillRect(0, 0, width, height);
      drawMoon();
      drawStars();
      drawShootingStars();
      // Update shooting stars
      shootingStars.current = shootingStars.current.filter(s => s.alpha > 0.01);
      for (const s of shootingStars.current) {
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.012;
      }
      // Add new shooting star
      if (Date.now() - lastShootingStar > SHOOTING_STAR_INTERVAL) {
        const angle = (randomBetween(SHOOTING_STAR_MIN_ANGLE, SHOOTING_STAR_MAX_ANGLE) * Math.PI) / 180;
        const startX = randomBetween(width * 0.1, width * 0.8);
        const startY = randomBetween(height * 0.05, height * 0.4);
        shootingStars.current.push({
          x: startX,
          y: startY,
          length: randomBetween(80, 160),
          speed: randomBetween(8, 13),
          angle,
          alpha: 1
        });
        lastShootingStar = Date.now();
      }
      animationRef.current = requestAnimationFrame(animate);
    }

    animate();
    // Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      moon.x = width * 0.8;
      moon.y = height * 0.18;
      moon.radius = Math.max(60, width * 0.07);
      stars.current = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.2,
        alpha: randomBetween(0.5, 1)
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default StarryBackground; 