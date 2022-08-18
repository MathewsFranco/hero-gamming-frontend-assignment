import { useEffect, useRef, useState } from 'react';
import api from '../utils/api';
import timeResumed, { timeReducer } from '../utils/timeResumed';
import { useHistory } from 'react-router-dom';

const useTimer = (item) => {
  const [isPaused, setIsPaused] = useState(Boolean(item.toggles.length % 2));
  const displayTime = timeResumed(item, isPaused);
  const [timer, setTimer] = useState(displayTime);
  const [lapsTimes, setLapsTimes] = useState();
  const [allTimeStamps, setAllTimeStamps] = useState([
    item.started,
    ...item.toggles,
    ...item.laps,
  ]);
  const countRef = useRef(null);
  const history = useHistory();

  const handleStart = () => {
    !isPaused &&
      (countRef.current = setInterval(() => {
        setTimer((timer) => timer + 10);
      }, 10));
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
    }
  };
  const handleToggle = (now) => {
    postToggle(now);
    if (isPaused) {
      setIsPaused(false);
      countRef.current = setInterval(() => {
        setTimer((timer) => timer + 10);
      }, 10);
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
    }
  };
  const handleReset = (now) => {
    postReset(now);
    setIsPaused(false);
    // clear previous interval (if it does exists)
    clearInterval(countRef.current);
    // create a new counter
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 10);
    }, 10);
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
    }
  };
  const getLapsTimes = () => {
    const sortedArr = allTimeStamps.sort((a, b) => a - b);
    let lapTime;
    const lapsDuration = item?.laps.map((lap, index) => {
      if (index === 0) {
        const timeInterval = sortedArr.filter((i) => {
          return i <= lap;
        });
        lapTime = timeReducer(timeInterval);
      } else {
        const timeInterval = sortedArr.filter((i) => {
          return i <= lap && i >= item?.laps[index - 1];
        });
        lapTime = timeReducer(timeInterval);
      }
      return lapTime;
    });
    setLapsTimes(lapsDuration.reverse());
  };

  const registerLap = (time) => {
    postLap(time);
    //TODO: show updated onscreen
    setAllTimeStamps((prev) => [time, ...prev]);
    getLapsTimes();
  };

  return {
    timer,
    lapsTimes,
    registerLap,
    isPaused,
    handleToggle,
    handleReset,
    handleDelete,
  };
};

export default useTimer;
