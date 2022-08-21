import React from 'react';
import timeConverter from '../../utils/timeConverter';
import { Container, Timer } from './styles';

const BigClock = ({ time }) => {
  return (
    <Container>
      <Timer>{timeConverter(time)}</Timer>
    </Container>
  );
};

export default BigClock;
