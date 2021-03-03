import "../styles/App.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Team from "../components/Team";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Team />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
