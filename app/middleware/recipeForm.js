import { initialize } from 'redux-form';

import { SHOW } from 'Constants/';


export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type === SHOW && action.payload) {
    console.log('Showing middleware', action);
      dispatch(initialize('recipeForm', action.payload));
  }
  return next(action);
}