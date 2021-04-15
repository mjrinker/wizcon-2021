import {
  useEffect,
  useReducer,
} from 'react';
import axios from 'axios';

import {
  GET_ALL_FAILURE,
  GET_ALL_SUCCESS,
  PUT_FAILURE,
  PUT_SUCCESS,
} from '../../actions/request';
import requestReducer, { REQUEST_STATUS } from '../../reducers/request';

const Request = ({ baseUrl, route, children }) => {
  const [
    {
      error,
      records,
      status,
    },
    dispatch,
  ] = useReducer(requestReducer, {
    error: null,
    records: [],
    status: REQUEST_STATUS.LOADING,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}${route}`);
        dispatch({
          records: response.data,
          type: GET_ALL_SUCCESS,
        });
      } catch (error) {
        console.error('Loading data error', error);
        dispatch({
          error,
          type: GET_ALL_FAILURE,
        });
      }
    };

    fetchData();
  }, [baseUrl, route]);

  const put = async (record) => {
    try {
      dispatch({
        record,
        type: PUT_SUCCESS,
      });
      await axios.put(`${baseUrl}${route}/${record.id}`, record);
    } catch (error) {
      dispatch({
        error,
        type: PUT_FAILURE,
      });
    }
  };

  return children({
    error,
    put,
    records,
    status,
  });
};

export default Request;
