import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import error from './error.js';
import data from './data.js';
import recipeForm from './recipeForm.js';
import {
} from '../constants/';

function clearReducer(state, action) {
  switch (action.type) {

    default:
      return undefined;
  }
}
const rootReducer = combineReducers(Object.assign(
  {},
  {
    error,
    data,
    form,
    recipeForm,
  },
));

export default rootReducer;
