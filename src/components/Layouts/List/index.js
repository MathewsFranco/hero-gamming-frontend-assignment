import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import api from '../../../utils/api';
import TimeDisplay from '../../TimeDisplay';

const List = () => {
  const [data, setData] = useState({});
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState({
    main: true,
    fetchNewPage: false,
    creatingNewStopWatch: false,
  });
  const history = useHistory();

  useEffect(() => {
    getData();
  }, []);

  const createNewStopWatch = async () => {
    setLoading((prev) => ({ ...prev, creatingNewStopWatch: true }));
    const started = Date.now();
    try {
      const res = await api.post('', { started });
      history.push(`/${res.data.__id}`);
    } catch (err) {
      // TODO: push notification error
      console.log(`🚀 ~ err`, err);
    } finally {
      setLoading((prev) => ({ ...prev, creatingNewStopWatch: false }));
    }
  };

  const getData = async (query) => {
    try {
      const { data } = await api.get('', { params: query });
      query
        ? setData((prev) => {
            return {
              ...data,
              result: [...prev.result, ...data.result],
            };
          })
        : setData(data);
    } catch (err) {
      setErr(true);
      console.log(`🚀 ~ err`, err);
    } finally {
      setLoading((prev) => ({ ...prev, main: false, fetchNewPage: false }));
    }
  };

  const loadMoreWatches = () => {
    setLoading((prev) => ({ ...prev, fetchNewPage: true }));
    getData({ page: data.meta.currentPage + 1 });
  };

  const notify = () => {
    toast.warn('🦄 Wow so easy!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      {err ? (
        <>
          <button onclick={() => getData()}>Give it another try...</button>
          <div>Hmm, looks like your stopwatches are not here!</div>
        </>
      ) : loading.main ? (
        <div>Loading...</div>
      ) : (
        <>
          <button onClick={notify}>toast</button>
          <button
            onClick={createNewStopWatch}
            disabled={loading.creatingNewStopWatch}
          >
            {loading.creatingNewStopWatch ? 'Creating new stopwatch' : 'new ⏱'}
          </button>
          {data.result?.map((e) => (
            <TimeDisplay item={e} key={e.__id} />
          ))}
        </>
      )}
      {data?.meta?.currentPage !== data?.meta?.totalPages && (
        <button onClick={loadMoreWatches} disabled={loading.fetchNewPage}>
          {loading.fetchNewPage ? 'Loading...' : 'Load +'}
        </button>
      )}
    </>
  );
};

export default List;
