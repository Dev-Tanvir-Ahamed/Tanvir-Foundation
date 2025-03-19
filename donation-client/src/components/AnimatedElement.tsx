/* eslint-disable @typescript-eslint/no-explicit-any */

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}

export function AnimatedButton({
  children,
  className,
  onClick,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  [key: string]: any;
}

export function FloatingElement({
  children,
  delay = 0,
  duration = 4,
  className = "",
  ...props
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface PulsingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  scale?: number[];
  className?: string;
  [key: string]: any;
}

export function PulsingElement({
  children,
  delay = 0,
  duration = 2,
  scale = [1, 1.1, 1],
  className = "",
  ...props
}: PulsingElementProps) {
  return (
    <motion.div
      animate={{
        scale,
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 1,
        delay,
        ease: "easeInOut",
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface FadeInElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
  [key: string]: any;
}

export function FadeInElement({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 20,
  className = "",
  ...props
}: FadeInElementProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      default:
        return {};
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedGradientProps {
  colors: string[];
  className?: string;
  duration?: number;
  [key: string]: any;
}

export function AnimatedGradient({
  colors,
  className = "",
  duration = 8,
  ...props
}: AnimatedGradientProps) {
  const gradientString = `linear-gradient(90deg, ${colors.join(", ")}, ${
    colors[0]
  })`;

  return (
    <motion.div
      className={className}
      style={{
        backgroundImage: gradientString,
        backgroundSize: "300% 100%",
        backgroundRepeat: "no-repeat",
      }}
      animate={{
        backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
      {...props}
    />
  );
}

interface FloatingShapeProps {
  color: string;
  size?: number;
  delay?: number;
  duration?: number;
  blur?: number;
  opacity?: number;
  className?: string;
  [key: string]: any;
}

export function FloatingShape({
  color,
  size = 100,
  delay = 0,
  duration = 15,
  blur = 40,
  opacity = 0.2,
  className = "",
  ...props
}: FloatingShapeProps) {
  const randomSize = size + Math.random() * 50;

  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      style={{
        width: randomSize,
        height: randomSize,
        backgroundImage: `radial-gradient(circle at center, ${color}, transparent 70%)`,
        filter: `blur(${blur}px)`,
        opacity,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 0.8],
        opacity: [0, opacity, 0],
        y: [0, -100],
        x: [0, Math.random() * 50 - 25],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
      {...props}
    />
  );
}
