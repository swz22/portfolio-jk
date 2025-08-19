'use client';

import { useEffect, useRef } from 'react';

export function BeachTheme() {
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

    const waves = [
      {
        amplitude: 20,
        wavelength: 0.01,
        speed: 0.015,
        y: 0.7,
        color: 'rgba(59, 130, 246, 0.6)',
      },
      {
        amplitude: 18,
        wavelength: 0.015,
        speed: 0.02,
        y: 0.75,
        color: 'rgba(96, 165, 250, 0.5)',
      },
      {
        amplitude: 15,
        wavelength: 0.02,
        speed: 0.018,
        y: 0.8,
        color: 'rgba(147, 197, 253, 0.4)',
      },
      {
        amplitude: 12,
        wavelength: 0.018,
        speed: 0.016,
        y: 0.85,
        color: 'rgba(191, 219, 254, 0.3)',
      },
    ];

    const palmTrees = [
      { x: 0.05, y: 0.5, height: 100, sway: 0 }, // Far left
      { x: 0.95, y: 0.5, height: 100, sway: 0 }, // Far right
    ];

    const birds = Array.from({ length: 7 }, (_, i) => ({
      x: Math.random(),
      y: Math.random() * 0.4,
      vx: (Math.random() - 0.5) * 0.001,
      vy: (Math.random() - 0.5) * 0.0005,
      phase: Math.random() * Math.PI * 2,
      size: Math.random() * 0.5 + 0.5,
    }));

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.0005 + 0.0002,
      opacity: Math.random() * 0.3 + 0.1,
      windOffset: Math.random() * Math.PI * 2,
    }));

    const clouds = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random(),
      y: Math.random() * 0.15 + 0.05,
      width: Math.random() * 100 + 80,
      height: Math.random() * 30 + 20,
      speed: Math.random() * 0.00005 + 0.00001,
      opacity: Math.random() * 0.2 + 0.05,
    }));

    const drawSky = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#94B9D6');
      gradient.addColorStop(0.3, '#A8C7DE');
      gradient.addColorStop(0.5, '#D4B5C7');
      gradient.addColorStop(0.7, '#E6C3A6');
      gradient.addColorStop(0.85, '#EDC9AC');
      gradient.addColorStop(1, '#F0D5BB');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawClouds = () => {
      clouds.forEach((cloud) => {
        cloud.x += cloud.speed;
        if (cloud.x > 1.2) cloud.x = -0.2;

        ctx.save();
        ctx.globalAlpha = cloud.opacity;

        const x = cloud.x * canvas.width;
        const y = cloud.y * canvas.height;

        const cloudGradient = ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          cloud.width / 2
        );
        cloudGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        cloudGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = cloudGradient;
        ctx.fillRect(
          x - cloud.width / 2,
          y - cloud.height / 2,
          cloud.width,
          cloud.height
        );

        ctx.restore();
      });
    };

    const drawSun = () => {
      const sunX = canvas.width * 0.85;
      const sunY = canvas.height * 0.15;

      const glowGradient = ctx.createRadialGradient(
        sunX,
        sunY,
        0,
        sunX,
        sunY,
        60
      );
      glowGradient.addColorStop(0, 'rgba(255, 215, 0, 0.15)');
      glowGradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.08)');
      glowGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');

      ctx.fillStyle = glowGradient;
      ctx.fillRect(sunX - 80, sunY - 80, 160, 160);

      // Sun
      ctx.beginPath();
      ctx.arc(sunX, sunY, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#FFD700';
      ctx.fill();
    };

    const drawBeach = () => {
      const beachGradient = ctx.createLinearGradient(
        0,
        canvas.height * 0.65,
        0,
        canvas.height
      );
      beachGradient.addColorStop(0, '#F4E4C1');
      beachGradient.addColorStop(0.5, '#E6D5AA');
      beachGradient.addColorStop(1, '#D4BC88');

      ctx.fillStyle = beachGradient;
      ctx.fillRect(0, canvas.height * 0.65, canvas.width, canvas.height * 0.35);

      // Beach texture
      ctx.globalAlpha = 0.1;
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = canvas.height * 0.65 + Math.random() * canvas.height * 0.35;
        const size = Math.random() * 2;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = '#8B7355';
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawWave = (wave: (typeof waves)[0], index: number) => {
      ctx.beginPath();
      ctx.moveTo(0, wave.y * canvas.height);

      for (let x = 0; x <= canvas.width; x++) {
        const y =
          wave.y * canvas.height +
          Math.sin(x * wave.wavelength + time * wave.speed) * wave.amplitude +
          Math.sin(x * wave.wavelength * 2 + time * wave.speed * 1.5) *
            (wave.amplitude * 0.3);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      ctx.fillStyle = wave.color;
      ctx.fill();

      if (index === 0) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, wave.y * canvas.height);
        for (let x = 0; x <= canvas.width; x += 5) {
          const y =
            wave.y * canvas.height +
            Math.sin(x * wave.wavelength + time * wave.speed) * wave.amplitude;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    const drawBird = (bird: (typeof birds)[0]) => {
      bird.x += bird.vx;
      bird.y += bird.vy + Math.sin(time * 0.003 + bird.phase) * 0.0003;

      if (bird.x > 1.1) bird.x = -0.1;
      if (bird.x < -0.1) bird.x = 1.1;
      if (bird.y > 0.5) bird.y = 0;
      if (bird.y < 0) bird.y = 0.5;

      const x = bird.x * canvas.width;
      const y = bird.y * canvas.height;

      const wingFlap = Math.sin(time * 0.01 + bird.phase) * 5;

      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 2 * bird.size;
      ctx.beginPath();
      ctx.moveTo(x - 10 * bird.size, y + wingFlap);
      ctx.lineTo(x, y);
      ctx.lineTo(x + 10 * bird.size, y + wingFlap);
      ctx.stroke();
    };

    const drawParticle = (particle: (typeof particles)[0]) => {
      particle.y -= particle.speed;
      particle.x += Math.sin(time * 0.001 + particle.windOffset) * 0.0002;

      if (particle.y < -0.1) {
        particle.y = 1.1;
        particle.x = Math.random();
      }

      const x = particle.x * canvas.width;
      const y = particle.y * canvas.height;

      ctx.beginPath();
      ctx.arc(x, y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(254, 243, 199, ${particle.opacity})`;
      ctx.fill();
    };

    const animate = () => {
      time++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawSky();
      drawClouds();
      drawSun();
      drawBeach();

      birds.forEach(drawBird);
      waves.forEach((wave, index) => drawWave(wave, index));
      particles.forEach(drawParticle);
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
