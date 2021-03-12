import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      Copyright left at the store
      <nav>
        <ul>
          <li>
            <Link>Twitter</Link>
          </li>
          <li>
            <Link>Facebook</Link>
          </li>
          <li>
            <Link>Instagram</Link>
          </li>
          <li>
            <Link>Github</Link>
          </li>
          <li>
            <Link>Careers</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
