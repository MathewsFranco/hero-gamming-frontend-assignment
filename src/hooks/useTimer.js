import { useEffect, useRef, useState } from 'react';
import api from '../utils/api';
import timeResumed, { timeReducer } from '../utils/timeResumed';
import { useHistory } from 'react-router-dom';
import useToast from './useToast';

const useTimer = (item) => {
  const [isPaused, setIsPaused] = useState(Boolean(item.toggles.length % 2));
  const displayTime = timeResumed(item, isPaused);
  const [timer, setTimer] = useState(displayTime);
  const [laps, setLaps] = useState(item.laps);
  const [lapsTimes, setLapsTimes] = useState();
  const [allTimeStamps, setAllTimeStamps] = useState([
    item.started,
    ...item.toggles,
    ...item.laps,
  ]);
  const countRef = useRef(null);
  const history = useHistory();
  const { errorToast } = useToast();

  const handleStart = () => {
    !isPaused &&
      (countRef.current = setInterval(() => {
        setTimer((timer) => timer + 3);
      }, 3));
  };

  useEffect(() => {
    handleStart();
    getLapsTimes();
  }, []);

  const postToggle = async (time) => {
    try {
      await api.post(`/${item.__id}/toggle`, {
        id: item.__id,
        time,
      });
    } catch (err) {
      console.log(`🚀 ~ err`, err);
      errorToast('Something went wrong saving your action 🚨');

      // used to roll back the timer after failing to save the action on BE
      if (isPaused) {
        setIsPaused(true);
        setTimer((prev) => prev - (Date.now() - time));
        clearInterval(countRef.current);
      } else {
        setIsPaused(false);
        setTimer((prev) => prev + (Date.now() - time));
        countRef.current = setInterval(() => {
          setTimer((timer) => timer + 3);
        }, 3);
      }
    }
  };
  const handleToggle = (time) => {
    postToggle(time);
    setAllTimeStamps((prev) => [...prev, time]);

    if (isPaused) {
      setIsPaused(false);
      countRef.current = setInterval(() => {
        setTimer((timer) => timer + 3);
      }, 3);
      return;
    }
    clearInterval(countRef.current);
    setIsPaused(true);
  };

  const postReset = async (started) => {
    try {
      await api.post(`/${item.__id}`, { id: item.__id, started });
    } catch (err) {
      console.log(`🚀 ~ err`, err);
      const tempInfo = { timer, allTimeStamps, lapsTimes };
      setTimer(tempInfo.timer);
      setAllTimeStamps(tempInfo.allTimeStamps);
      setLapsTimes(tempInfo.lapsTimes);
      setIsPaused(true);
      clearInterval(countRef.current);
      errorToast('Something went wrong 🚨');
    }
  };
  const handleReset = (now) => {
    postReset(now);
    setIsPaused(false);
    setAllTimeStamps([now]);
    setLapsTimes([]);
    // clear previous interval (if it does exists)
    clearInterval(countRef.current);

    // create a new counter
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 3);
    }, 3);
    setTimer(0);
  };

  const postDeletion = async () => {
    try {
      api.delete(`/${item.__id}`);
    } catch (err) {
      console.log(`🚀 ~ err`, err);
    }
  };
  const handleDelete = () => {
    postDeletion();
    history.push('/');
  };

  const postLap = async (time) => {
    try {
      await api.post(`/${item.__id}/lap`, { id: item.__id, time });
    } catch (err) {
      console.log(`🚀 ~ err`, err);

      // remove the added item from the display
      setLapsTimes((prev) => {
        return prev.splice(1);
      });
      errorToast(`We couldn't register your lap 🚨`);
    }
  };
  const getLapsTimes = () => {
    const sortedArr = allTimeStamps.sort((a, b) => a - b);
    let lapTime;
    const lapsDuration = laps.map((lap, index) => {
      if (index === 0) {
        const timeInterval = sortedArr.filter((i) => {
          return i <= lap;
        });
        lapTime = timeReducer(timeInterval);
      } else {
        const timeInterval = sortedArr.filter((i) => {
          return i <= lap && i >= laps[index - 1];
        });
        lapTime = timeReducer(timeInterval);
      }
      return lapTime;
    });
    setLapsTimes(lapsDuration.reverse());
  };

  const registerLap = (time) => {
    postLap(time);

    const sortedArr = [...allTimeStamps, time].sort((a, b) => a - b);
    const timeInterval = sortedArr.filter((i) => {
      if (laps.length) {
        return i <= time && i >= laps[laps.length - 1];
      }
      return i <= time && i >= item.started;
    });
    const lapTime = timeReducer(timeInterval);

    setLapsTimes((prev) => [lapTime, ...prev]);
    setAllTimeStamps((prev) => [...prev, time]);
    setLaps((prev) => [...prev, time]);
  };

  return {
    timer,
    lapsTimes,
    isPaused,
    registerLap,
    handleToggle,
    handleReset,
    handleDelete,
  };
};

export default useTimer;
