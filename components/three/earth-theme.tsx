'use client';

import { useEffect, useRef } from 'react';

export function EarthTheme() {
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

    const earth = {
      x: 0.5,
      y: 0.5,
      radius: 150,
      rotation: 0,
    };

    const satellite = {
      angle: 0,
      distance: 200,
      size: 8,
    };

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2 + 0.5,
      brightness: Math.random(),
    }));

    const spaceObjects = Array.from({ length: 5 }, (_, i) => ({
      angle: Math.random() * Math.PI * 2,
      distance: 250 + i * 30,
      speed: 0.0002 + Math.random() * 0.0003,
      size: 5 + Math.random() * 5,
      color: ['#fbbf24', '#60a5fa', '#f87171', '#34d399', '#e879f9'][i],
    }));

    const drawSpace = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(
          star.x * canvas.width,
          star.y * canvas.height,
          star.size,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + star.brightness * 0.5})`;
        ctx.fill();
      });
    };

    const drawEarth = () => {
      const centerX = earth.x * canvas.width;
      const centerY = earth.y * canvas.height;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(earth.rotation);

      const earthGradient = ctx.createRadialGradient(
        -earth.radius * 0.3,
        -earth.radius * 0.3,
        0,
        0,
        0,
        earth.radius
      );
      earthGradient.addColorStop(0, '#4da6ff'); // Light blue
      earthGradient.addColorStop(0.7, '#0066cc'); // Ocean blue
      earthGradient.addColorStop(1, '#003d7a'); // Deep ocean

      // Earth base
      ctx.beginPath();
      ctx.arc(0, 0, earth.radius, 0, Math.PI * 2);
      ctx.fillStyle = earthGradient;
      ctx.fill();

      ctx.fillStyle = '#2d5016';

      // Africa/Europe
      ctx.beginPath();
      ctx.ellipse(20, -10, 40, 60, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Americas
      ctx.beginPath();
      ctx.ellipse(-60, 0, 30, 70, -0.3, 0, Math.PI * 2);
      ctx.fill();

      // Asia
      ctx.beginPath();
      ctx.ellipse(70, -20, 50, 40, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Australia
      ctx.beginPath();
      ctx.ellipse(60, 60, 25, 20, 0, 0, Math.PI * 2);
      ctx.fill();

      // Ice caps
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

      // North pole
      ctx.beginPath();
      ctx.arc(0, -earth.radius + 10, 30, 0, Math.PI * 2);
      ctx.fill();

      // South pole
      ctx.beginPath();
      ctx.arc(0, earth.radius - 10, 35, 0, Math.PI * 2);
      ctx.fill();

      // Cloud layer
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      for (let i = 0; i < 8; i++) {
        const cloudX = Math.cos(i * 0.8 + time * 0.0002) * earth.radius * 0.7;
        const cloudY = Math.sin(i * 0.8) * earth.radius * 0.6;
        ctx.beginPath();
        ctx.ellipse(cloudX, cloudY, 30, 15, i, 0, Math.PI * 2);
        ctx.fill();
      }

      // Atmosphere glow
      const atmosGradient = ctx.createRadialGradient(
        0,
        0,
        earth.radius,
        0,
        0,
        earth.radius * 1.2
      );
      atmosGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      atmosGradient.addColorStop(0.8, 'rgba(0, 0, 0, 0)');
      atmosGradient.addColorStop(1, 'rgba(100, 200, 255, 0.3)');

      ctx.beginPath();
      ctx.arc(0, 0, earth.radius * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = atmosGradient;
      ctx.fill();

      ctx.restore();
    };

    const drawSatellite = () => {
      const centerX = earth.x * canvas.width;
      const centerY = earth.y * canvas.height;

      const satX = centerX + Math.cos(satellite.angle) * satellite.distance;
      const satY =
        centerY + Math.sin(satellite.angle) * satellite.distance * 0.6; // Elliptical orbit

      ctx.save();
      ctx.translate(satX, satY);
      ctx.rotate(satellite.angle);

      // Satellite body
      ctx.fillStyle = '#c0c0c0';
      ctx.fillRect(
        -satellite.size / 2,
        -satellite.size / 4,
        satellite.size,
        satellite.size / 2
      );

      // Solar panels
      ctx.fillStyle = '#1a365d';
      ctx.fillRect(-satellite.size * 1.5, -2, satellite.size, 4);
      ctx.fillRect(satellite.size / 2, -2, satellite.size, 4);

      // Antenna
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -satellite.size / 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -satellite.size / 2, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#ff0000';
      ctx.fill();

      ctx.restore();
    };

    const drawSpaceObjects = () => {
      const centerX = earth.x * canvas.width;
      const centerY = earth.y * canvas.height;

      spaceObjects.forEach((obj) => {
        const objX = centerX + Math.cos(obj.angle) * obj.distance;
        const objY = centerY + Math.sin(obj.angle) * obj.distance;

        // Object glow
        const glowGradient = ctx.createRadialGradient(
          objX,
          objY,
          0,
          objX,
          objY,
          obj.size * 2
        );
        glowGradient.addColorStop(0, obj.color + '40');
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(objX, objY, obj.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Object core
        ctx.beginPath();
        ctx.arc(objX, objY, obj.size, 0, Math.PI * 2);
        ctx.fillStyle = obj.color;
        ctx.fill();

        obj.angle += obj.speed;
      });
    };

    const animate = () => {
      time++;

      earth.rotation += 0.002;
      satellite.angle += 0.005;
      stars.forEach((star) => {
        star.brightness = 0.5 + Math.sin(time * 0.01 + star.x * 10) * 0.5;
      });

      drawSpace();
      drawSpaceObjects();
      drawEarth();
      drawSatellite();

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
