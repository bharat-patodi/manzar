import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container flex">
        <small className="footer__small">Copyright left at the store</small>
        <nav>
          <ul className="footer__links">
            <li>
              <Link to="/">Twitter</Link>
            </li>
            <li>
              <Link to="/">Facebook</Link>
            </li>
            <li>
              <Link to="/">Instagram</Link>
            </li>
            <li>
              <Link to="https://github.com/bharat-patodi/manzar">Github</Link>
            </li>
            <li>
              <Link to="/">Careers</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
