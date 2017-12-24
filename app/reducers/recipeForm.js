import {
  ADD,
  EDIT,
  DELETE,
  SHOW,
  HIDE,
  GET_RECIPES,
} from 'Constants/';

import { append, remove } from 'ramda';

const initialState = {
  visible: false,
  recipes: [],
  editing: undefined,
};


function update(state, recipe) {
  const i = state.editing.index;
  const answer = append(recipe, remove(i, 1, state.recipes))
  return Object.assign({}, state, { recipes: answer, visible: false, editing: undefined });
}


function recipes(state = [], action) {
  switch (action.type) {
    case GET_RECIPES:
      return [...action.payload];
    case ADD:
      return [...state, action.payload];
    case EDIT:
      return update(state, action.payload);
    case DELETE:
      return remove(action.payload, 1, state);
    default:
      return state;
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW:
      return Object.assign({},
        state,
        { visible: true, editing: action.payload });
    case HIDE:
      return Object.assign({}, state, { visible: false, editing: undefined });
    case GET_RECIPES:
    case ADD:
    case DELETE:
      return Object.assign({},
        state,
        { recipes: recipes(state.recipes, action), visible: false, editing: undefined });
    case EDIT:
      return Object.assign({}, state, recipes(state, action));
    default:
      return state;
  }
}

export default reducer;

