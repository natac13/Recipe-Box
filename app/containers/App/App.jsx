import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../actions';
import localForage from 'localforage';

import Display from '../../components/Display/';
import Main from 'Components/Main/';

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log(props)
    props.actions.getRecipes();
  }

  render() {
    const { actions, error } = this.props;
    return (
      <div>
        <Display error={error} actions={actions} />
        <Main {...this.props} />
      </div>
    );
  }
}

App.propTypes = {
  error: PropTypes.object,
  actions: PropTypes.object.isRequired,
  appName: PropTypes.string.isRequired,
};

//  Redux Connection
function mapStateToProps(state) {
  return {
    appName: `Natac's Recipe Box`,
    error: state.error,
    data: state.data,
    recipeForm: state.recipeForm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
