import React from 'react';
import timeConverter from '../../utils/timeConverter';
import { Container } from './styles';

const LapDisplay = ({ lap, index, fastestAndSlowestLap }) => {
  return (
    <Container
      isSlowestLap={lap === fastestAndSlowestLap[0]}
      isFastestLap={lap === fastestAndSlowestLap[1]}
    >
      <div>Lap {index + 1}</div>
      <div>{timeConverter(lap)}</div>
    </Container>
  );
};

export default LapDisplay;
