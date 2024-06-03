import {
  START_PROCESS_REQUEST,
  START_PROCESS_SUCCESS,
  START_PROCESS_FAILURE,
  FETCH_RESPONSE_REQUEST,
  FETCH_RESPONSE_SUCCESS,
  FETCH_RESPONSE_FAILURE,
  PROCESS_COMPLETE,
  SET_INTERVAL_ID,
  SET_RESPONSE_ID,
} from '../actions/responseActions';

const initialState = {
  isFetching: false,
  response: '',
  error: null,
  processComplete: false,
  intervalId: null,
  responseId: null,
};

const responseReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_PROCESS_REQUEST:
      return {
        ...state,
        isFetching: true,
        processComplete: false,
        error: null,
      };
    case START_PROCESS_SUCCESS:
      return {
        ...state,
      };
    case START_PROCESS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case FETCH_RESPONSE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_RESPONSE_SUCCESS:
      return {
        ...state,
        response: action.payload,
      };
    case FETCH_RESPONSE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case PROCESS_COMPLETE:
      return {
        ...state,
        processComplete: true,
        isFetching: false,
      };
    case SET_INTERVAL_ID:
      return {
        ...state,
        intervalId: action.intervalId,
      };
    case SET_RESPONSE_ID:
      return {
        ...state,
        responseId: action.responseId,
      };
    default:
      return state;
  }
};

export default responseReducer;