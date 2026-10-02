"use client";

/**
 * PageAnimations — Production-grade animation shell
 *
 * 1. ScrollProgressBar  — Framer Motion useScroll + useSpring + scaleX
 * 2. SectionReveal      — whileInView with proper stagger variants
 * 3. useScrollParallax  — exported hook for parallax scroll transforms
 * 4. useMagneticButton  — magnetic cursor attraction on hover
 */

import {
  useScroll,
  useSpring,
  useTransform,
  motion,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
} from "framer-motion";
import { useRef, useEffect, ReactNode, useState } from "react";

/* ─────────────────────────────────────────────────
   SCROLL PROGRESS BAR
   A spring-smoothed scaleX bar fixed at the top.
───────────────────────────────────────────────── */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg,#8B5CF6 0%,#EC4899 50%,#F43F5E 100%)",
        boxShadow: "0 0 12px rgba(139,92,246,0.6), 0 0 24px rgba(236,72,153,0.3)",
      }}
    />
  );
}

/* ─────────────────────────────────────────────────
   VELOCITY-BASED PARALLAX MARQUEE
   Speeds up on scroll, slows on stop.
───────────────────────────────────────────────── */
export function VelocityMarquee({
  children,
  baseVelocity = 3,
}: {
  children: ReactNode;
  baseVelocity?: number;
}) {
  const baseX   = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex whitespace-nowrap flex-nowrap gap-6" style={{ x }}>
        <span className="block">{children}</span>
        <span className="block">{children}</span>
        <span className="block">{children}</span>
        <span className="block">{children}</span>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   SCROLL-LINKED PARALLAX HOOK
   Use inside any section that needs depth.
───────────────────────────────────────────────── */
export function useScrollParallax(multiplier = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [
    `${multiplier * -80}px`,
    `${multiplier * 80}px`,
  ]);

  return { ref, y };
}

/* ─────────────────────────────────────────────────
   MAGNETIC BUTTON HOOK
   Attracts toward cursor on hover.
───────────────────────────────────────────────── */
export function useMagneticButton(strength = 0.35) {
  const ref   = useRef<HTMLElement>(null);
  const x     = useMotionValue(0);
  const y     = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx   = rect.left + rect.width / 2;
      const cy   = rect.top  + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    };

    const onLeave = () => { x.set(0); y.set(0); };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength, x, y]);

  return { ref, springX, springY };
}

/* ─────────────────────────────────────────────────
   WORD-SPLIT TEXT REVEAL
   Reveals words one by one with stagger.
───────────────────────────────────────────────── */
const wordVariants = {
  hidden:  { opacity: 0, y: "110%", rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1, y: "0%", rotateX: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function SplitTextReveal({
  text,
  className = "",
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements | any;
}) {
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      style={{ overflow: "hidden", perspective: "800px" }}
      aria-label={text}
    >
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{ display: "inline", perspective: "800px" }}
      >
        {words.map((word, i) => (
          <span key={i} style={{ display: "inline-block", overflow: "hidden" }}>
            <motion.span
              custom={i}
              variants={wordVariants}
              style={{ display: "inline-block" }}
            >
              {word}&nbsp;
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ─────────────────────────────────────────────────
   STAGGER REVEAL CONTAINER
   Wraps children with viewport-triggered stagger.
───────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden:  { opacity: 0, y: 32, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function StaggerReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) {
  const dirMap = {
    up:    { y: 32,  x: 0 },
    down:  { y: -32, x: 0 },
    left:  { y: 0,   x: 32 },
    right: { y: 0,   x: -32 },
  };
  const d = dirMap[direction];

  return (
    <motion.div
      className={className}
      variants={{
        hidden:  { opacity: 0, y: d.y, x: d.x, filter: "blur(4px)" },
        visible: {
          opacity: 1, y: 0, x: 0, filter: "blur(0px)",
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────
   COUNTER ANIMATION
   Spring-animated number counter.
───────────────────────────────────────────────── */
export function AnimatedCounter({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [display, setDisplay]     = useState(0);
  const ref   = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start: number;
    const duration = 1600;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, value]);

  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────────
   CURSOR BLOB (ambient cursor follower)
───────────────────────────────────────────────── */
export function CursorBlob() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 w-[400px] h-[400px] rounded-full"
      style={{
        left: springX,
        top: springY,
        background:
          "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
      }}
    />
  );
}

/* ─────────────────────────────────────────────────
   ROOT PAGE ANIMATIONS SHELL
   Drop this into layout or page.
───────────────────────────────────────────────── */
export function PageAnimations() {
  return (
    <>
      <ScrollProgressBar />
      <CursorBlob />
    </>
  );
}
