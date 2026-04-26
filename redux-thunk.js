const reduxThunk = store => {
  const { dispatch, getState } = store;
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

const loggerMiddleware = store => {
  const { dispatch, getState } = store;
  return next => action => {
    console.log('dispatching', action);
    const result = next(action);
    console.log('next state', getState());
    return result;
  }
}