import { Component } from "react";
import { Link } from "react-router-dom";
import { REGISTER_URL } from "../utility/constants";
import { withRouter } from "react-router-dom";
import Spinner from "./partials/Spinner";

class Register extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "",
    errors: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    requestError: "",
    validationError: "",
    isRegistering: false,
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isRegistering: true });
    const { name, username, email, password } = this.state;
    const user = { name, username, email, password };
    const errors = this.state.errors;

    if (!errors.name && !errors.username && !errors.email && !errors.password) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user }),
      };

      fetch(REGISTER_URL, requestOptions)
        .then((res) => {
          if (res.status !== 422 && !res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          if (data.errors) {
            const error = data.errors.body[0];

            this.setState({
              validationError: error.includes("email")
                ? "Email is already exist"
                : "Username is already exist",
            });
          } else {
            this.props.updateUser(data.user);
            this.props.history.push("/");
          }
          this.setState({ isRegistering: false });
        })
        .catch((error) => {
          this.setState({
            requestError: "Not able to login",
            isRegistering: false,
          });
        });
    }
  };
  handleChange = ({ target }) => {
    const { name, value } = target;
    let errors = this.state.errors;
    validateUserInfo(value, name, errors);

    this.setState({
      [name]: value,
      errors: errors,
    });
  };
  render() {
    const {
      name,
      username,
      email,
      password,
      errors,
      validationError,
      requestError,
      isRegistering,
    } = this.state;

    return (
      <section className="full-height auth">
        <div className="container">
          <h1 className="auth__heading">Sign up</h1>
          <p className="auth__link">
            <Link to="/login">Have an account?</Link>
          </p>
          <p className="auth__server-error">{validationError}</p>
          <p className="auth__server-error">{requestError}</p>
          <form onSubmit={this.handleSubmit} className="auth__form">
            <fieldset className="auth__form-group">
              <label className="auth__form-label" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                onChange={this.handleChange}
                name="name"
                value={name}
                className={`auth__form-control ${errors.name && "auth__error"}`}
                type="text"
                placeholder="Enter name"
                required
              />
            </fieldset>
            {errors.name ? (
              <span className="auth__error-msg">{errors.name}</span>
            ) : (
              ""
            )}
            <fieldset className="auth__form-group">
              <label className="auth__form-label" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                onChange={this.handleChange}
                name="username"
                value={username}
                className={`auth__form-control ${
                  errors.username && "auth__error"
                }`}
                type="text"
                placeholder="Enter username"
                required
              />
            </fieldset>
            {errors.username ? (
              <span className="auth__error-msg">{errors.username}</span>
            ) : (
              ""
            )}
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
              {isRegistering ? <Spinner /> : "Sign up"}
            </button>
          </form>
        </div>
      </section>
    );
  }
}

function validateUsername(username) {
  return username.length >= 6;
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validatePassword(password) {
  const re = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
  return re.test(password);
}

export function validateUserInfo(value, name, errors) {
  switch (name) {
    case "name":
      errors.name = !value.length ? "Name is required" : "";
      break;
    case "username":
      errors.username = !value.length
        ? "Username is required"
        : !validateUsername(value)
        ? "Username must be atleast 6 characters"
        : "";
      break;
    case "email":
      errors.email = !value.length
        ? "Email is required"
        : !validateEmail(value)
        ? "Email is invalid"
        : "";
      break;
    case "password":
      errors.password = !value.length
        ? "Password is required"
        : !validatePassword(value)
        ? "Password must contain a letter, a number"
        : value.length < 6
        ? "Password must contain atleast 6 characters"
        : "";
      break;
    default:
      break;
  }
}

export default withRouter(Register);
