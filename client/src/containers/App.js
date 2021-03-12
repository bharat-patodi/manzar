import { Component } from "react";
import "../styles/App.scss";
import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";
import FullPageSpinner from "../components/partials/FullPageSpinner";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import AddPortfolio from "../components/AddPortfolio";
import NoMatch from "../components/NoMatch";
import { localStorageKey, currentUserURL } from "../components/utility/utility";

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isVerifying: true,
  };
  componentDidMount() {
    const token = localStorage.getItem(localStorageKey);
    if (token) {
      const requestOptions = {
        method: "GET",
        headers: { authorization: localStorage.getItem(localStorageKey) },
      };
      fetch(currentUserURL, requestOptions)
        .then(async (res) => {
          if (!res.ok) {
            const { errors } = await res.json();
            return await Promise.reject(errors);
          }
          return res.json();
        })
        .then(({ user }) => {
          this.updateUser(user);
        })
        .catch((errors) => {
          console.log(errors);
          this.setState({ isVerifying: false });
        });
    } else {
      this.setState({ isVerifying: false });
    }
  }
  updateUser = (user) => {
    this.setState({ isLoggedIn: true, user, isVerifying: false });
    localStorage.setItem(localStorageKey, user.token);
  };
  deleteUser = () => {
    this.setState({ isLoggedIn: false, user: null });
    localStorage.setItem(localStorageKey, "");
  };
  render() {
    const { isLoggedIn, user, isVerifying } = this.state;

    if (isVerifying) {
      return <FullPageSpinner />;
    }

    return (
      <Router>
        <Header isLoggedIn={isLoggedIn} user={user} />
        {isLoggedIn ? (
          <AuthenticatedApp
            user={user}
            updateUser={this.updateUser}
            deleteUser={this.deleteUser}
          />
        ) : (
          <UnAuthenticatedApp updateUser={this.updateUser} />
        )}
        <Footer />
      </Router>
    );
  }
}

function AuthenticatedApp(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      {/* <Route path="/profiles/:username">
        <Profile user={props.user} />
      </Route>
      <Route path="/portfolios/:id">
        <SingleArticle user={props.user} />
      </Route> */}
      <Route path="/editor">
        <AddPortfolio />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

function UnAuthenticatedApp(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/editor">
        <AddPortfolio />
      </Route>
      {/* <Route path="/portfolios/:id">
        <SingleArticle user={props.user} />
      </Route> */}
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

export default App;
