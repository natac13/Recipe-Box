import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment';
import compose from 'recompose/compose';
import classnames from 'classnames';

import {
  ButtonGroup,
  Button,
  Modal,
} from 'react-bootstrap';
import Input from 'Components/Input/';

import style from './style.scss';

class RecipeForm extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    actions: PropTypes.object,
    reset: PropTypes.func,
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
      hideForm: props.hideForm,
      visible: props.visible,
      editing: props.editing,
    };
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      editing: nextProps.editing,
    });
  }

  onSubmit = (values) => {
    const { name } = values;
    const ingredients = values.ingredients.split(/,\s?/);
    if (this.state.editing) {
      // update recipe list with updated recipe
      this.props.actions.editRecipe({ name, ingredients });
      return this.props.reset();
    }
    this.props.actions.addRecipe({
      name,
      ingredients,
    });
    this.props.reset();
  }

  reset = () => {
    this.props.destroy();
    this.props.initialize();
  }

  render() {
    const {
      wrapperClass,
      visible,
      editing,
    } = this.state;

    return (
      <Modal
        dialogClassName={wrapperClass}
        show={visible}
        onHide={this.props.actions.hide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Recipe Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            role="recipeForm"
            className={style.form}
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >

            <Field
              className={style.input}
              name="name"
              component={Input}
              type="input"
              typeOf="text"
              label="Recipe Name"
              placeholder="Healthy Salad"
              required
            />

            <Field
              className={style.textArea}
              name="ingredients"
              component={Input}
              type="textarea"
              label="Ingredients"
              placeholder="Ingredients separated by commas (,)"
              required
            />

            <ButtonGroup className={style.btnGroup}>
              <Button
                className={style.submitBtn}
                type="submit"
              >{editing ? 'Update' : 'Add'}</Button>
              <Button
                className={style.resetBtn}
                type="button"
                onClick={this.reset}
              >Clear</Button>
            </ButtonGroup>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default reduxForm({
  form: 'recipeForm',
})(RecipeForm);
