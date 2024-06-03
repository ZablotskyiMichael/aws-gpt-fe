import axios from 'axios';

export const START_PROCESS_REQUEST = 'START_PROCESS_REQUEST';
export const START_PROCESS_SUCCESS = 'START_PROCESS_SUCCESS';
export const START_PROCESS_FAILURE = 'START_PROCESS_FAILURE';
export const FETCH_RESPONSE_REQUEST = 'FETCH_RESPONSE_REQUEST';
export const FETCH_RESPONSE_SUCCESS = 'FETCH_RESPONSE_SUCCESS';
export const FETCH_RESPONSE_FAILURE = 'FETCH_RESPONSE_FAILURE';
export const PROCESS_COMPLETE = 'PROCESS_COMPLETE';
export const SET_INTERVAL_ID = 'SET_INTERVAL_ID';
export const SET_RESPONSE_ID = 'SET_RESPONSE_ID';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const startProcess = (inputText) => async (dispatch) => {
  dispatch({ type: START_PROCESS_REQUEST });
  try {
    const response = await axios.post(`${BACKEND_URL}/api/requests`, { input: inputText });
    const responseId = response.data.responseId;
    dispatch({ type: START_PROCESS_SUCCESS });
    dispatch(setResponseId(responseId));
    dispatch(fetchResponse(responseId));
  } catch (error) {
    dispatch({ type: START_PROCESS_FAILURE, error });
  }
};

export const fetchResponse = (responseId) => async (dispatch, getState) => {
  dispatch({ type: FETCH_RESPONSE_REQUEST });
  try {
    const response = await axios.get(`${BACKEND_URL}/api/requests/${responseId}`);
    if (response.data.complete) {
      dispatch({ type: PROCESS_COMPLETE });
    }
    dispatch({ type: FETCH_RESPONSE_SUCCESS, payload: response.data.message });
  } catch (error) {
    dispatch({ type: FETCH_RESPONSE_FAILURE, error });
    clearInterval(getState().response.intervalId);
  }
};

export const setIntervalId = (intervalId) => ({
  type: SET_INTERVAL_ID,
  intervalId,
});

export const setResponseId = (responseId) => ({
  type: SET_RESPONSE_ID,
  responseId,
});