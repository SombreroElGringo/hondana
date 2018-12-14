import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App/App';
import { Provider } from 'react-redux';
import store from './redux';

console.clear();

export default class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
