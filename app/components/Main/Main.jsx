import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import RecipeBox from 'Components/RecipeBox/';
import RecipeForm from 'Components/RecipeForm/';
import Header from 'Components/Header/';

import style from './style.scss';

function Main(props) {
  const {
    actions,
    data,
    recipeForm,
  } = props;

  const wrapperClass = classnames({
    [style.wrapper]: true,
  });

  return (
    <div className={wrapperClass}>
      <Header />
      <RecipeBox
        actions={actions}
        recipes={recipeForm.recipes}
      />
      <RecipeForm
        actions={actions}
        visible={recipeForm.visible}
        editing={recipeForm.editing}
      />
    </div>
  );
}


Main.propTypes = {
  appName: PropTypes.string,
  actions: PropTypes.object,
  data: PropTypes.object,
  recipeForm: PropTypes.object,
};

export default Main;
