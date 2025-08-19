'use client';

import { useEffect, useRef } from 'react';

export function SpaceTheme() {
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

    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2 + 0.5,
      brightness: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      color:
        Math.random() > 0.8
          ? '#ffd700'
          : Math.random() > 0.5
            ? '#ffffff'
            : '#fffaf0',
    }));

    const nebulaClouds = Array.from({ length: 3 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      radius: 200 + Math.random() * 300,
      color: ['#4a0080', '#000080', '#8b008b'][i],
      drift: Math.random() * 0.0002 - 0.0001,
      opacity: 0.02 + Math.random() * 0.03,
    }));

    const shootingStars: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }> = [];

    const planets = [
      {
        x: 0.8,
        y: 0.3,
        radius: 40,
        color: '#8b4513',
        glowColor: '#ff6347',
        orbitRadius: 0,
        orbitSpeed: 0,
      },
      {
        x: 0.2,
        y: 0.7,
        radius: 25,
        color: '#4682b4',
        glowColor: '#00ffff',
        orbitRadius: 0,
        orbitSpeed: 0,
      },
    ];

    const createShootingStar = () => {
      if (shootingStars.length < 5 && Math.random() < 0.005) {
        shootingStars.push({
          x: Math.random(),
          y: Math.random() * 0.5,
          length: 80 + Math.random() * 120,
          speed: 0.015 + Math.random() * 0.01,
          angle: Math.PI * 0.15 + Math.random() * Math.PI * 0.2,
          opacity: 1,
          active: true,
        });
      }
    };

    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(0.4, '#0a0a2e');
      gradient.addColorStop(0.8, '#1a1a3e');
      gradient.addColorStop(1, '#16213e');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawNebula = () => {
      nebulaClouds.forEach((cloud) => {
        cloud.x += cloud.drift;
        if (cloud.x > 1.2) cloud.x = -0.2;
        if (cloud.x < -0.2) cloud.x = 1.2;

        const x = cloud.x * canvas.width;
        const y = cloud.y * canvas.height;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, cloud.radius);
        gradient.addColorStop(
          0,
          cloud.color +
            Math.floor(cloud.opacity * 255)
              .toString(16)
              .padStart(2, '0')
        );
        gradient.addColorStop(
          0.4,
          cloud.color +
            Math.floor(cloud.opacity * 0.5 * 255)
              .toString(16)
              .padStart(2, '0')
        );
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(
          x - cloud.radius,
          y - cloud.radius,
          cloud.radius * 2,
          cloud.radius * 2
        );
      });
    };

    const drawStars = () => {
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed) * 0.5 + 0.5;
        const opacity = star.brightness * twinkle;

        ctx.beginPath();
        ctx.arc(
          star.x * canvas.width,
          star.y * canvas.height,
          star.size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          star.color +
          Math.floor(opacity * 255)
            .toString(16)
            .padStart(2, '0');
        ctx.fill();

        if (star.size > 1.5 && opacity > 0.7) {
          ctx.beginPath();
          ctx.arc(
            star.x * canvas.width,
            star.y * canvas.height,
            star.size * 3,
            0,
            Math.PI * 2
          );
          const glowGradient = ctx.createRadialGradient(
            star.x * canvas.width,
            star.y * canvas.height,
            0,
            star.x * canvas.width,
            star.y * canvas.height,
            star.size * 3
          );
          glowGradient.addColorStop(0, star.color + '40');
          glowGradient.addColorStop(1, 'transparent');
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }
      });
    };

    const drawPlanets = () => {
      planets.forEach((planet) => {
        const x = planet.x * canvas.width;
        const y = planet.y * canvas.height;

        const glowGradient = ctx.createRadialGradient(
          x,
          y,
          planet.radius * 0.8,
          x,
          y,
          planet.radius * 2
        );
        glowGradient.addColorStop(0, planet.glowColor + '20');
        glowGradient.addColorStop(0.5, planet.glowColor + '10');
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(x, y, planet.radius * 2, 0, Math.PI * 2);
        ctx.fill();

        const planetGradient = ctx.createRadialGradient(
          x - planet.radius * 0.3,
          y - planet.radius * 0.3,
          0,
          x,
          y,
          planet.radius
        );
        planetGradient.addColorStop(0, planet.color);
        planetGradient.addColorStop(0.8, '#000000');
        planetGradient.addColorStop(1, '#000000');

        ctx.beginPath();
        ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
        ctx.fillStyle = planetGradient;
        ctx.fill();

        ctx.strokeStyle = planet.glowColor + '40';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    };

    const drawShootingStars = () => {
      shootingStars.forEach((star, index) => {
        if (!star.active) return;

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.02;

        if (star.opacity <= 0 || star.x > 1.2 || star.y > 1.2) {
          shootingStars.splice(index, 1);
          return;
        }

        const x = star.x * canvas.width;
        const y = star.y * canvas.height;

        const gradient = ctx.createLinearGradient(
          x,
          y,
          x - Math.cos(star.angle) * star.length,
          y - Math.sin(star.angle) * star.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(
          0.5,
          `rgba(255, 255, 255, ${star.opacity * 0.5})`
        );
        gradient.addColorStop(1, 'transparent');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(
          x - Math.cos(star.angle) * star.length,
          y - Math.sin(star.angle) * star.length
        );
        ctx.stroke();
      });
    };

    const drawCosmicDust = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(time * 0.0001 + i) + 1) * 0.5 * canvas.width;
        const y = (Math.cos(time * 0.0002 + i * 2) + 1) * 0.5 * canvas.height;
        const size = Math.sin(time * 0.001 + i) * 2 + 3;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      time++;

      drawBackground();
      drawNebula();
      drawStars();
      drawCosmicDust();
      drawPlanets();
      createShootingStar();
      drawShootingStars();

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
