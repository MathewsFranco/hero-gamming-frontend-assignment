import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useToast from '../../../hooks/useToast';
import api from '../../../utils/api';
import Button from '../../Button';
import Spinner from '../../Spinner';
import TimeDisplay from '../../TimeDisplay';
import { Container, ErrContainer } from './styles';

const List = () => {
  const [data, setData] = useState({});
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState({
    main: true,
    fetchNewPage: false,
    creatingNewStopWatch: false,
  });
  const history = useHistory();
  const { errorToast } = useToast();

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
      errorToast('Failed to create a new stopwatch');
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

  return (
    <>
      {err ? (
        <ErrContainer>
          <div>Hmm, looks like your stopwatches are not here!</div>
          <button onClick={() => location.reload()}>
            Give it another try...
          </button>
        </ErrContainer>
      ) : loading.main ? (
        <Spinner />
      ) : (
        <Container>
          <Button
            center
            onClick={createNewStopWatch}
            disabled={loading.creatingNewStopWatch}
            label='New'
          />
          {data.result?.map((e) => (
            <TimeDisplay item={e} key={e.__id} />
          ))}
          test
          {data?.meta?.currentPage !== data?.meta?.totalPages && (
            <Button
              center
              onClick={loadMoreWatches}
              disabled={loading.fetchNewPage}
              label={loading.fetchNewPage ? 'Wait' : 'More'}
            />
          )}
        </Container>
      )}
    </>
  );
};

export default List;
