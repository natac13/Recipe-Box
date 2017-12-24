import { createAction } from 'redux-actions';
import {
  SHOW,
  HIDE,
  ADD,
  EDIT,
  DELETE,
} from 'Constants';

export const show = createAction(SHOW);
export const hide = createAction(HIDE);
export const addRecipe = createAction(ADD);
export const editRecipe = createAction(EDIT);
export const deleteRecipe = createAction(DELETE);
