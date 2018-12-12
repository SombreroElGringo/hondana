import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'register',
      emailError: this.props.emailError,
      pseudoError: this.props.pseudoError,
      passwordError: this.props.passwordError,
      confirmPasswordError: this.props.confirmPasswordError,
    };
  }

  handleSubmit(e) {
    const { type } = this.state;
    const data = {
      email: this.email.value,
      pseudo: this.pseudo.value,
      password: this.password.value,
      confirmPassword: this.confirmPassword.value,
    };

    this.props.onAuth(data, type);
  }

  render() {
    const {
      emailError,
      pseudoError,
      passwordError,
      confirmPasswordError,
    } = this.props;

    return (
      <div>
        <h2 className="sub-title">Inscrivez-vous!</h2>
        <span className="info" />
        <form >
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
              pseudoError ? 'tooltip inpt-d inpt-error' : 'tooltip inpt-d'
            }
          >
            <span className={pseudoError ? 'tooltiptext' : 'invisible'}>
              {pseudoError && pseudoError.message}
            </span>
            <input
              className="field"
              ref={ref => {
                this.pseudo = ref;
              }}
              type="text"
              name="pseudo"
              placeholder="Nom d'utilisateur"
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
          <div
            className={
              confirmPasswordError
                ? 'tooltip inpt-d inpt-error'
                : 'tooltip inpt-d'
            }
          >
            <span
              className={confirmPasswordError ? 'tooltiptext' : 'invisible'}
            >
              {confirmPasswordError && confirmPasswordError.message}
            </span>
            <input
              className="field"
              ref={ref => {
                this.confirmPassword = ref;
              }}
              type="password"
              name="confirmPassword"
              placeholder="Confirmer le mot de passe"
            />
          </div>
          <input className="btn-form" type="button" value="Inscription" onClick={e => this.handleSubmit(e)} />
        </form>
      </div>
    );
  }
}

export default Register;
