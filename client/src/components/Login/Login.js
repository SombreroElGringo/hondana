import React from 'react';

class Login extends React.Component {
  handleSubmit(e) {
    const type = 'login';
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
        <form>
          <div
            className={
              emailError ? 'tooltip inpt-d inpt-error' : 'tooltip inpt-d'
            }
          >
            <span className={emailError ? 'tooltiptext' : 'invisible'}>
              {emailError && emailError.message}
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
              {passwordError && passwordError.message}
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

          <input
            className="btn-form"
            type="button"
            value="Se connecter"
            onClick={e => this.handleSubmit(e)}
          />
        </form>
      </div>
    );
  }
}

export default Login;
