import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import getAppName from '../../redux/selectors/app/getAppName';
import { bindActionCreators } from 'redux';
import { setAppName } from '../../redux/actions/app';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import StationPage from '../StationPage/StationPage';
import Header from '../../components/Default/Header/Header';

class App extends Component {
  componentDidMount() {
    const { setAppName } = this.props;
    setTimeout(() => setAppName('SNCF-PLOP'), 3000);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <Switch>
            <Route component={HomePage} exact path="/" />
            <Route component={StationPage} exact path="/gare/:id([0-9]+)" />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
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
