import {
  GET_ALL_FAILURE,
  GET_ALL_SUCCESS,
  GET_FAILURE,
  GET_SUCCESS,
  PUT,
  PUT_FAILURE,
  PUT_SUCCESS,
} from '../actions/request';

export const REQUEST_STATUS = {
  ERROR: 'error',
  LOADING: 'loading',
  SUCCESS: 'success',
};

const requestReducer = (state, action) => {
  /* eslint-disable indent */
  switch (action.type) {
    case GET_ALL_FAILURE: {
      return {
        ...state,
        error: action.error,
        status: REQUEST_STATUS.ERROR,
      };
    }

    case GET_ALL_SUCCESS: {
      return {
        ...state,
        data: action.data,
        status: REQUEST_STATUS.SUCCESS,
      };
    }

    case GET_FAILURE: {
      return {
        ...state,
        error: action.error,
        status: REQUEST_STATUS.ERROR,
      };
    }

    case GET_SUCCESS: {
      return {
        ...state,
        data: action.data,
        status: REQUEST_STATUS.SUCCESS,
      };
    }

    case PUT: {
      const { record } = action;
      const { data } = state;
      let newData;
      if (Array.isArray(data)) {
        const recordIndex = data.findIndex((rec) => rec.id === record.id);
        newData = [...data];
        newData.splice(recordIndex, 1, record);
      } else {
        newData = record;
      }

      return {
        ...state,
        data: newData,
        prevData: state.data,
      };
    }

    case PUT_FAILURE: {
      console.error('PUT_FAILURE: Currently just logging to console without refreshing data...');
      return {
        ...state,
        data: state.prevData,
        error: action.error,
      };
    }

    default: {
      return state;
    }
  }
  /* eslint-enable indent */
};

export default requestReducer;
