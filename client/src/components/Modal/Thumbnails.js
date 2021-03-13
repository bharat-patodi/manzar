function Thumbnails(props) {
  return (
    <>
      <div className="more-by-heading flex">
        <h4>More by Masud Rana</h4>
        <a className="btn" href="/profile">
          View Profile
        </a>
      </div>
      <div className="more-by-thumbnails">
        <ul className="thumbnails-list">
          <li className="thumbnails-list-items">
            <div className="thumbnails">
              <img
                src="https://images.unsplash.com/photo-1603539947678-cd3954ed515d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
                alt="portfolio-title"
              ></img>
            </div>
            <div className="thumbnail-portfolio-title">Acency Landing Page</div>
          </li>
          <li className="thumbnails-list-items">
            <div className="thumbnails">
              <img
                src="https://images.unsplash.com/photo-1603539947678-cd3954ed515d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
                alt="portfolio-title"
              ></img>
            </div>
            <div className="thumbnail-portfolio-title">Acency Landing Page</div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Thumbnails;
