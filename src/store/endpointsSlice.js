import { createSlice } from '@reduxjs/toolkit';

const endpointsSlice = createSlice({
  name: 'endpoints',
  initialState: {},
  reducers: {
    setEndpoints: (state, action) => {
      return action.payload;
    },
  },
});

export const { setEndpoints } = endpointsSlice.actions;
export default endpointsSlice.reducer;