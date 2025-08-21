'use client';

import { useEffect, useRef } from 'react';

export function MinimalTheme() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let time = 0;

    const aurora = {
      particles: Array.from({ length: 5 }, () => ({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 300 + 200,
        speed: Math.random() * 0.0002 + 0.0001,
        angle: Math.random() * Math.PI * 2,
      })),
    };

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2 + 0.5,
      brightness: Math.random(),
      twinkleSpeed: Math.random() * 0.005 + 0.002,
    }));

    const orbs = Array.from({ length: 3 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      size: Math.random() * 150 + 100,
      hue: Math.random() * 40 + 180, // Blue range
    }));

    const flowLines = Array.from({ length: 6 }, () => ({
      progress: Math.random(),
      y: Math.random(),
      speed: Math.random() * 0.002 + 0.001,
      width: Math.random() * 0.3 + 0.2,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    const snowflakes = Array.from({ length: 30 }, () => ({
      x: Math.random(),
      y: Math.random() * 2 - 1,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.0003 + 0.0002,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.002 + 0.001,
    }));

    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0c1222'); // Darker navy
      gradient.addColorStop(0.5, '#1e293b'); // Slate
      gradient.addColorStop(1, '#0f172a'); // Dark slate

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawAurora = () => {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      aurora.particles.forEach((particle, i) => {
        particle.angle += particle.speed;
        const x = (particle.x + Math.sin(particle.angle) * 0.1) * canvas.width;
        const y =
          (particle.y + Math.cos(particle.angle) * 0.05) * canvas.height;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, particle.size);

        if (i % 3 === 0) {
          gradient.addColorStop(0, 'rgba(147, 197, 253, 0.4)'); // Baby blue
          gradient.addColorStop(0.5, 'rgba(219, 234, 254, 0.2)'); // Light blue
          gradient.addColorStop(1, 'transparent');
        } else if (i % 3 === 1) {
          gradient.addColorStop(0, 'rgba(165, 243, 252, 0.3)'); // Cyan
          gradient.addColorStop(0.5, 'rgba(186, 230, 253, 0.15)'); // Sky blue
          gradient.addColorStop(1, 'transparent');
        } else {
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)'); // White
          gradient.addColorStop(0.5, 'rgba(241, 245, 249, 0.1)'); // Off white
          gradient.addColorStop(1, 'transparent');
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      ctx.restore();
    };

    const drawStars = () => {
      stars.forEach((star) => {
        const brightness =
          0.5 +
          Math.sin(time * star.twinkleSpeed + star.brightness * Math.PI * 2) *
            0.5;
        const size = star.size * (0.8 + brightness * 0.4);

        ctx.beginPath();
        ctx.arc(
          star.x * canvas.width,
          star.y * canvas.height,
          size,
          0,
          Math.PI * 2
        );

        const opacity = brightness * 0.9;
        if (Math.random() > 0.5) {
          ctx.fillStyle = `rgba(219, 234, 254, ${opacity})`; // Light blue
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`; // White
        }
        ctx.fill();

        // Star glow
        const glowGradient = ctx.createRadialGradient(
          star.x * canvas.width,
          star.y * canvas.height,
          0,
          star.x * canvas.width,
          star.y * canvas.height,
          size * 4
        );
        glowGradient.addColorStop(0, `rgba(147, 197, 253, ${opacity * 0.3})`);
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(
          star.x * canvas.width,
          star.y * canvas.height,
          size * 4,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });
    };

    const drawOrbs = () => {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -0.1 || orb.x > 1.1) orb.vx *= -1;
        if (orb.y < -0.1 || orb.y > 1.1) orb.vy *= -1;

        orb.x = Math.max(-0.1, Math.min(1.1, orb.x));
        orb.y = Math.max(-0.1, Math.min(1.1, orb.y));

        const x = orb.x * canvas.width;
        const y = orb.y * canvas.height;
        const pulse = Math.sin(time * 0.001 + orb.hue) * 0.1 + 1;
        const size = orb.size * pulse;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, `hsla(${orb.hue}, 70%, 70%, 0.3)`);
        gradient.addColorStop(0.5, `hsla(${orb.hue}, 60%, 80%, 0.15)`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    };

    const drawFlowLines = () => {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      flowLines.forEach((line) => {
        line.progress += line.speed;
        if (line.progress > 1 + line.width) {
          line.progress = -line.width;
          line.y = Math.random();
        }

        const startX = (line.progress - line.width) * canvas.width;
        const endX = line.progress * canvas.width;
        const y = line.y * canvas.height;

        const gradient = ctx.createLinearGradient(startX, y, endX, y);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(
          0.1,
          `rgba(147, 197, 253, ${line.opacity * 0.3})`
        );
        gradient.addColorStop(0.5, `rgba(219, 234, 254, ${line.opacity})`);
        gradient.addColorStop(
          0.9,
          `rgba(147, 197, 253, ${line.opacity * 0.3})`
        );
        gradient.addColorStop(1, 'transparent');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
      });

      ctx.restore();
    };

    const drawSnowflakes = () => {
      snowflakes.forEach((flake) => {
        flake.y += flake.speed;
        flake.wobble += flake.wobbleSpeed;

        if (flake.y > 1.1) {
          flake.y = -0.1;
          flake.x = Math.random();
        }

        const x = (flake.x + Math.sin(flake.wobble) * 0.02) * canvas.width;
        const y = flake.y * canvas.height;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(flake.wobble);

        // Snowflake shape
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 - flake.y * 0.3})`;
        ctx.lineWidth = 1;

        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -flake.size);
          ctx.stroke();
          ctx.rotate(Math.PI / 3);
        }

        ctx.restore();

        // Snowflake glow
        const glowGradient = ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          flake.size * 3
        );
        glowGradient.addColorStop(
          0,
          `rgba(219, 234, 254, ${0.3 - flake.y * 0.2})`
        );
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(x, y, flake.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const animate = () => {
      time++;

      drawBackground();
      drawAurora();
      drawOrbs();
      drawFlowLines();
      drawStars();
      drawSnowflakes();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
}
