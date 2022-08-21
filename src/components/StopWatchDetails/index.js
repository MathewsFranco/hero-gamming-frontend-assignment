import React, { useEffect, useId, useState } from 'react';
import useTimer from '../../hooks/useTimer';
import BigClock from '../BigClock';
import Button from '../Button';
import LapDisplay from '../LapDisplay';
import {
  Container,
  CustomButton,
  FlexSpacedContainer,
  LapsContainer,
} from './styles';

const StopWatchDetails = ({ data }) => {
  const [fastestAndSlowestLap, setFastestAndSlowestLap] = useState([]);
  const {
    timer,
    lapsTimes,
    isPaused,
    registerLap,
    handleReset,
    handleToggle,
    handleDelete,
  } = useTimer(data.result);

  const getFastestAndSlowestLap = (lapsTimes) => {
    if (lapsTimes.length > 1) {
      const slowest = Math.max(...lapsTimes);
      const fastest = Math.min(...lapsTimes);
      setFastestAndSlowestLap([slowest, fastest]);
    }
  };

  useEffect(() => {
    lapsTimes && getFastestAndSlowestLap(lapsTimes);
  }, [lapsTimes]);

  return (
    <Container>
      <FlexSpacedContainer>
        <CustomButton onClick={() => history.back()}>Back</CustomButton>
        <CustomButton isDelete onClick={handleDelete}>
          Delete
        </CustomButton>
      </FlexSpacedContainer>
      <BigClock time={timer} />
      <FlexSpacedContainer style={{ marginBottom: 20 }}>
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
        <Button
          onClick={() => handleToggle(Date.now())}
          playButton
          isPaused={isPaused}
          label={isPaused ? 'Resume' : 'Stop'}
        />
      </FlexSpacedContainer>
      <LapsContainer>
        {lapsTimes?.map((lap, index) => {
          return (
            <LapDisplay
              lap={lap}
              key={index}
              index={index}
              fastestAndSlowestLap={fastestAndSlowestLap}
            />
          );
        })}
      </LapsContainer>
    </Container>
  );
};

export default StopWatchDetails;
