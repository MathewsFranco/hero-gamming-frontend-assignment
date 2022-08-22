import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../utils/api';
import Spinner from '../../Spinner';
import StopWatchDetails from '../../StopWatchDetails';
import { ErrContainer } from '../List/styles';

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
        <ErrContainer>
          Couldn't find your watch
          <button onClick={() => history.back()}>Go back to list</button>
        </ErrContainer>
      ) : data ? (
        <StopWatchDetails data={data} />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Details;
