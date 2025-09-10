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
  const mouseRef = useRef({ x: 0, y: 0 });
  const { quality, shouldReduceMotion } = usePerformance();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
      willReadFrequently: false,
    });
    if (!ctx) return;

    let canvasWidth = 0;
    let canvasHeight = 0;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');
    const fontSize = quality === 'low' ? 20 : quality === 'medium' ? 18 : 16;
    const columnWidth = fontSize * 1.5;

    function initializeMatrix() {
      const numColumns = Math.ceil(canvasWidth / columnWidth);
      const maxCharsPerColumn = Math.ceil(canvasHeight / fontSize / 2);
      columnsRef.current = [];

      for (let i = 0; i < numColumns; i++) {
        if (Math.random() > 0.3) {
          columnsRef.current[i] = [];
          const columnDelay = Math.random() * 200;

          for (let j = 0; j < maxCharsPerColumn; j++) {
            columnsRef.current[i][j] = {
              x: i * columnWidth,
              y: -fontSize * (j * 2 + columnDelay),
              speed: shouldReduceMotion ? 0.3 : 0.5 + Math.random() * 0.8,
              opacity: 1,
              char: charArray[Math.floor(Math.random() * charArray.length)],
              fontSize: fontSize,
              changeCounter: 0,
            };
          }
        } else {
          columnsRef.current[i] = [];
        }
      }
    }

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvasWidth = rect.width;
      canvasHeight = rect.height;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      
      if (canvasWidth > 0 && canvasHeight > 0) {
        initializeMatrix();
      }
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

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      columnsRef.current.forEach((column) => {
        if (column.length === 0) return;
        
        column.forEach((char, charIndex) => {
          char.y += char.speed;
          char.changeCounter++;

          if (char.changeCounter > 8) {
            char.char = charArray[Math.floor(Math.random() * charArray.length)];
            char.changeCounter = 0;
          }

          if (char.y > canvasHeight + fontSize) {
            char.y = -fontSize * Math.random() * 20;
            char.speed = shouldReduceMotion ? 0.3 : 0.5 + Math.random() * 0.8;
          }

          const distanceFromMouse = Math.sqrt(
            Math.pow(char.x - mouseRef.current.x, 2) +
            Math.pow(char.y - mouseRef.current.y, 2)
          );

          let brightness = 1;
          if (distanceFromMouse < 100) {
            brightness = 1 + (100 - distanceFromMouse) / 100;
          }

          const isHead = charIndex === column.length - 1;
          
          ctx.font = `${char.fontSize}px monospace`;
          
          if (isHead) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#00ff00';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(char.char, char.x, char.y);
            ctx.shadowBlur = 0;
          } else {
            const fade = Math.max(0, 1 - (charIndex / column.length) * 0.7);
            const green = Math.floor(255 * fade * brightness);
            ctx.fillStyle = `rgb(0, ${green}, 0)`;
            ctx.fillText(char.char, char.x, char.y);
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    if (canvasWidth > 0 && canvasHeight > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [quality, shouldReduceMotion]);

  return (
    <div className="absolute inset-0 bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}