import React from 'react';
import { useHistory } from 'react-router-dom';
import useTimer from '../../hooks/useTimer';
import timeConverter from '../../utils/timeConverter';

const TimeDisplay = ({ item }) => {
  const { timer, isPaused } = useTimer(item);
  const history = useHistory();

  const goToStopWatch = () => {
    history.push(`/${item.__id}`);
  };
  return (
    <div onClick={goToStopWatch} style={{ cursor: 'pointer' }}>
      {timeConverter(timer)}
      {isPaused && <span style={{ color: 'red' }}>paused</span>}
    </div>
  );
};

export default TimeDisplay;
