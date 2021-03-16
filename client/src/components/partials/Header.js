import { NavLink, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="container flex">
        <Link className="header__logo" to="/">
          Manzr
        </Link>
        <nav>
          {props.isLoggedIn ? (
            <AuthHeader user={props.user} />
          ) : (
            <NonAuthHeader />
          )}
        </nav>
      </div>
    </header>
  );
}

function NonAuthHeader() {
  return (
    <ul className="header__links">
      <li>
        <NavLink
          className="header__nav-link"
          activeClassName="active"
          to="/"
          exact
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className="header__nav-link"
          activeClassName="active"
          to="/login"
        >
          Sign In
        </NavLink>
      </li>
      <li>
        <NavLink
          className="header__nav-link"
          activeClassName="active"
          to="/register"
        >
          Sign Up
        </NavLink>
      </li>
    </ul>
  );
}

function AuthHeader(props) {
  return (
    <ul className="header__links">
      <li>
        <NavLink
          className="header__nav-link"
          activeClassName="active"
          to="/"
          exact
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          className="header__nav-link"
          activeClassName="active"
          to="/editor"
        >
          New Portfolio
        </NavLink>
      </li>
      <li>
        <NavLink
          className="header__nav-link"
          activeClassName="active"
          to="/settings"
        >
          Settings
        </NavLink>
      </li>
      <li>
        <NavLink
          className="header__nav-link avatar-div"
          activeClassName="active"
          to={`/profiles/${props.user.username}`}
        >
          <img
            src={props.user.avatar || "http://i.imgur.com/Xzm3mI0.jpg"}
            className="header__avatar"
            alt="user avatar"
          />
          {props.user.username}
        </NavLink>
      </li>
    </ul>
  );
}

export default Header;
