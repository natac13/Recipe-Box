import localForage from 'localforage';

import {
  GET_RECIPES,
  SAVE,
} from '../constants/';

export const CALL_API = Symbol('Call API');


function actionWith(action, extra) {
  const finalAction = Object.assign({}, action, extra);
  delete finalAction[CALL_API];
  return finalAction;
}

// Api Middleware itself
export default ({ dispatch, getState }) => (next) => (action) => {
  const callAPI = action[CALL_API];

  // pass to next middleware if normal action and not a CALL_API action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }
  const { type } = action;
/* ====================================
  =            Source Data            =
=====================================*/

  if (type === GET_RECIPES) {
    return localForage.getItem('recipes')
      .then((response) => {
        console.log(response);
        return next(actionWith(action, { payload: response }));
      });
  }

  if (type === SAVE) {
    console.log('saving list@@@@@@@@@@@@');
    console.log(getState());
    console.log(callAPI);
    localForage.setItem('recipes', getState().recipeForm.recipes)
      .then(() => localForage.getItem('recipes').then(console.log));
    return next(actionWith(action));
  }

/* =====  End of Security API  ======*/

  return next(action);
};
