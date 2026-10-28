'use client';

import React, { useEffect, useRef } from 'react';
import styles from './NeuralMeshCanvas.module.scss';

interface GlyphParticle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  baseColor: string;
  glowColor: string;
  baseAlpha: number;
  glowAlpha: number;
}

interface ClickRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
}

const GLYPH_CHARS = ['0', '1', '+', '·', '×', '—', '>', '<', '{', '}', '/', '_', '$', '#', '%', '░', ':'];
const ACCENT_COLORS = ['#35D7F2', '#8D72FF', '#F04452', '#35D7F2'];

export const NeuralMeshCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Grid configuration
    const spacingX = 42;
    const spacingY = 42;
    let particles: GlyphParticle[] = [];
    const ripples: ClickRipple[] = [];

    const mouse = {
      x: -2000,
      y: -2000,
      radius: 190,
      active: false
    };

    const initGrid = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      particles = [];
      const cols = Math.ceil(width / spacingX) + 1;
      const rows = Math.ceil(height / spacingY) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = c * spacingX + (r % 2 === 0 ? 0 : spacingX * 0.5);
          const originY = r * spacingY;
          const char = GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)];
          const glowColor = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];

          particles.push({
            originX,
            originY,
            x: originX + (Math.random() - 0.5) * 4,
            y: originY + (Math.random() - 0.5) * 4,
            vx: 0,
            vy: 0,
            char,
            baseColor: '#9295A2',
            glowColor,
            baseAlpha: 0.11 + Math.random() * 0.07,
            glowAlpha: 0
          });
        }
      }
    };

    initGrid();

    const handleResize = () => {
      initGrid();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -2000;
      mouse.y = -2000;
    };

    const handleClick = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 380,
        strength: 14
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Process ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 8.5;
        rip.strength *= 0.95;
        if (rip.radius > rip.maxRadius || rip.strength < 0.2) {
          ripples.splice(r, 1);
        }
      }

      ctx.font = '11px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const spring = 0.055;
      const damping = 0.86;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ambient mutation (cybernetic glyph shift)
        if (!prefersReducedMotion && Math.random() < 0.0016) {
          p.char = GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)];
        }

        // Mouse scatter force
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 7.5;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;
            p.glowAlpha = Math.min(p.glowAlpha + 0.6, 1);
          }
        }

        // Ripple wave scatter force
        for (let r = 0; r < ripples.length; r++) {
          const rip = ripples[r];
          const dx = p.x - rip.x;
          const dy = p.y - rip.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const diff = Math.abs(dist - rip.radius);

          if (diff < 45 && dist > 0) {
            const force = (1 - diff / 45) * (rip.strength * 0.6);
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;
            p.glowAlpha = Math.min(p.glowAlpha + 0.8, 1);
          }
        }

        if (!prefersReducedMotion) {
          // Spring force towards origin
          const ox = p.originX - p.x;
          const oy = p.originY - p.y;
          p.vx += ox * spring;
          p.vy += oy * spring;
          p.vx *= damping;
          p.vy *= damping;
          p.x += p.vx;
          p.y += p.vy;

          p.glowAlpha *= 0.94;
        }

        // Draw character
        const currentAlpha = Math.min(p.baseAlpha + p.glowAlpha * 0.75, 0.95);
        ctx.fillStyle = p.glowAlpha > 0.15 ? p.glowColor : p.baseColor;
        ctx.globalAlpha = currentAlpha;
        ctx.fillText(p.char, p.x, p.y);
      }

      ctx.globalAlpha = 1;

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={styles.canvasContainer} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.vignette} />
    </div>
  );
};
