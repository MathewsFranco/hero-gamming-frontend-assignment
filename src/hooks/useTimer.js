import { useEffect, useRef, useState } from 'react';

const useTimer = (data) => {
  const item = data ? data : { started: Date.now(), toggles: [{}] };
  const clockTime = Date.now() - item.started;
  const [timer, setTimer] = useState(clockTime);
  const [isPaused, setIsPaused] = useState(Boolean(item.toggles.length % 2));
  const countRef = useRef(null);

  const handleStart = () => {
    !isPaused &&
      (countRef.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1));
  };

  useEffect(() => {
    handleStart();
  }, []);

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
    setTimer(0);
  };

  return {
    timer,
    setTimer,
    isPaused,
    setIsPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
  };
};

export default useTimer;
