import React from "react";
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';
import MainPage from './mainPage';
import responseReducer from './mainPage/reducers/responseReducer';

const combinedReducer = combineReducers({
  response: responseReducer,
});

const store = createStore(
  combinedReducer,
  applyMiddleware(thunk),
);

const App = (props) => {
  return (
    <Provider store={store}>
      <MainPage age={18} />
    </Provider>
  );
};

export default App;