import React from 'react';
import { useHistory } from 'react-router-dom';
import useTimer from '../../hooks/useTimer';
import timeConverter from '../../utils/timeConverter';
import { Container } from './styles';
import pause from '../../assets/images/pause-button.png';

const TimeDisplay = ({ item }) => {
  const { timer, isPaused } = useTimer(item);
  const history = useHistory();

  const goToStopWatch = () => {
    history.push(`/${item.__id}`);
  };
  return (
    <Container onClick={goToStopWatch} isPaused={isPaused}>
      {timeConverter(timer)}
      {isPaused && <img src={pause} />}
    </Container>
  );
};

export default TimeDisplay;
