import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import error from './error.js';
import data from './data.js';
import recipeForm from './recipeForm.js';
import {
  HIDE,
} from '../constants/';

function clearReducer(state, action) {
  switch (action.type) {
    case HIDE:
      return undefined;
    default:
      return state;
  }
}
const rootReducer = combineReducers(Object.assign(
  {},
  {
    error,
    data,
    form: form.plugin({ recipeForm: clearReducer}),
    recipeForm,
  },
));

export default rootReducer;
