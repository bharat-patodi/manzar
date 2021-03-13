function Profiles() {
  return (
    <>
      <div className="profile">
        <section className="profile-wrapper flex-center">
          <div className="avatar">
            <img
              className="profile-avatar"
              src="https://cdn.dribbble.com/users/6047818/avatars/small/84b15dbafef241b1493507776816d4b0.jpg?1600202707"
              alt="profile-avatar"
            ></img>
          </div>

          <div className="profile-content">
            <h1 className="profile-name">Adrien Rochet</h1>
            <p className="profile-locality">France</p>
            <p className="profile-specializations">
              Mobile Design, UI/Visual Design, Product Design
            </p>
            <div className="profile-actions">
              <a className="btn" href="/profiles/follow">
                + Follow
              </a>
              <a className="btn" href="mailto:abc@gamil.com">
                ✉ Hire Me
              </a>
            </div>
          </div>
        </section>
        <section className="subnav-container">
          {/* <div className="subnav-container"> */}
          <nav className="subnav">
            <ul className="subnav-list flex">
              <li className="subnav-list-item">
                <a href="/">Collections</a>
              </li>
              <li className="subnav-list-item">
                <a href="/">About</a>
              </li>
            </ul>
          </nav>
          {/* </div> */}
        </section>

        <section className="wrap-inner">
          <div className="about-content flex">
            <div className="about-content-main">
              <section className="content-section profile-section-bio">
                <h2 className="section-label">Biography</h2>
                <p className="empty-bio">
                  Adrien Rochet hasn’t added a biography yet 🙁
                </p>
              </section>
              <section class="content-section profile-skills">
                <h2 className="section-label">Skills</h2>
                <ul className="skills-list flex">
                  <li class="btn">css</li>
                  <li class="btn">iphone design</li>
                  <li class="btn">front-end developer</li>
                  <li class="btn">web design</li>
                  <li class="btn">javascript</li>
                </ul>
              </section>
              <section className="content-section profile-status flex">
                <span>200 Followes</span>
                <span>90 Following</span>
              </section>
            </div>
            <div className="about-content-sidebar">
              <section className="content-section profile-info-section">
                <p className="info-item location">📌 Location</p>
                <p className="info-item created">📅 Memeber since Mar 2011</p>
              </section>
              <section className="content-section profile-social-section">
                <h2 className="section-label">Social</h2>
                <ul className="social-link-list">
                  <li>
                    <a href="">🙎‍♀️ dribbble.com/adrienrochet</a>
                  </li>
                  <li>
                    <a href="">🙎‍♀️ twitteer.com/adrienrochet</a>
                  </li>
                  <li>
                    <a href="">🙎‍♀️ facebook.com/adrienrochet</a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Profiles;
