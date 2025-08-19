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

      const earthGradient = ctx.createRadialGradient(
        -earth.radius * 0.3,
        -earth.radius * 0.3,
        0,
        0,
        0,
        earth.radius
      );
      earthGradient.addColorStop(0, '#5eb3ff'); // Light blue
      earthGradient.addColorStop(0.6, '#2288dd'); // Ocean blue
      earthGradient.addColorStop(1, '#0044aa'); // Deep ocean

      // Earth base circle
      ctx.beginPath();
      ctx.arc(0, 0, earth.radius, 0, Math.PI * 2);
      ctx.fillStyle = earthGradient;
      ctx.fill();
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, earth.radius - 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.save();

      const mapWidth = earth.radius * 4 * Math.PI;
      const offset = (earth.rotation / (Math.PI * 2)) * mapWidth;
      const scale = earth.radius / 150;

      for (let i = 0; i < 2; i++) {
        const xOffset = i * mapWidth - offset;

        ctx.fillStyle = '#3a7e3a';

        // Africa
        ctx.save();
        ctx.translate(xOffset + mapWidth * 0.05, 0);
        ctx.scale(scale, scale);
        ctx.beginPath();
        ctx.moveTo(0, -50);
        ctx.quadraticCurveTo(15, -45, 20, -35);
        ctx.quadraticCurveTo(25, -20, 30, -5);
        ctx.quadraticCurveTo(35, 10, 25, 25);
        ctx.quadraticCurveTo(20, 35, 15, 45);
        ctx.lineTo(10, 55);
        ctx.quadraticCurveTo(5, 50, 0, 45);
        ctx.quadraticCurveTo(-10, 35, -15, 20);
        ctx.quadraticCurveTo(-20, 5, -25, -10);
        ctx.quadraticCurveTo(-20, -30, -10, -40);
        ctx.quadraticCurveTo(-5, -48, 0, -50);
        ctx.closePath();
        ctx.fill();

        // Madagascar
        ctx.beginPath();
        ctx.ellipse(35, 25, 5, 12, 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Europe
        ctx.save();
        ctx.translate(xOffset + mapWidth * 0.03, -50);
        ctx.scale(scale, scale);
        ctx.beginPath();
        ctx.moveTo(-10, 0);
        ctx.quadraticCurveTo(-5, -5, 0, -8);
        ctx.quadraticCurveTo(10, -10, 20, -8);
        ctx.quadraticCurveTo(25, -5, 30, 0);
        ctx.quadraticCurveTo(25, 5, 20, 8);
        ctx.quadraticCurveTo(15, 10, 10, 12);
        ctx.quadraticCurveTo(0, 15, -5, 10);
        ctx.quadraticCurveTo(-10, 5, -10, 0);
        ctx.closePath();
        ctx.fill();

        // UK
        ctx.beginPath();
        ctx.ellipse(-12, -5, 3, 6, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Asia
        ctx.save();
        ctx.translate(xOffset + mapWidth * 0.25, -20);
        ctx.scale(scale, scale);
        ctx.beginPath();
        ctx.moveTo(-40, -20);
        ctx.quadraticCurveTo(-20, -30, 0, -35);
        ctx.quadraticCurveTo(30, -30, 50, -25);
        ctx.quadraticCurveTo(60, -20, 65, -10);
        ctx.quadraticCurveTo(70, 0, 65, 10);
        ctx.quadraticCurveTo(60, 20, 50, 25);
        ctx.quadraticCurveTo(40, 30, 30, 35);
        // India
        ctx.quadraticCurveTo(20, 40, 15, 50);
        ctx.lineTo(10, 55);
        ctx.quadraticCurveTo(5, 50, 0, 45);
        // Southeast Asia
        ctx.quadraticCurveTo(-10, 40, -20, 35);
        ctx.quadraticCurveTo(-30, 25, -35, 15);
        ctx.quadraticCurveTo(-40, 0, -40, -20);
        ctx.closePath();
        ctx.fill();

        // Japan
        ctx.beginPath();
        ctx.ellipse(75, -5, 4, 15, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Australia (longitude 135°E)
        ctx.save();
        ctx.translate(xOffset + mapWidth * 0.37, 30);
        ctx.scale(scale, scale);
        ctx.beginPath();
        ctx.moveTo(-20, 0);
        ctx.quadraticCurveTo(-15, -10, -5, -12);
        ctx.quadraticCurveTo(5, -10, 15, -8);
        ctx.quadraticCurveTo(25, -5, 30, 0);
        ctx.quadraticCurveTo(25, 10, 20, 15);
        ctx.quadraticCurveTo(10, 20, 0, 18);
        ctx.quadraticCurveTo(-10, 15, -20, 10);
        ctx.quadraticCurveTo(-25, 5, -20, 0);
        ctx.closePath();
        ctx.fill();

        // New Zealand
        ctx.beginPath();
        ctx.ellipse(40, 10, 3, 8, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // South America
        ctx.save();
        ctx.translate(xOffset + mapWidth * 0.8, 10);
        ctx.scale(scale, scale);
        ctx.beginPath();
        ctx.moveTo(0, -30);
        ctx.quadraticCurveTo(8, -25, 10, -15);
        ctx.quadraticCurveTo(12, -5, 10, 5);
        ctx.quadraticCurveTo(8, 15, 5, 25);
        ctx.quadraticCurveTo(3, 35, 0, 45);
        ctx.lineTo(-2, 55);
        ctx.lineTo(-5, 50);
        ctx.quadraticCurveTo(-8, 40, -10, 30);
        ctx.quadraticCurveTo(-12, 20, -15, 10);
        ctx.quadraticCurveTo(-18, 0, -20, -10);
        ctx.quadraticCurveTo(-18, -20, -15, -25);
        ctx.quadraticCurveTo(-10, -30, 0, -30);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // North America
        ctx.save();
        ctx.translate(xOffset + mapWidth * 0.72, -35);
        ctx.scale(scale, scale);
        ctx.beginPath();
        ctx.moveTo(-30, 20);
        ctx.quadraticCurveTo(-25, 10, -20, 5);
        ctx.quadraticCurveTo(-10, 0, 0, -5);
        ctx.quadraticCurveTo(10, -8, 20, -10);
        ctx.quadraticCurveTo(30, -8, 35, -5);
        // Alaska
        ctx.quadraticCurveTo(40, -15, 35, -20);
        ctx.quadraticCurveTo(30, -25, 25, -20);
        // Canada
        ctx.quadraticCurveTo(20, -25, 10, -30);
        ctx.quadraticCurveTo(0, -35, -10, -30);
        ctx.quadraticCurveTo(-20, -25, -25, -20);
        ctx.quadraticCurveTo(-30, -10, -35, 0);
        ctx.quadraticCurveTo(-35, 10, -30, 20);
        ctx.closePath();
        ctx.fill();

        // Central America
        ctx.beginPath();
        ctx.moveTo(-20, 20);
        ctx.quadraticCurveTo(-15, 25, -10, 30);
        ctx.quadraticCurveTo(-5, 35, 0, 30);
        ctx.lineTo(-5, 20);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Greenland
        ctx.save();
        ctx.translate(xOffset + mapWidth * 0.9, -65);
        ctx.scale(scale, scale);
        ctx.fillStyle = '#e8e8e8';
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.quadraticCurveTo(8, -8, 10, 0);
        ctx.quadraticCurveTo(8, 10, 5, 15);
        ctx.quadraticCurveTo(0, 20, -5, 15);
        ctx.quadraticCurveTo(-8, 10, -10, 0);
        ctx.quadraticCurveTo(-8, -8, 0, -10);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // Antarctica
      ctx.fillStyle = '#f0f0f0';
      ctx.beginPath();
      const antarcticY = earth.radius - 20;
      ctx.moveTo(-earth.radius * 0.8, antarcticY);
      ctx.quadraticCurveTo(
        -earth.radius * 0.4,
        antarcticY - 5,
        0,
        antarcticY - 8
      );
      ctx.quadraticCurveTo(
        earth.radius * 0.4,
        antarcticY - 5,
        earth.radius * 0.8,
        antarcticY
      );
      ctx.quadraticCurveTo(
        earth.radius * 0.6,
        antarcticY + 10,
        earth.radius * 0.3,
        antarcticY + 15
      );
      ctx.quadraticCurveTo(
        0,
        antarcticY + 20,
        -earth.radius * 0.3,
        antarcticY + 15
      );
      ctx.quadraticCurveTo(
        -earth.radius * 0.6,
        antarcticY + 10,
        -earth.radius * 0.8,
        antarcticY
      );
      ctx.closePath();
      ctx.fill();

      // Arctic ice
      ctx.beginPath();
      const arcticY = -earth.radius + 15;
      ctx.moveTo(0, arcticY);
      ctx.quadraticCurveTo(
        earth.radius * 0.3,
        arcticY + 5,
        earth.radius * 0.5,
        arcticY + 10
      );
      ctx.quadraticCurveTo(earth.radius * 0.3, arcticY + 15, 0, arcticY + 12);
      ctx.quadraticCurveTo(
        -earth.radius * 0.3,
        arcticY + 15,
        -earth.radius * 0.5,
        arcticY + 10
      );
      ctx.quadraticCurveTo(-earth.radius * 0.3, arcticY + 5, 0, arcticY);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < 4; i++) {
        const cloudTime = time * 0.0001 + i;
        const cloudY = Math.sin(i * 1.5) * earth.radius * 0.6;
        const cloudX = Math.cos(cloudTime) * earth.radius * 0.8;

        ctx.beginPath();
        ctx.moveTo(cloudX - 50, cloudY);
        ctx.quadraticCurveTo(cloudX, cloudY - 5, cloudX + 50, cloudY);
        ctx.stroke();
      }

      ctx.restore();

      const shadingGradient = ctx.createRadialGradient(
        earth.radius * 0.3,
        -earth.radius * 0.3,
        0,
        0,
        0,
        earth.radius * 1.2
      );
      shadingGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      shadingGradient.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
      shadingGradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');

      ctx.beginPath();
      ctx.arc(0, 0, earth.radius, 0, Math.PI * 2);
      ctx.fillStyle = shadingGradient;
      ctx.fill();

      ctx.restore();

      const atmosGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        earth.radius,
        centerX,
        centerY,
        earth.radius * 1.15
      );
      atmosGradient.addColorStop(0, 'rgba(135, 206, 235, 0.2)');
      atmosGradient.addColorStop(1, 'rgba(135, 206, 235, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, earth.radius * 1.15, 0, Math.PI * 2);
      ctx.fillStyle = atmosGradient;
      ctx.fill();
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
        ctx.beginPath();
        ctx.arc(objX, objY, obj.size, 0, Math.PI * 2);
        ctx.fillStyle = obj.color;
        ctx.fill();

        obj.angle += obj.speed;
      });
    };

    const animate = () => {
      time++;

      earth.rotation += 0.003; // Rotation speed
      satellite.angle += 0.003;

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
