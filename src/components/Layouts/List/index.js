import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../utils/api';
import TimeDisplay from '../../TimeDisplay';

const List = () => {
  const [data, setData] = useState({});
  const history = useHistory();

  const createNewStopWatch = async () => {
    const started = Date.now();
    try {
      const res = await api.post('', { started });
      console.log(`🚀 ~ res`, res);
      history.push(`/${res.data.__id}`);
    } catch (err) {
      console.log(`🚀 ~ err`, err);
    }
  };

  const getData = async (query) => {
    try {
      const { data } = await api.get('', { params: query });
      console.log(`🚀 ~ data`, data);

      query
        ? setData((prev) => {
            return {
              ...data,
              result: [...prev.result, ...data.result],
            };
          })
        : setData(data);
    } catch (err) {
      // TODO: error handling
      console.log(`🚀 ~ err`, err);
    }
  };

  const loadMoreWatches = () => {
    getData({ page: data.meta.currentPage + 1 });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <button onClick={createNewStopWatch}>new ⏱</button>
      {data.result?.map((e) => (
        <TimeDisplay item={e} key={e.__id} />
      ))}
      {data?.meta?.currentPage !== data?.meta?.totalPages && (
        <button onClick={loadMoreWatches}>Load ➕</button>
      )}
    </>
  );
};

export default List;
