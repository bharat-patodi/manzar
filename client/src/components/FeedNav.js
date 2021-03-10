import { Link } from "react-router-dom";

export default function FeedNav(props) {
  return (
    <nav className="feed-nav">
      <ul>
        <li onClick={props.removeTab}>
          <Link className={props.activeTab === "" && "active"} to="/">
            Global Feed
          </Link>
        </li>
        {props.activeTab && (
          <li>
            <Link activeClassName="active" to="/">
              #{props.activeTab}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
