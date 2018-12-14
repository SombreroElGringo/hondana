import React from 'react';
import { Redirect } from 'react-router-dom';
import { mapStateToProps, mapDispatchToProps } from '../../utils/redux_helpers';
import { handle_auth } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import HttpError from '../../components/HttpError/HttpError';
import './AuthPage.css';
import getAccess from '../../redux/selectors/auth/getAccess';
import getErrors from '../../redux/selectors/auth/getErrors';
import Register from '../../components/Register/Register';
import Login from '../../components/Login/Login';

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type || 'login',
    };
  }

  handleClick(e) {
    let newType = this.state.type === 'register' ? 'login' : 'register';
    this.setState({
      type: newType,
    });
  }

  render() {
    const { type } = this.state;

    const { access, errors } = this.props;

    const emailError = errors.find(e => e.param === 'email') || null;
    const pseudoError = errors.find(e => e.param === 'pseudo') || null;
    const passwordError = errors.find(e => e.param === 'password') || null;
    const confirmPasswordError =
      errors.find(e => e.param === 'confirmPassword') || null;

    return access ? (
      <Redirect to="/" />
    ) : typeof errors === 'object' && !Array.isArray(errors) ? (
      <HttpError error={errors.status} />
    ) : (
      <div id="auth">
        <section className="fs-fafafa'">
          <div className="content">
            <div className="content-form">
              <h1 className="title">Hondana</h1>

              {type === 'register' ? (
                <Register
                  onAuth={this.props.handleAuth}
                  emailError={emailError}
                  pseudoError={pseudoError}
                  passwordError={passwordError}
                  confirmPasswordError={confirmPasswordError}
                />
              ) : (
                <Login
                  onAuth={this.props.handleAuth}
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

export default connect(
  mapStateToProps({
    access: getAccess,
    errors: getErrors,
  }),
  mapDispatchToProps({
    handleAuth: handle_auth,
  })
)(Auth);
