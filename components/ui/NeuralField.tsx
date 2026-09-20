"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Node3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

interface NeuralFieldProps {
  className?: string;
  /** Cuántos nodos. Menos en móvil por batería. */
  density?: number;
  /** Opacidad global del canvas. */
  opacity?: number;
}

/**
 * Malla 3D animada: nodos flotando en un volumen, proyectados con perspectiva
 * y unidos por líneas cuando están cerca. Da la lectura "red neuronal / datos"
 * sin cargar una librería 3D (three.js pesa ~150 KB; esto son ~2 KB).
 *
 * Decisiones de rendimiento, porque un fondo animado no puede costarle la
 * batería a nadie:
 *  - se detiene cuando la sección sale de pantalla o la pestaña se oculta,
 *  - baja la densidad en pantallas chicas,
 *  - con `prefers-reduced-motion` dibuja un solo frame estático.
 */
export function NeuralField({
  className,
  density = 46,
  opacity = 0.55,
}: NeuralFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    const isSmall = window.innerWidth < 768;
    const count = Math.round(isSmall ? density * 0.5 : density);

    const nodes: Node3D[] = Array.from({ length: count }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random() * 2 - 1,
      vx: (Math.random() - 0.5) * 0.0011,
      vy: (Math.random() - 0.5) * 0.0011,
      vz: (Math.random() - 0.5) * 0.0011,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    let angle = 0;
    // Hacia dónde apunta el cursor (-0.5…0.5) y valor suavizado que seguimos.
    let targetYaw = 0;
    let targetPitch = 0;
    let yaw = 0;
    let pitch = 0;

    /** Proyección en perspectiva de un punto del cubo unitario al canvas. */
    const project = (n: Node3D) => {
      // Giro propio + el aporte del cursor, sobre el eje Y.
      const a = angle + yaw;
      const cosA = Math.cos(a);
      const sinA = Math.sin(a);
      const rx = n.x * cosA - n.z * sinA;
      let rz = n.x * sinA + n.z * cosA;

      // Inclinación vertical según el cursor, sobre el eje X.
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const ry = n.y * cosP - rz * sinP;
      rz = n.y * sinP + rz * cosP;

      const fov = 2.6;
      const depth = fov / (fov + rz);
      const scale = Math.min(width, height) * 0.55;

      return {
        sx: width / 2 + rx * scale * depth,
        sy: height / 2 + ry * scale * depth,
        depth,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const points = nodes.map((n) => ({ ...project(n), node: n }));

      // Líneas primero, para que los nodos queden encima.
      const linkDist = Math.min(width, height) * 0.28;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.sx - b.sx;
          const dy = a.sy - b.sy;
          const dist = Math.hypot(dx, dy);
          if (dist > linkDist) continue;

          const strength = (1 - dist / linkDist) * 0.5;
          const avgDepth = (a.depth + b.depth) / 2;
          ctx.strokeStyle = `rgba(47, 107, 255, ${strength * avgDepth * 0.5})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.stroke();
        }
      }

      for (const p of points) {
        const r = Math.max(0.6, p.depth * 1.9);
        // Los nodos del fondo tiran a violeta, los del frente a azul:
        // así se lee la profundidad aunque el movimiento sea lento.
        const front = Math.min(1, Math.max(0, (p.depth - 0.6) / 0.8));
        const col = front > 0.5 ? "47, 107, 255" : "124, 58, 237";
        ctx.fillStyle = `rgba(${col}, ${0.25 + p.depth * 0.45})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;
        // Rebote suave en las paredes del cubo.
        if (n.x < -1 || n.x > 1) n.vx *= -1;
        if (n.y < -1 || n.y > 1) n.vy *= -1;
        if (n.z < -1 || n.z > 1) n.vz *= -1;
      }
      angle += 0.0012;
      // Perseguimos el objetivo del cursor en vez de saltar a él: el retardo
      // es lo que hace que la malla se sienta con peso y no elástica.
      yaw += (targetYaw - yaw) * 0.045;
      pitch += (targetPitch - pitch) * 0.045;
    };

    let raf = 0;
    let running = false;

    const loop = () => {
      step();
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Sólo animamos mientras el fondo está realmente a la vista.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () =>
      document.hidden ? stop() : io.takeRecords().length === 0 && start();
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener("resize", onResize);

    // El cursor inclina la malla. Sólo con puntero fino: en táctil no hay
    // hover, y encadenar esto al dedo se sentiría errático.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const onPointerMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      targetYaw = nx * 0.55;
      targetPitch = ny * 0.32;
    };
    if (finePointer && !reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    draw(); // primer frame, también el único si hay reduced-motion

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none h-full w-full", className)}
      style={{ opacity }}
    />
  );
}
