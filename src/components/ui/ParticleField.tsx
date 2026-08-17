import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

type Particle = { x: number; y: number; r: number; vx: number; vy: number; a: number; phase: number };

const COUNT_DESKTOP = 46;
const COUNT_MOBILE = 20;

/**
 * The hero's drifting light motes.
 *
 * Deliberately 2D canvas rather than Three.js / R3F: this is a handful of
 * blurred dots on a dark field, and a WebGL runtime would add ~150KB of
 * JavaScript plus a GPU context to render something a few draw calls handle.
 * The visual result is identical; the performance budget is not.
 *
 * The loop pauses whenever the hero scrolls out of view or the tab is hidden,
 * and never starts at all under `prefers-reduced-motion`.
 */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let running = true;
    let t = 0;

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const seed = () => {
      const count = width < 768 ? COUNT_MOBILE : COUNT_DESKTOP;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 1.9,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.05 - Math.random() * 0.14,
        a: 0.14 + Math.random() * 0.34,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr());
      canvas.height = Math.floor(height * dpr());
      ctx.setTransform(dpr(), 0, 0, dpr(), 0, 0);
      seed();
    };

    const render = () => {
      if (!running) return;
      t += 0.006;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // A slow sine on x keeps the drift organic without a noise field.
        p.x += p.vx + Math.sin(t + p.phase) * 0.12;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const twinkle = 0.72 + Math.sin(t * 2.2 + p.phase) * 0.28;
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        glow.addColorStop(0, `rgba(217, 180, 121, ${(p.a * twinkle).toFixed(3)})`);
        glow.addColorStop(1, 'rgba(217, 180, 121, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(render);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(render);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    resize();
    frame = requestAnimationFrame(render);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Stop burning frames once the hero is scrolled past.
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
      threshold: 0,
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
