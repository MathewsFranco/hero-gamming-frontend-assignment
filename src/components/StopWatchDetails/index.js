import React, { useId } from 'react';
import useTimer from '../../hooks/useTimer';
import timeConverter from '../../utils/timeConverter';
import Button from '../Button';
import TimeDisplay from '../TimeDisplay';
import { BackToList } from './styles';

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
      <BackToList onClick={() => history.back()}> ← Back</BackToList>
      <div>{timeConverter(timer)}</div>
      {isPaused ? (
        <Button onClick={() => handleReset(Date.now())} label='Reset' />
      ) : (
        <Button
          onClick={() => {
            registerLap(Date.now());
          }}
          label='Lap'
        />
      )}
      <Button onClick={handleDelete} label='Delete' />
      {lapsTimes?.map((lap, index) => {
        return <div key={index}>{timeConverter(lap)}</div>;
      })}
      <Button
        onClick={() => handleToggle(Date.now())}
        playButton
        isPaused={isPaused}
        label={isPaused ? 'Resume' : 'Stop'}
      />
    </>
  );
};

export default StopWatchDetails;
