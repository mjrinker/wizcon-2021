import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import axios from 'axios';
import { store } from 'react-notifications-component';

import {
  GET_ALL_FAILURE,
  GET_ALL_SUCCESS,
  GET_FAILURE,
  GET_SUCCESS,
  PUT,
  PUT_FAILURE,
  PUT_SUCCESS,
} from '../actions/request';
import requestReducer, { REQUEST_STATUS } from '../reducers/request';

const useRequest = (baseUrl, route, recordId) => {
  const [
    {
      data,
      error,
      status,
    },
    dispatch,
  ] = useReducer(requestReducer, {
    data: [],
    error: null,
    status: REQUEST_STATUS.LOADING,
  });

  const signal = useRef(axios.CancelToken.source());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}${route}${recordId ? `/${recordId}` : ''}`, {
          cancelToken: signal.current.token,
        });
        dispatch({
          data: response.data,
          type: recordId ? GET_SUCCESS : GET_ALL_SUCCESS,
        });
      } catch (error) {
        console.error('Loading data error', error);
        if (axios.isCancel(error)) {
          console.info('GET request canceled');
        } else {
          dispatch({
            error,
            type: recordId ? GET_FAILURE : GET_ALL_FAILURE,
          });
        }
      }
    };

    fetchData();
    return () => {
      console.info('Unmount and cancel running axios request.');
      signal.current.cancel();
    };
  }, []);

  const put = useCallback(async (record) => {
    try {
      dispatch({
        record,
        type: PUT,
      });

      await axios.put(`${baseUrl}${route}/${record.id}`, record);
      dispatch({
        record,
        type: PUT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        error,
        type: PUT_FAILURE,
      });

      store.addNotification({
        title: 'Favorite Status Update Failure',
        message: `Failed to update favorite status of ${record.name}. Setting back...`,
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    }
  }, []);

  return {
    data,
    error,
    put,
    status,
  };
};

export default useRequest;
