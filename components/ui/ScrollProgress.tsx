"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar pinned to the top of the viewport, tracking scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-accent via-accent-violet to-accent"
    />
  );
}
