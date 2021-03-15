import { Link } from "react-router-dom";

function NoMatch() {
  return (
    <section className="error-page container full-height">
      <center>
        <img
          className="error-page__image"
          src="images/404-error.svg"
          alt="no match"
        />
        <h1>☹️ 404 Page Not Found</h1>
        <Link className="error-page__link" to="/">
          Go back to Home Page
        </Link>
      </center>
    </section>
  );
}

export default NoMatch;
