import React from 'react';
import api from '../../../utils/api';

const List = () => {
  const createNewStopWatch = async () => {
    const started = Date.now();
    try {
      const res = await api.post('', { started });
      console.log(`🚀 ~ res`, res);
    } catch (err) {
      console.log(`🚀 ~ err`, err);
    }
  };
  return (
    <>
      <button onClick={createNewStopWatch}>new ⏱</button>
    </>
  );
};

export default List;
