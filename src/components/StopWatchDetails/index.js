import React, { useId } from 'react';
import useTimer from '../../hooks/useTimer';
import timeConverter from '../../utils/timeConverter';

const StopWatchDetails = ({ data }) => {
  const {
    timer,
    lapsTimes,
    registerLap,
    handleReset,
    handleToggle,
    handleDelete,
  } = useTimer(data.result);

  return (
    <>
      <div>{timeConverter(timer)}</div>
      <button onClick={() => handleToggle(Date.now())}>Pause</button>
      <button onClick={() => handleToggle(Date.now())}>Resume</button>
      <button onClick={() => handleReset(Date.now())}>Reset</button>
      <button onClick={handleDelete}>delete</button>
      <button
        onClick={() => {
          registerLap(Date.now());
        }}
      >
        Lap
      </button>
      {lapsTimes?.map((lap, index) => {
        return <div key={index}>{timeConverter(lap)}</div>;
      })}
    </>
  );
};

export default StopWatchDetails;
