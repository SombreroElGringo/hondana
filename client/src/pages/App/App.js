import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import getAppName from '../../redux/selectors/app/getAppName';
import { bindActionCreators } from 'redux';
import { setAppName } from '../../redux/actions/app';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Link from 'react-router-dom/es/Link';
import StationPage from '../StationPage/StationPage';

class App extends Component {
  componentDidMount() {
    const { setAppName } = this.props;
    setTimeout(() => setAppName('SNCF-PLOP'), 3000);
  }

  render() {
    return (
      <Router>
        <div className={'App'}>
          <header>
            <nav>
              <div className={'brand'}>
                <img
                  className={'logo'}
                  src="https://png2.kisspng.com/20180303/ede/kisspng-train-station-rail-transport-tgv-logo-high-speed-train-logo-5a9b35fd96c683.4309293215201213416176.png"
                  alt=""
                />
                <div>SNCF Live</div>
              </div>
              <div>
                <Link to={'/'}>Home</Link>
              </div>
            </nav>
          </header>
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
