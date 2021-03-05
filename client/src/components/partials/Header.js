import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        Logo
        <ul>
          <li>
            <Link>Home</Link>
          </li>
          <li>
            <Link>About Us</Link>
          </li>
          <li>
            <Link>Contact Us</Link>
          </li>
          <li>
            <Link>Portfolios</Link>
          </li>
          <li>
            <Link>Premium</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
