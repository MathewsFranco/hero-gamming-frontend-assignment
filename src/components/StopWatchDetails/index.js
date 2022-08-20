import React, { useId } from 'react';
import useTimer from '../../hooks/useTimer';
import timeConverter from '../../utils/timeConverter';

const StopWatchDetails = ({ data }) => {
  const {
    timer,
    lapsTimes,
    isPaused,
    registerLap,
    handleReset,
    handleToggle,
    handleDelete,
  } = useTimer(data.result);

  return (
    <>
      <button onClick={() => history.back()}>back</button>
      <div>{timeConverter(timer)}</div>
      <button onClick={() => handleToggle(Date.now())}>
        {isPaused ? 'Resume' : 'Pause'}
      </button>
      {isPaused ? (
        <button onClick={() => handleReset(Date.now())}>Reset</button>
      ) : (
        <button
          onClick={() => {
            registerLap(Date.now());
          }}
        >
          Lap
        </button>
      )}
      <button onClick={handleDelete}>delete</button>
      {lapsTimes?.map((lap, index) => {
        return <div key={index}>{timeConverter(lap)}</div>;
      })}
    </>
  );
};

export default StopWatchDetails;
