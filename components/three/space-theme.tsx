'use client';

import { useEffect, useRef } from 'react';

export function SpaceTheme() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastFrameTime = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 3 + 1,
      sparklePhase: Math.random() * Math.PI * 2,
      sparkleSpeed: Math.random() * 0.015 + 0.005,
      type: Math.random() > 0.7 ? 'sparkle' : 'normal',
      color: ['#ffffff', '#ffd4e5', '#d4e5ff', '#fffbeb'][
        Math.floor(Math.random() * 4)
      ],
    }));

    const petals = Array.from({ length: 30 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 15 + 10,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
      fallSpeed: Math.random() * 0.00025 + 0.0001,
      swayAmount: Math.random() * 50 + 20,
      swaySpeed: Math.random() * 0.001 + 0.0005,
      opacity: Math.random() * 0.3 + 0.1,
      color: Math.random() > 0.5 ? '#ff6b6b' : '#ff8cc8',
    }));

    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      trail: Array<{ x: number; y: number }>;
      active: boolean;
    }

    const shootingStars: ShootingStar[] = [];

    const energyParticles = Array.from({ length: 32 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0002,
      vy: (Math.random() - 0.5) * 0.0002,
      size: Math.random() * 4 + 2,
      energy: Math.random(),
      pulseSpeed: Math.random() * 0.01 + 0.005,
    }));

    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, '#0f0c29');
      gradient.addColorStop(0.3, '#24243e');
      gradient.addColorStop(0.5, '#302b63');
      gradient.addColorStop(0.7, '#24243e');
      gradient.addColorStop(1, '#0f0c29');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 50;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawAnimeNebula = () => {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const nebulaColors = [
        {
          x: 0.3,
          y: 0.4,
          color1: 'rgba(139, 92, 246, 0.2)',
          color2: 'rgba(236, 72, 153, 0.1)',
        },
        {
          x: 0.7,
          y: 0.6,
          color1: 'rgba(59, 130, 246, 0.2)',
          color2: 'rgba(34, 211, 238, 0.1)',
        },
        {
          x: 0.5,
          y: 0.2,
          color1: 'rgba(251, 146, 60, 0.15)',
          color2: 'rgba(254, 215, 170, 0.08)',
        },
      ];

      nebulaColors.forEach((nebula, i) => {
        const x = canvas.width * nebula.x + Math.sin(time * 0.00005 + i) * 30;
        const y = canvas.height * nebula.y + Math.cos(time * 0.00005 + i) * 30;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 200);
        gradient.addColorStop(0, nebula.color1);
        gradient.addColorStop(0.5, nebula.color2);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 300, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    };

    const drawStars = () => {
      stars.forEach((star) => {
        const centerX = 0.5;
        const centerY = 0.5;
        const rotationSpeed = 0.00008;
        const angle = time * rotationSpeed;

        const dx = star.x - centerX;
        const dy = star.y - centerY;
        const rotatedX =
          centerX + (dx * Math.cos(angle) - dy * Math.sin(angle));
        const rotatedY =
          centerY + (dx * Math.sin(angle) + dy * Math.cos(angle));

        let x = rotatedX;
        let y = rotatedY;
        if (x < -0.1) x += 1.2;
        if (x > 1.1) x -= 1.2;
        if (y < -0.1) y += 1.2;
        if (y > 1.1) y -= 1.2;

        const screenX = x * canvas.width;
        const screenY = y * canvas.height;

        if (star.type === 'sparkle') {
          const sparkle =
            Math.sin(time * star.sparkleSpeed + star.sparklePhase) * 0.5 + 0.5;
          const size = star.size * (1 + sparkle * 0.5);

          ctx.save();
          ctx.translate(screenX, screenY);
          ctx.rotate(time * 0.001);
          ctx.beginPath();
          ctx.moveTo(0, -size * 3);
          ctx.lineTo(-size * 0.3, -size * 0.3);
          ctx.lineTo(-size * 3, 0);
          ctx.lineTo(-size * 0.3, size * 0.3);
          ctx.lineTo(0, size * 3);
          ctx.lineTo(size * 0.3, size * 0.3);
          ctx.lineTo(size * 3, 0);
          ctx.lineTo(size * 0.3, -size * 0.3);
          ctx.closePath();

          const starGradient = ctx.createRadialGradient(
            0,
            0,
            0,
            0,
            0,
            size * 3
          );
          starGradient.addColorStop(0, star.color);
          starGradient.addColorStop(0.5, star.color + '80');
          starGradient.addColorStop(1, 'transparent');
          ctx.fillStyle = starGradient;
          ctx.fill();

          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(screenX, screenY, star.size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.fill();

          const glowGradient = ctx.createRadialGradient(
            screenX,
            screenY,
            0,
            screenX,
            screenY,
            star.size * 4
          );
          glowGradient.addColorStop(0, star.color + '60');
          glowGradient.addColorStop(0.5, star.color + '20');
          glowGradient.addColorStop(1, 'transparent');
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(screenX, screenY, star.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    const drawPetals = () => {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      petals.forEach((petal) => {
        petal.y += petal.fallSpeed;
        petal.x +=
          Math.sin(time * petal.swaySpeed) * petal.swayAmount * 0.00001;
        petal.rotation += petal.rotationSpeed;

        if (petal.y > 1) petal.y = -0.1;
        if (petal.x > 1.1) petal.x = -0.1;
        if (petal.x < -0.1) petal.x = 1.1;

        const centerX = 0.5;
        const centerY = 0.5;
        const rotationSpeed = 0.00012;
        const angle = time * rotationSpeed;

        const dx = petal.x - centerX;
        const dy = petal.y - centerY;
        const rotatedX =
          centerX + (dx * Math.cos(angle) - dy * Math.sin(angle));
        const rotatedY =
          centerY + (dx * Math.sin(angle) + dy * Math.cos(angle));

        const x = rotatedX * canvas.width;
        const y = rotatedY * canvas.height;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(petal.rotation);
        ctx.globalAlpha = petal.opacity;

        ctx.beginPath();
        ctx.moveTo(0, -petal.size);
        ctx.bezierCurveTo(
          -petal.size * 0.5,
          -petal.size * 0.5,
          -petal.size * 0.5,
          petal.size * 0.5,
          0,
          petal.size
        );
        ctx.bezierCurveTo(
          petal.size * 0.5,
          petal.size * 0.5,
          petal.size * 0.5,
          -petal.size * 0.5,
          0,
          -petal.size
        );

        const petalGradient = ctx.createRadialGradient(
          0,
          0,
          0,
          0,
          0,
          petal.size
        );
        petalGradient.addColorStop(0, petal.color);
        petalGradient.addColorStop(0.7, petal.color + '80');
        petalGradient.addColorStop(1, petal.color + '00');
        ctx.fillStyle = petalGradient;
        ctx.fill();

        ctx.restore();
      });

      ctx.restore();
    };

    const drawEnergyParticles = () => {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      energyParticles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.vx += (0.5 - particle.x) * 0.000002;
        particle.vy += (0.5 - particle.y) * 0.000002;

        if (particle.x > 1) particle.x = 0;
        if (particle.x < 0) particle.x = 1;
        if (particle.y > 1) particle.y = 0;
        if (particle.y < 0) particle.y = 1;

        const x = particle.x * canvas.width;
        const y = particle.y * canvas.height;
        const pulse = Math.sin(time * particle.pulseSpeed) * 0.5 + 0.5;
        const size = particle.size * (1 + pulse * 0.5);

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        const energyGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        energyGradient.addColorStop(0, '#ffffff');
        energyGradient.addColorStop(0.3, '#ffd23f');
        energyGradient.addColorStop(0.7, '#ee6c4d');
        energyGradient.addColorStop(1, '#c9184a');
        ctx.fillStyle = energyGradient;
        ctx.fill();

        const auraGradient = ctx.createRadialGradient(
          x,
          y,
          size,
          x,
          y,
          size * 4
        );
        auraGradient.addColorStop(0, 'rgba(255, 210, 63, 0.4)');
        auraGradient.addColorStop(0.5, 'rgba(238, 108, 77, 0.2)');
        auraGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = auraGradient;
        ctx.beginPath();
        ctx.arc(x, y, size * 4, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    };

    const createShootingStar = () => {
      if (shootingStars.length < 3 && Math.random() < 0.002) {
        const star: ShootingStar = {
          x: Math.random(),
          y: Math.random() * 0.5,
          length: 150,
          speed: 0.003,
          angle: Math.PI * 0.25,
          opacity: 1,
          trail: [],
          active: true,
        };

        for (let i = 0; i < 20; i++) {
          star.trail.push({ x: star.x, y: star.y });
        }

        shootingStars.push(star);
      }
    };

    const drawShootingStars = () => {
      shootingStars.forEach((star, index) => {
        if (!star.active) return;

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.trail.pop();
        star.trail.unshift({ x: star.x, y: star.y });
        star.opacity -= 0.002;

        if (star.opacity <= 0 || star.x > 1.2 || star.y > 1.2) {
          shootingStars.splice(index, 1);
          return;
        }

        star.trail.forEach((point, i) => {
          const x = point.x * canvas.width;
          const y = point.y * canvas.height;
          const size = ((star.trail.length - i) / star.trail.length) * 3;
          const opacity =
            ((star.trail.length - i) / star.trail.length) * star.opacity;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          const hue = (i / star.trail.length) * 60 + 180;
          ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${opacity})`;
          ctx.fill();
        });

        const headX = star.x * canvas.width;
        const headY = star.y * canvas.height;

        ctx.beginPath();
        ctx.arc(headX, headY, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        const headGlow = ctx.createRadialGradient(
          headX,
          headY,
          0,
          headX,
          headY,
          15
        );
        headGlow.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.8})`);
        headGlow.addColorStop(
          0.5,
          `rgba(255, 210, 210, ${star.opacity * 0.4})`
        );
        headGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = headGlow;
        ctx.beginPath();
        ctx.arc(headX, headY, 15, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastFrameTime.current;

      if (deltaTime >= 16) {
        lastFrameTime.current = currentTime;
        time++;

        drawBackground();
        drawAnimeNebula();
        drawStars();
        drawPetals();
        drawEnergyParticles();
        createShootingStar();
        drawShootingStars();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
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
