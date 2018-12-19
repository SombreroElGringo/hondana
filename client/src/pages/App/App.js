import React, { Component } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Header from '../../components/Header/Header';
import AuthPage from '../AuthPage/AuthPage';
import BookPage from '../BookPage/BookPage';
import BookcasePage from '../BookcasePage/BookcasePage';
import { mapDispatchToProps } from '../../utils/redux_helpers';
import { checkToken } from '../../redux/actions/auth';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    const { checkToken } = this.props;
    checkToken();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route component={HomePage} exact path="/" />
            <Route
              component={() => <AuthPage type="login" />}
              exact
              path="/connexion"
            />
            <Route
              component={() => <AuthPage type="register" />}
              exact
              path="/inscription"
            />
            <Route component={BookPage} exact path="/books/search/" />
            <Route
              component={BookcasePage}
              exact
              path="/bookcases/:bookcaseId"
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps({
    checkToken,
  })
)(App);
