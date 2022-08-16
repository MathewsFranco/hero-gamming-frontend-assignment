import './main.css';

import * as React from 'react';

import { UniversalRouter } from './universal-router';
import { useLocation } from 'react-router-dom';

export function Root(props) {
  // const createNewStopWatch = async () => {
  //   const started = newDate();
  //   console.log(`🚀 ~ started`, started);
  // };

  return <UniversalRouter location={props.location} />;
}
