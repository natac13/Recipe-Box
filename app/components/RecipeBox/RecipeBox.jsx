import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import capitalize from 'lodash/capitalize';


import {
  Accordion,
  Panel,
  ButtonGroup,
  Button,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

import style from './style.scss';

export default class RecipeBox extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    actions: PropTypes.object,
  };

  constructor(props) {
    super(props);

    /** Styling */
    const wrapperClass = classnames({
      [style.wrapper]: true,
      [props.className]: !!props.className,
    });

    /** Function Binding */

    /** State Creation */
    this.state = {
      wrapperClass,
      recipes: props.recipes,
    };
    console.log('state', this.state);
  }

  componentWillReceiveProps(nextProps) {
    return this.setState({ recipes: nextProps.recipes });
  }

  createListItem = (ingredient, i) => {
    const [toAdd, amount] = ingredient.split(' ');
    return (
      <ListGroupItem key={i} className={style.ingredient}>
        {`${capitalize(toAdd)} - ${amount}`}
      </ListGroupItem>
    );
  };

  createPanels = (recipes) => {
    console.log(recipes)
    return recipes.map((recipe, i) => (
      <Panel
        header={recipe.name}
        eventKey={i}
        key={i}
      >
        <ListGroup className={style.ingredientsList}>
          {recipe.ingredients.map(this.createListItem)}
        </ListGroup>
        <ButtonGroup>
          <Button
            className={style.editBtn}
            type="button"
            onClick={() => this.props.actions.show(recipe)}
          >Edit</Button>
          <Button
            className={style.deleteBtn}
            type="button"
            onClick={this.props.actions.deleteRecipe}
          >Delete</Button>
        </ButtonGroup>
      </Panel>
    ));
  };


  render() {
    const {
      wrapperClass,
      recipes,
    } = this.state;
    console.log('render', recipes)

    return (
      <section className={wrapperClass}>
        <Button
          className={style.addBtn}
          type="button"
          onClick={() => this.props.actions.show()}
        >Add New Recipe</Button>
        <Button
          className={style.addBtn}
          type="button"
          onClick={() => this.props.actions.save()}
        >save</Button>
        <Accordion>
          {this.createPanels(recipes)}

        </Accordion>
      </section>
    );
  }
}