const initialState = {
  activeEndpoint: 'Home'
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_ENDPOINT':
      return {
        ...state,
        activeEndpoint: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;