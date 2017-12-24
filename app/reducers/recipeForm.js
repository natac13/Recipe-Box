import {
  ADD,
  EDIT,
  DELETE,
  SHOW,
  HIDE,
  GET_RECIPES,
} from 'Constants/';

const initialState = {
  visible: false,
  recipes: [],
  editing: undefined,
};


function recipes(state = [], action) {
  switch (action.type) {
    case GET_RECIPES:
      return [...action.payload];
    case ADD:
      return [...state, action.payload];
    case EDIT:
      return state;
    case DELETE:
      return state;
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
    case EDIT:
    case DELETE:
      return Object.assign({},
        state,
        { recipes: recipes(state.recipes, action), visible: false });
    default:
      return state;
  }
}

export default reducer;

