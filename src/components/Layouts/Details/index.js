import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../utils/api';
import StopWatchDetails from '../../StopWatchDetails';

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  const getData = async (query) => {
    try {
      const { data } = await api.get(`/${id}`, { params: query });
      console.log(`🚀 ~ data single`, data);
      setData(data);
    } catch (err) {
      // TODO: error handling
      console.log(`🚀 ~ err`, err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <>{data ? <StopWatchDetails data={data} /> : <div>Loading...</div>}</>;
};

export default Details;
