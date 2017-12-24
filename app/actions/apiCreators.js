import { CALL_API } from '../middleware/api.js';
import {
  GET_RECIPES,
  SAVE,
} from 'Constants/';

export function getRecipes(payload) {
  return {
    type: GET_RECIPES,
    [CALL_API]: { ...payload },
  };
}

export function save() {
  return {
    type: SAVE,
    [CALL_API]: true,
  };
}
