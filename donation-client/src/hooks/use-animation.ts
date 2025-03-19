import type React from "react";

import { useAnimation, useInView } from "framer-motion";
import { useEffect, useState } from "react";

// Hook for animations that trigger when element comes into view
export function useScrollAnimation(
  ref: React.RefObject<HTMLElement>,
  once = true,
  margin = "0px"
) {
  const controls = useAnimation();
  const inView = useInView(ref, { once, margin });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [controls, inView, once]);

  return { controls, inView };
}

// Hook for counter animation
export function useCounter(endValue: number, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * endValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, duration]);

  return count;
}

// Hook for rotating color themes
export function useRotatingThemes(themes: any[], interval = 5000) {
  const [activeTheme, setActiveTheme] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTheme((prev) => (prev + 1) % themes.length);
    }, interval);

    return () => clearInterval(timer);
  }, [themes, interval]);

  return themes[activeTheme];
}

// Hook for parallax scrolling effect
export function useParallax(factor = 0.2) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY * factor;
}
