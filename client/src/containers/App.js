import "../styles/App.scss";
import Header from "../components/partials/Header";
import Footer from "../components/partials/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Register from "../components/Register";
import Login from "../components/Login";

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
