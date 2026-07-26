import { useEffect, useState } from "react";

export function useCountdown(initialSeconds: number, onEnd?: () => void) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || seconds <= 0) {
      if (seconds <= 0 && onEnd) onEnd();
      return;
    }
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, seconds, onEnd]);

  const reset = (newSeconds?: number) => {
    setSeconds(newSeconds ?? initialSeconds);
    setIsRunning(true);
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return {
    seconds,
    minutes,
    remainingSeconds,
    isRunning,
    reset,
    formatted: `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`,
  };
}
