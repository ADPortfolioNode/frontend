import { createStore } from 'redux';

const initialState = {
  activeEndpoint: 'Home'
};

const rootReducer = (state = initialState, action) => {
  if (action.type === 'SET_ACTIVE_ENDPOINT') {
    return { ...state, activeEndpoint: action.payload };
  }
  return state;
};

const store = createStore(rootReducer);

export default store;