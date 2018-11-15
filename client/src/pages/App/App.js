import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';
import './App.css';
import {connect} from "react-redux";
import getAppName from "../../redux/selectors/app/getAppName";
import {bindActionCreators} from "redux";
import {setAppName} from "../../redux/actions/app";


class App extends Component {
	componentDidMount(){
		const {setAppName} = this.props;
		setTimeout(() => setAppName('SNCF-PLOP'), 3000)
	}
  render() {
		const {appName} = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {appName}
          </a>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
	appName: getAppName(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
	setAppName
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
