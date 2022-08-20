import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../utils/api';
import StopWatchDetails from '../../StopWatchDetails';

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [err, setErr] = useState(false);

  const getData = async (query) => {
    try {
      const { data } = await api.get(`/${id}`, { params: query });
      setData(data);
    } catch (err) {
      setErr(true);
      console.log(`🚀 ~ err`, err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {err ? (
        <>
          Couldn't find your watch
          <button onClick={() => history.back()}>Go back to list</button>
        </>
      ) : data ? (
        <StopWatchDetails data={data} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Details;
