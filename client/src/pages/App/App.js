import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';
import './App.css';
import { connect } from 'react-redux';
import getAppName from '../../redux/selectors/app/getAppName';
import { bindActionCreators } from 'redux';
import { setAppName } from '../../redux/actions/app';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

class App extends Component {
  componentDidMount() {
    const { setAppName } = this.props;
    setTimeout(() => setAppName('SNCF-PLOP'), 3000);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route component={HomePage} exact path="/" />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  appName: getAppName(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setAppName,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
