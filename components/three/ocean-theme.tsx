'use client';

import { useEffect, useRef } from 'react';
import { usePerformance } from '@/contexts/performance-context';

interface MousePosition {
  x: number;
  y: number;
  active: boolean;
}

interface ColorScheme {
  primary: string;
  secondary: string;
  glow: string;
}

export function OceanTheme() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const { quality, shouldReduceMotion } = usePerformance();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true,
    });
    
    // Early return if context is not available
    if (!ctx) return;
    
    // After this point, we know ctx is not null, so we assert it
    const context = ctx as CanvasRenderingContext2D;

    // High DPI support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    context.scale(dpr, dpr);

    const width = window.innerWidth;
    const height = window.innerHeight;

    let mouse: MousePosition = { x: width / 2, y: height / 2, active: false };
    let time = 0;

    // Adjust counts based on quality
    const counts = {
      fish: quality === 'low' ? 20 : quality === 'medium' ? 35 : 50,
      particles: quality === 'low' ? 50 : quality === 'medium' ? 125 : 200,
      bubbles: quality === 'low' ? 10 : quality === 'medium' ? 20 : 30,
      corals: quality === 'low' ? 4 : quality === 'medium' ? 6 : 8,
      rays: quality === 'low' ? 3 : 5,
    };

    // Premium color palette
    const colors = {
      ocean: ['#001440', '#003D7A', '#0066B3', '#0088CC', '#00B4D8'],
      fish: [
        { primary: '#FF006E', secondary: '#FF4081', glow: '#FF006E' },
        { primary: '#FB5607', secondary: '#FF8500', glow: '#FFAA00' },
        { primary: '#FFBE0B', secondary: '#FFEA00', glow: '#FFFF3F' },
        { primary: '#3A86FF', secondary: '#4EA8FF', glow: '#6FC3FF' },
        { primary: '#8338EC', secondary: '#B15EFF', glow: '#C77DFF' },
        { primary: '#06FFB4', secondary: '#00F5B8', glow: '#6FFFDD' },
        { primary: '#FF4365', secondary: '#FF6B89', glow: '#FF8FA3' },
      ],
      coral: ['#FF10F0', '#00FFFF', '#7FFF00', '#FF1493', '#00CED1'],
    };

    // Fish class
    class Fish {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      maxSpeed: number;
      colorScheme: ColorScheme;
      tailAnimation: number;
      finAnimation: number;
      glowIntensity: number;
      trail: Array<{ x: number; y: number; angle: number }>;
      maxTrailLength: number;
      personality: number;
      speedMultiplier: number;
      pattern: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = (Math.random() - 0.5) * 3;
        this.size = 12 + Math.random() * 18;
        this.maxSpeed = 2.5 + Math.random() * 1.5;
        this.colorScheme = colors.fish[Math.floor(Math.random() * colors.fish.length)];
        this.tailAnimation = 0;
        this.finAnimation = 0;
        this.glowIntensity = 0.5 + Math.random() * 0.5;
        this.trail = [];
        this.maxTrailLength = quality === 'low' ? 5 : quality === 'medium' ? 10 : 15;
        this.personality = Math.random();
        this.speedMultiplier = 0.8 + Math.random() * 0.4;
        this.pattern = ['stripes', 'spots', 'solid', 'gradient'][Math.floor(Math.random() * 4)];
      }

      update(fishArray: Fish[]): void {
        // Store trail
        this.trail.push({
          x: this.x,
          y: this.y,
          angle: Math.atan2(this.vy, this.vx),
        });
        if (this.trail.length > this.maxTrailLength) {
          this.trail.shift();
        }

        // Flocking behavior
        let avgX = 0, avgY = 0;
        let avgVx = 0, avgVy = 0;
        let separateX = 0, separateY = 0;
        let neighbors = 0;

        fishArray.forEach((other) => {
          if (other === this) return;

          const dx = other.x - this.x;
          const dy = other.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            avgX += other.x;
            avgY += other.y;
            avgVx += other.vx;
            avgVy += other.vy;
            neighbors++;

            if (dist < 35) {
              separateX -= dx / (dist + 0.1);
              separateY -= dy / (dist + 0.1);
            }
          }
        });

        if (neighbors > 0) {
          const alignmentForce = 0.05 * this.personality;
          const cohesionForce = 0.001 * (1 - this.personality);

          this.vx += (avgVx / neighbors - this.vx) * alignmentForce;
          this.vx += (avgX / neighbors - this.x) * cohesionForce;
          this.vy += (avgVy / neighbors - this.vy) * alignmentForce;
          this.vy += (avgY / neighbors - this.y) * cohesionForce;
        }

        this.vx += separateX * 0.08;
        this.vy += separateY * 0.08;

        // Mouse interaction
        if (mouse.active) {
          const mouseDx = mouse.x - this.x;
          const mouseDy = mouse.y - this.y;
          const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

          if (mouseDist < 150) {
            const force = Math.pow((150 - mouseDist) / 150, 2);
            this.vx -= (mouseDx / mouseDist) * force * 6;
            this.vy -= (mouseDy / mouseDist) * force * 6;
            this.glowIntensity = Math.min(1, this.glowIntensity + 0.02);
          }
        } else {
          this.glowIntensity = Math.max(0.5, this.glowIntensity - 0.01);
        }

        // Add wandering
        if (!shouldReduceMotion) {
          this.vx += (Math.random() - 0.5) * 0.1;
          this.vy += (Math.random() - 0.5) * 0.1;
        }

        // Speed limiting
        const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const targetSpeed = this.maxSpeed * this.speedMultiplier;
        if (currentSpeed > targetSpeed) {
          const dampening = 0.95;
          this.vx *= dampening;
          this.vy *= dampening;
        }

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Boundary behavior
        const margin = 100;
        const boundaryForce = 0.3;
        if (this.x < margin) {
          this.vx += boundaryForce * (1 - this.x / margin);
        }
        if (this.x > width - margin) {
          this.vx -= boundaryForce * (1 - (width - this.x) / margin);
        }
        if (this.y < margin) {
          this.vy += boundaryForce * (1 - this.y / margin);
        }
        if (this.y > height - margin) {
          this.vy -= boundaryForce * (1 - (height - this.y) / margin);
        }

        // Wrap around
        if (this.x < -50) this.x = width + 50;
        if (this.x > width + 50) this.x = -50;
        if (this.y < -50) this.y = height + 50;
        if (this.y > height + 50) this.y = -50;

        // Animate
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        this.tailAnimation += shouldReduceMotion ? 0.1 : 0.2 + speed * 0.05;
        this.finAnimation += shouldReduceMotion ? 0.08 : 0.15;
      }

      draw(ctx: CanvasRenderingContext2D): void {
        // Draw motion trail
        if (quality !== 'low' && this.trail.length > 1) {
          this.trail.forEach((point, i) => {
            if (i === 0) return;

            const alpha = (i / this.trail.length) * 0.3;
            const prevPoint = this.trail[i - 1];

            const gradient = ctx.createLinearGradient(prevPoint.x, prevPoint.y, point.x, point.y);
            gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
            gradient.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.5})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = this.size * 0.8 * (i / this.trail.length);
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(prevPoint.x, prevPoint.y);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
          });
        }

        ctx.save();
        ctx.translate(this.x, this.y);

        const angle = Math.atan2(this.vy, this.vx);
        ctx.rotate(angle);

        // Glow effect
        if (quality !== 'low') {
          const glowSize = this.size * 2.5 * this.glowIntensity;
          const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glowSize);
          glowGradient.addColorStop(0, this.colorScheme.glow + '40');
          glowGradient.addColorStop(0.5, this.colorScheme.glow + '20');
          glowGradient.addColorStop(1, 'transparent');
          ctx.fillStyle = glowGradient;
          ctx.fillRect(-glowSize, -glowSize, glowSize * 2, glowSize * 2);
        }

        // Fish body
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);

        const bodyGradient = ctx.createLinearGradient(-this.size, -this.size * 0.6, this.size, this.size * 0.6);
        bodyGradient.addColorStop(0, this.colorScheme.secondary);
        bodyGradient.addColorStop(0.5, this.colorScheme.primary);
        bodyGradient.addColorStop(1, this.colorScheme.secondary);
        ctx.fillStyle = bodyGradient;
        ctx.fill();

        // Tail
        const tailWave = Math.sin(this.tailAnimation) * 15;
        const tailSize = this.size * 0.8;

        ctx.beginPath();
        ctx.moveTo(-this.size * 0.8, 0);
        ctx.quadraticCurveTo(-this.size * 1.3, -tailSize + tailWave, -this.size * 2, -tailSize * 1.2 + tailWave);
        ctx.lineTo(-this.size * 1.8, tailWave);
        ctx.quadraticCurveTo(-this.size * 1.3, tailSize + tailWave, -this.size * 0.8, 0);

        const tailGradient = ctx.createLinearGradient(-this.size * 0.8, 0, -this.size * 2, 0);
        tailGradient.addColorStop(0, this.colorScheme.primary);
        tailGradient.addColorStop(1, this.colorScheme.secondary + '88');
        ctx.fillStyle = tailGradient;
        ctx.fill();

        // Eye
        const eyeX = this.size * 0.4;
        const eyeY = -this.size * 0.15;
        const eyeSize = this.size * 0.15;

        ctx.beginPath();
        ctx.arc(eyeX, eyeY, eyeSize, 0, Math.PI * 2);
        ctx.fillStyle = '#111';
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(eyeX + eyeSize * 0.3, eyeY - eyeSize * 0.3, eyeSize * 0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Particle class
    class Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      shimmer: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random();
        this.size = 0.5 + Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = -0.2 - Math.random() * 0.3;
        this.opacity = 0.2 + Math.random() * 0.4;
        this.shimmer = Math.random() * Math.PI * 2;
      }

      update(): void {
        this.x += this.speedX * (1 - this.z * 0.5);
        this.y += this.speedY * (1 - this.z * 0.5);
        this.shimmer += 0.05;

        if (this.y < -10) {
          this.y = height + 10;
          this.x = Math.random() * width;
        }
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
      }

      draw(ctx: CanvasRenderingContext2D): void {
        const shimmerIntensity = 0.5 + Math.sin(this.shimmer) * 0.5;
        const scale = 1 - this.z * 0.5;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * shimmerIntensity * scale})`;
        ctx.fill();
      }
    }

    // Bubble class
    class Bubble {
      x: number;
      y: number;
      size: number;
      speed: number;
      wobble: number;
      wobbleSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = height + 20;
        this.size = 2 + Math.random() * 6;
        this.speed = 1.5 + Math.random() * 2;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.05 + Math.random() * 0.05;
      }

      update(): void {
        this.y -= this.speed;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 1.5;

        this.speed += 0.01;

        if (this.y < height * 0.3) {
          this.size += 0.02;
        }

        if (this.y < -20) {
          this.y = height + 20;
          this.x = Math.random() * width;
          this.size = 2 + Math.random() * 6;
          this.speed = 1.5 + Math.random() * 2;
        }
      }

      draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        const bubbleGradient = ctx.createRadialGradient(
          this.x - this.size * 0.3,
          this.y - this.size * 0.3,
          0,
          this.x,
          this.y,
          this.size
        );
        bubbleGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        bubbleGradient.addColorStop(0.3, 'rgba(200, 230, 255, 0.4)');
        bubbleGradient.addColorStop(0.7, 'rgba(100, 200, 255, 0.2)');
        bubbleGradient.addColorStop(1, 'rgba(50, 150, 255, 0.1)');

        ctx.fillStyle = bubbleGradient;
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Highlight
        ctx.beginPath();
        ctx.arc(
          this.x - this.size * 0.3,
          this.y - this.size * 0.3,
          this.size * 0.2,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
      }
    }

    // Light ray class
    class LightRay {
      x: number;
      angle: number;
      width: number;
      phase: number;
      opacity: number;

      constructor(index: number) {
        this.x = (width / 5) * index + Math.random() * 100;
        this.angle = -Math.PI * 0.4 + (Math.random() - 0.5) * 0.2;
        this.width = 60 + Math.random() * 40;
        this.phase = Math.random() * Math.PI * 2;
        this.opacity = 0.1 + Math.random() * 0.15;
      }

      update(): void {
        this.phase += 0.002;
        this.x += Math.sin(this.phase) * 0.3;
      }

      draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        const length = height * 1.5;
        const wobble = Math.sin(this.phase) * 20;

        const gradient = ctx.createLinearGradient(
          this.x + wobble,
          -100,
          this.x + wobble + Math.cos(this.angle) * length,
          Math.sin(this.angle) * length + height
        );

        const intensity = 0.5 + Math.sin(this.phase * 2) * 0.3;
        gradient.addColorStop(0, `rgba(100, 200, 255, ${this.opacity * intensity})`);
        gradient.addColorStop(0.3, `rgba(50, 150, 255, ${this.opacity * intensity * 0.7})`);
        gradient.addColorStop(0.7, `rgba(0, 100, 200, ${this.opacity * intensity * 0.3})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(this.x + wobble - this.width / 2, 0);
        ctx.lineTo(this.x + wobble + this.width / 2, 0);
        ctx.lineTo(
          this.x + wobble + Math.cos(this.angle) * length + this.width,
          Math.sin(this.angle) * length + height
        );
        ctx.lineTo(
          this.x + wobble + Math.cos(this.angle) * length - this.width,
          Math.sin(this.angle) * length + height
        );
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }
    }

    // Coral class
    class Coral {
      x: number;
      y: number;
      branches: Array<{
        angle: number;
        length: number;
        segments: Array<{
          x: number;
          y: number;
          size: number;
          angleOffset: number;
        }>;
        thickness: number;
      }>;
      type: number;
      baseColor: string;
      size: number;
      swayPhase: number;
      glowPulse: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.branches = [];
        this.type = Math.floor(Math.random() * 3);
        this.baseColor = colors.coral[Math.floor(Math.random() * colors.coral.length)];
        this.size = 60 + Math.random() * 80;
        this.swayPhase = Math.random() * Math.PI * 2;
        this.glowPulse = Math.random() * Math.PI * 2;

        this.generateStructure();
      }

      generateStructure(): void {
        const branchCount = 8 + Math.floor(Math.random() * 12);

        for (let i = 0; i < branchCount; i++) {
          const angle = (Math.PI * 2 / branchCount) * i + (Math.random() - 0.5) * 0.5;
          const length = this.size * (0.6 + Math.random() * 0.6);

          const branch = {
            angle: angle,
            length: length,
            segments: [] as Array<{
              x: number;
              y: number;
              size: number;
              angleOffset: number;
            }>,
            thickness: 8 + Math.random() * 6,
          };

          const segmentCount = Math.floor(length / 8);
          for (let j = 0; j < segmentCount; j++) {
            branch.segments.push({
              x: 0,
              y: 0,
              size: (1 - j / segmentCount) * branch.thickness,
              angleOffset: (Math.random() - 0.5) * 0.3,
            });
          }

          this.branches.push(branch);
        }
      }

      update(): void {
        this.swayPhase += 0.01;
        this.glowPulse += 0.02;

        const sway = Math.sin(this.swayPhase) * 0.02;

        this.branches.forEach((branch) => {
          let currentAngle = branch.angle;
          let currentX = 0;
          let currentY = 0;

          branch.segments.forEach((segment, i) => {
            const distance = (i + 1) * (branch.length / branch.segments.length);
            currentAngle += segment.angleOffset + sway * i * 0.1;

            segment.x = currentX + Math.cos(currentAngle) * (distance / branch.segments.length);
            segment.y = currentY + Math.sin(currentAngle) * (distance / branch.segments.length);

            currentX = segment.x;
            currentY = segment.y;
          });
        });
      }

      draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.x, this.y);

        const glowIntensity = 0.7 + Math.sin(this.glowPulse) * 0.3;

        // Base glow
        if (quality !== 'low') {
          const baseGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 1.5);
          baseGlow.addColorStop(0, this.baseColor + '33');
          baseGlow.addColorStop(0.5, this.baseColor + '1A');
          baseGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = baseGlow;
          ctx.fillRect(-this.size * 1.5, -this.size * 1.5, this.size * 3, this.size * 3);
        }

        // Draw branches
        this.branches.forEach((branch) => {
          ctx.save();

          const lastSegment = branch.segments[branch.segments.length - 1];
          const branchGradient = ctx.createLinearGradient(0, 0, lastSegment.x, lastSegment.y);
          branchGradient.addColorStop(0, this.baseColor);
          branchGradient.addColorStop(0.7, this.baseColor + 'CC');
          branchGradient.addColorStop(1, this.baseColor + '66');

          ctx.beginPath();
          ctx.moveTo(0, 0);

          branch.segments.forEach((segment, i) => {
            if (i === 0) {
              ctx.lineTo(segment.x, segment.y);
            } else {
              const prev = branch.segments[i - 1];
              const cp1x = prev.x + (segment.x - prev.x) * 0.5;
              const cp1y = prev.y + (segment.y - prev.y) * 0.5;
              ctx.quadraticCurveTo(cp1x, cp1y, segment.x, segment.y);
            }
          });

          ctx.strokeStyle = branchGradient;
          ctx.lineWidth = branch.thickness;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Polyps
          if (quality !== 'low' && (this.type === 0 || this.type === 2)) {
            branch.segments.forEach((segment, i) => {
              if (i % 3 === 0) {
                const polypSize = segment.size * 0.5;
                const polypGlow = ctx.createRadialGradient(
                  segment.x,
                  segment.y,
                  0,
                  segment.x,
                  segment.y,
                  polypSize * 2
                );
                const alphaHex = Math.floor(glowIntensity * 255).toString(16).padStart(2, '0');
                polypGlow.addColorStop(0, '#FFFFFF' + alphaHex);
                polypGlow.addColorStop(0.5, this.baseColor + '88');
                polypGlow.addColorStop(1, 'transparent');

                ctx.fillStyle = polypGlow;
                ctx.beginPath();
                ctx.arc(segment.x, segment.y, polypSize, 0, Math.PI * 2);
                ctx.fill();
              }
            });
          }

          ctx.restore();
        });

        // Center core
        const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 0.3);
        coreGradient.addColorStop(0, this.baseColor);
        coreGradient.addColorStop(0.5, this.baseColor + 'DD');
        coreGradient.addColorStop(1, this.baseColor + '88');
        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Initialize entities
    const fish: Fish[] = [];
    const particles: Particle[] = [];
    const bubbles: Bubble[] = [];
    const rays: LightRay[] = [];
    const corals: Coral[] = [];

    for (let i = 0; i < counts.fish; i++) {
      fish.push(new Fish());
    }

    for (let i = 0; i < counts.particles; i++) {
      particles.push(new Particle());
    }

    for (let i = 0; i < counts.bubbles; i++) {
      bubbles.push(new Bubble());
    }

    for (let i = 0; i < counts.rays; i++) {
      rays.push(new LightRay(i));
    }

    const coralCount = counts.corals;
    for (let i = 0; i < coralCount; i++) {
      const x = 100 + (width - 200) * (i / (coralCount - 1));
      const y = height - 50 - Math.random() * 150;
      corals.push(new Coral(x, y));
    }

    // Caustic light animation
    function drawCaustics(context: CanvasRenderingContext2D): void {
      context.save();
      context.globalCompositeOperation = 'overlay';

      for (let i = 0; i < 15; i++) {
        const x = (Math.sin(time * 0.001 + i * 0.5) + 1) * width * 0.5;
        const y = (Math.cos(time * 0.0008 + i * 0.7) + 1) * height * 0.5;
        const size = 60 + Math.sin(time * 0.002 + i) * 30;

        const causticGradient = context.createRadialGradient(x, y, 0, x, y, size);
        causticGradient.addColorStop(0, 'rgba(100, 255, 255, 0.3)');
        causticGradient.addColorStop(0.4, 'rgba(50, 200, 255, 0.15)');
        causticGradient.addColorStop(0.7, 'rgba(0, 150, 255, 0.05)');
        causticGradient.addColorStop(1, 'transparent');

        context.fillStyle = causticGradient;
        context.fillRect(x - size, y - size, size * 2, size * 2);
      }

      context.restore();
    }

    // Main animation loop
    function animate() {
      // Background gradient
      const bgGradient = context.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, '#001440');
      bgGradient.addColorStop(0.2, '#003D7A');
      bgGradient.addColorStop(0.5, '#0066B3');
      bgGradient.addColorStop(0.8, '#003D7A');
      bgGradient.addColorStop(1, '#001440');
      context.fillStyle = bgGradient;
      context.fillRect(0, 0, width, height);

      // Draw light rays
      rays.forEach((ray) => {
        ray.update();
        ray.draw(context);
      });

      // Draw caustic lighting
      if (quality !== 'low') {
        drawCaustics(context);
      }

      // Draw corals
      corals.forEach((coral) => {
        coral.update();
        coral.draw(context);
      });

      // Draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw(context);
      });

      // Draw bubbles
      bubbles.forEach((bubble) => {
        bubble.update();
        bubble.draw(context);
      });

      // Draw fish
      fish.forEach((f) => {
        f.update(fish);
        f.draw(context);
      });

      // Vignette
      const vignette = context.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7
      );
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(0.7, 'transparent');
      vignette.addColorStop(1, 'rgba(0, 20, 64, 0.3)');
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);

      time++;
      animationRef.current = requestAnimationFrame(animate);
    }

    // Event handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      mouse.x = touch.clientX;
      mouse.y = touch.clientY;
      mouse.active = true;
    };

    const handleTouchEnd = () => {
      mouse.active = false;
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      context.scale(dpr, dpr);
    };

    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, [quality, shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 block h-full w-full"
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
}