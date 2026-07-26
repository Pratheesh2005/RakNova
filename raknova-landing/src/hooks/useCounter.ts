import { useEffect, useRef, useState } from "react";

interface UseCounterOptions {
  end: number;
  duration?: number;
  delay?: number;
  start?: number;
}

export function useCounter({ end, duration = 2000, delay = 0, start = 0 }: UseCounterOptions) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    const timer = window.setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timer);
  }, [isVisible, end, duration, delay, start]);

  return { count, ref };
}
