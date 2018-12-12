import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'login',
      emailError: this.props.emailError,
      passwordError: this.props.passwordError,
    };
  }

  handleSubmit(e) {
    const { type } = this.state;

    const data = {
      email: this.email.value,
      password: this.password.value,
    };

    this.props.onAuth(data, type);
  }

  render() {
    const { emailError, passwordError } = this.props;

    return (
      <div>
        <h2 className={'sub-title'}>Vous nous avez manqué !</h2>
        <span className="info" />
        <form onSubmit={e => this.handleSubmit(e)}>
          <div
            className={
              emailError ? 'tooltip inpt-d inpt-error' : 'tooltip inpt-d'
            }
          >
            <span className={emailError ? 'tooltiptext' : 'invisible'}>
              {emailError && emailError.msg}
            </span>
            <input
              className="field"
              ref={ref => {
                this.email = ref;
              }}
              type="text"
              name="email"
              placeholder="E-mail"
            />
          </div>

          <div
            className={
              passwordError ? 'tooltip inpt-d inpt-error' : 'tooltip inpt-d'
            }
          >
            <span className={passwordError ? 'tooltiptext' : 'invisible'}>
              {passwordError && passwordError.msg}
            </span>
            <input
              className="field"
              ref={ref => {
                this.password = ref;
              }}
              type="password"
              name="password"
              placeholder="Mot de passe"
            />
          </div>

          <input className="btn-form" type="submit" value="Se connecter" />
        </form>
      </div>
    );
  }
}

export default Login;
