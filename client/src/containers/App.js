import { Component } from "react";
import "../styles/App.scss";
import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";
import FullPageSpinner from "../components/partials/FullPageSpinner";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import AddPortfolio from "../components/AddPortfolio";
import NoMatch from "../components/NoMatch";
import { LOCAL_STORAGE_KEY, CURRENT_USER_URL } from "../utility/constants";
import Profile from "../components/Profile";
import Modal from "../components/Modal";

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isVerifying: true,
    isModalOpen: false,
  };
  updateUser = (user) => {
    this.setState({ isLoggedIn: true, user, isVerifying: false });
    localStorage.setItem(LOCAL_STORAGE_KEY, user.token);
  };
  deleteUser = () => {
    this.setState({ isLoggedIn: false, user: null });
    localStorage.setItem(LOCAL_STORAGE_KEY, "");
  };

  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.setState({ isModalOpen: false });

  componentDidMount() {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (token) {
      const requestOptions = {
        method: "GET",
        headers: { authorization: localStorage.getItem(LOCAL_STORAGE_KEY) },
      };
      fetch(CURRENT_USER_URL, requestOptions)
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
  render() {
    const { isLoggedIn, user, isVerifying, isModalOpen } = this.state;

    if (isVerifying) {
      return <FullPageSpinner />;
    }

    return (
      <>
        <Header isLoggedIn={isLoggedIn} user={user} />
        {isLoggedIn ? (
          <AuthenticatedApp
            isModalOpen={isModalOpen}
            openModal={this.openModal}
            closeModal={this.closeModal}
            user={user}
            updateUser={this.updateUser}
            deleteUser={this.deleteUser}
          />
        ) : (
          <UnAuthenticatedApp
            updateUser={this.updateUser}
            isModalOpen={isModalOpen}
            openModal={this.openModal}
            closeModal={this.closeModal}
          />
        )}
        <Footer />
      </>
    );
  }
}

function AuthenticatedApp(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/profiles/:username">
        <Profile user={props.user} />
      </Route>
      <Route path="/portfolios/:id">
        <Modal user={props.user} />
      </Route>
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
        <Register updateUser={props.updateUser} />
      </Route>
      <Route path="/login">
        <Login updateUser={props.updateUser} />
      </Route>
      <Route path="/profiles/:username">
        <Profile user={props.user} />
      </Route>
      <Route path="/editor">
        <AddPortfolio />
      </Route>
      <Route path="/portfolios/:id" component={Modal} />
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

export default App;
