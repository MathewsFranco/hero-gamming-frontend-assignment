import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useTimer from '../../../hooks/useTimer';
import api from '../../../utils/api';
import timeConverter from '../../../utils/timeConverter';

const StopWatches = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const {
    timer,
    setTimer,
    isPaused,
    setIsPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
  } = useTimer(data?.result);

  const getData = async (query) => {
    try {
      const { data } = await api.get(`/${id}`, { params: query });
      console.log(`🚀 ~ data single`, data);
      setData(data);
    } catch (err) {
      // TODO: error handling
      console.log(`🚀 ~ err`, err);
    }
  };

  const registerLap = async (data) => {
    // TODO: RegisterLap on BE and add one instant to the front
  };

  // useEffect(() => {
  //   if (Boolean(data?.result?.toggles?.length % 2)) {
  //     setIsPaused(true);
  //     handlePause();
  //   } else {
  //     setIsPaused(false);
  //     handleResume();
  //   }
  // }, [data]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>{timeConverter(timer)}</div>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleResume}>Resume</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={registerLap}>Lap</button>
    </>
  );
};

export default StopWatches;
