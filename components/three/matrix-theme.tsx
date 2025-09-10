'use client';

import { useEffect, useRef } from 'react';
import { usePerformance } from '@/contexts/performance-context';

interface MatrixChar {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  char: string;
  fontSize: number;
  changeCounter: number;
}

export function MatrixTheme() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const columnsRef = useRef<MatrixChar[][]>([]);
  const lastFrameTime = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { quality, shouldReduceMotion } = usePerformance();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true,
      willReadFrequently: false,
    });
    if (!ctx) return;

    let canvasWidth = 0;
    let canvasHeight = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvasWidth = rect.width;
      canvasHeight = rect.height;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      initializeMatrix();
    };

    const handleResize = () => {
      resizeCanvas();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    resizeCanvas();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');

    const fontSize = quality === 'low' ? 16 : quality === 'medium' ? 14 : 12;
    const columnWidth = fontSize;
    const maxCharsPerColumn = Math.ceil(canvasHeight / fontSize) + 1;

    function initializeMatrix() {
      const numColumns = Math.ceil(canvasWidth / columnWidth);
      columnsRef.current = [];

      for (let i = 0; i < numColumns; i++) {
        columnsRef.current[i] = [];
        const columnDelay = Math.random() * 100;

        for (let j = 0; j < maxCharsPerColumn; j++) {
          columnsRef.current[i][j] = {
            x: i * columnWidth,
            y: -fontSize * (j + columnDelay),
            speed: shouldReduceMotion ? 0.5 : 0.3 + Math.random() * 0.7,
            opacity: 1,
            char: charArray[Math.floor(Math.random() * charArray.length)],
            fontSize: fontSize,
            changeCounter: 0,
          };
        }
      }
    }

    initializeMatrix();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastFrameTime.current;
      const targetFrameTime = quality === 'low' ? 50 : quality === 'medium' ? 33 : 16;

      if (deltaTime >= targetFrameTime) {
        lastFrameTime.current = currentTime;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        columnsRef.current.forEach((column) => {
          column.forEach((char, charIndex) => {
            char.y += char.speed * (shouldReduceMotion ? 0.5 : 1);
            char.changeCounter++;

            if (char.changeCounter > 5) {
              char.char = charArray[Math.floor(Math.random() * charArray.length)];
              char.changeCounter = 0;
            }

            if (char.y > canvasHeight + fontSize) {
              char.y = -fontSize;
              char.speed = shouldReduceMotion ? 0.5 : 0.3 + Math.random() * 0.7;
            }

            const distanceFromMouse = Math.sqrt(
              Math.pow(char.x - mouseRef.current.x, 2) +
              Math.pow(char.y - mouseRef.current.y, 2)
            );

            let brightness = 1;
            if (distanceFromMouse < 100) {
              brightness = 1 + (100 - distanceFromMouse) / 100;
            }

            const isHead = charIndex === column.length - 1 || 
                          (charIndex < column.length - 1 && column[charIndex + 1].y < char.y - fontSize * 2);
            
            if (isHead) {
              ctx.shadowBlur = 20;
              ctx.shadowColor = '#00ff00';
              ctx.fillStyle = '#ffffff';
            } else {
              ctx.shadowBlur = 0;
              const fade = Math.max(0, 1 - (charIndex / column.length) * 0.8);
              const green = Math.floor(255 * fade * brightness);
              ctx.fillStyle = `rgb(0, ${green}, 0)`;
            }

            ctx.font = `${char.fontSize}px monospace`;
            ctx.fillText(char.char, char.x, char.y);

            if (quality === 'high' && isHead) {
              ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
              ctx.fillText(char.char, char.x, char.y);
            }
          });
        });

        if (quality !== 'low') {
          const glitchChance = Math.random();
          if (glitchChance < 0.001) {
            ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
            ctx.fillRect(0, Math.random() * canvasHeight, canvasWidth, 2);
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [quality, shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 block h-full w-full"
      style={{
        width: '100%',
        height: '100%',
        background: '#000000',
      }}
    />
  );
}