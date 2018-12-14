import React, { Component } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Header from '../../components/Header/Header';
import AuthPage from '../AuthPage/AuthPage';
import BookPage from '../BookPage/BookPage';
import Detail from '../Detail/Detail';

class App extends Component {
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
            <Route component={Detail} exact path="/bookcases/:id" />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
