import { Component } from "react";
import { Link } from "react-router-dom";
import { loginURL } from "./utility/utility";
import { validateUserInfo } from "./Register";
import { withRouter } from "react-router-dom";
import Spinner from "./partials/Spinner";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
    requestError: "",
    validationError: "",
    isLogging: false,
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLogging: true });
    const { email, password } = this.state;
    const user = { email, password };
    const errors = this.state.errors;

    if (!errors.email && !errors.password) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user }),
      };
      fetch(loginURL, requestOptions)
        .then((res) => {
          if (res.status !== 422 && !res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          if (data.errors) {
            this.setState({
              validationError: data.errors.body[0],
            });
          } else {
            this.props.updateUser(data.user);
            this.props.history.push("/");
          }
          this.setState({ isLogging: false });
        })
        .catch((error) => {
          this.setState({
            requestError: "Not able to login",
            isLogging: false,
          });
        });
    }
  };
  handleChange = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;

    validateUserInfo(value, name, errors);

    this.setState({
      [name]: value,
      errors: errors,
    });
  };
  render() {
    const {
      email,
      password,
      errors,
      validationError,
      requestError,
      isLogging,
    } = this.state;

    return (
      <section className="full-height auth">
        <div className="container">
          <h1 className="auth__heading">Sign In</h1>
          <p className="auth__link">
            <Link to="/register">Need an account?</Link>
          </p>
          <p className="auth__server-error">{validationError}</p>
          <p className="auth__server-error">{requestError}</p>
          <form onSubmit={this.handleSubmit} className="auth__form">
            <fieldset className="auth__form-group">
              <label className="auth__form-label" htmlFor="username">
                Email
              </label>
              <input
                onChange={this.handleChange}
                name="email"
                value={email}
                className={`auth__form-control ${
                  errors.email && "auth__error"
                }`}
                type="email"
                placeholder="Enter email"
                required
              />
            </fieldset>
            {errors.email ? (
              <span className="auth__error-msg">{errors.email}</span>
            ) : (
              ""
            )}
            <fieldset className="auth__form-group">
              <label className="auth__form-label" htmlFor="username">
                Password
              </label>
              <input
                onChange={this.handleChange}
                name="password"
                value={password}
                className={`auth__form-control ${
                  errors.password && "auth__error"
                }`}
                type="password"
                placeholder="Enter password"
                required
              />
            </fieldset>
            {errors.password ? (
              <span className="auth__error-msg">{errors.password}</span>
            ) : (
              ""
            )}
            <button type="submit" className="btn-large">
              {isLogging ? <Spinner /> : "Sign In"}
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default withRouter(Login);
