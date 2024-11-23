import { configureStore } from '@reduxjs/toolkit';
import endpointsReducer from './endpointsSlice';

const store = configureStore({
  reducer: {
    endpoints: endpointsReducer,
  },
});

export default store;