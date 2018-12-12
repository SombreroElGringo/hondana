import React from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as axios from 'axios';
import { handle_auth } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import HttpError from '../../components/HttpError/HttpError';
import './AuthPage.css';
import getIsAuth from '../../redux/selectors/app/getIsAuth';
import Register from '../../components/Register/Register';
import Login from '../../components/Login/Login';

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type || 'login',
      token: '',
      errors: [],
      unhandledError: null,
    };
  }

  handleClick(e) {
    let newType = this.state.type === 'register' ? 'login' : 'register';
    this.setState({
      type: newType,
      errors: [],
    });
  }

  handleAuth(data, type) {
    const API_URL = 'http://localhost:5000/auth';

    console.log(data, type);

    const url =
      type === 'register' ? API_URL + '/register' : API_URL + '/login';

    this.setState({
      errors: [],
    });

    axios
      .post(url, data)
      .then(({data}) => {
        console.log(data);
        this.setState({
          token: data.data.token,
        });
      })
      .catch(error => {
        if(error.response && error.response.status === 400) {
          this.setState({
            errors: error.response.data? error.response.data.message : [],
          });
        } else {
          console.log(error);
        }
      });
  }

  render() {
    const { type, errors, unhandledError } = this.state;

    const { isAuth } = this.props;

    const emailError = errors.find(e => e.param === 'email') || null;
    const pseudoError = errors.find(e => e.param === 'pseudo') || null;
    const passwordError = errors.find(e => e.param === 'password') || null;
    const confirmPasswordError =
      errors.find(e => e.param === 'confirmPassword') || null;

    return isAuth ? (
      <Redirect to="/" />
    ) : unhandledError ? (
      <HttpError error={unhandledError} />
    ) : (
      <div>
        <section className="fs-fafafa'">
          <div className="content">
            <div className="content-form">
              <h1 className="title">Hondana</h1>

              {type === 'register' ? (
                <Register
                  onAuth={this.handleAuth.bind(this)}
                  emailError={emailError}
                  pseudoError={pseudoError}
                  passwordError={passwordError}
                  confirmPasswordError={confirmPasswordError}
                />
              ) : (
                <Login
                  onAuth={this.handleAuth.bind(this)}
                  emailError={emailError}
                  passwordError={passwordError}
                />
              )}

              <div className="decorator">
                <span className="decorator-text">OU</span>
              </div>

              <div>
                {type === 'register' ? (
                  <h3 className="form-footer-title">
                    Vous avez un compte ?{' '}
                    <a
                      href="#/"
                      className="form-footer"
                      onClick={e => this.handleClick(e)}
                    >
                      Connectez-vous
                    </a>
                  </h3>
                ) : (
                  <h3 className="form-footer-title">
                    Vous n'avez pas de compte ?{' '}
                    <a
                      href="#/"
                      className="form-footer"
                      onClick={e => this.handleClick(e)}
                    >
                      Inscrivez-vous
                    </a>
                  </h3>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({ isAuth: getIsAuth(state) });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ handleAuth: handle_auth }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
