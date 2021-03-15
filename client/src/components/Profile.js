import React from "react";
import { Link, withRouter } from "react-router-dom";
import { PROFILE_URL, LOCAL_STORAGE_KEY } from "../utility/constants";
import Spinner from "./partials/Spinner";
import moment from "moment";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileUser: null,
      error: "",
    };
  }

  fetchData = () => {
    const username = this.props.match.params.username;
    if (username === this.props?.user?.username) {
      this.setState({
        profileUser: this.props?.user,
      });
    }
    fetch(`${PROFILE_URL}/${username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          profileUser: data.profile,
          error: "",
        });
      })
      .catch((err) => {
        this.setState({ error: "Not able to fetch data" });
      });
  };

  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.username !== this.props.match.params.username) {
      this.fetchData();
    }
  }

  render() {
    const { profileUser, error } = this.state;

    if (error) {
      return <p className="api-fetch-error">{error}</p>;
    }
    if (!profileUser) {
      return <Spinner />;
    }
    console.log(this.props);
    return (
      <>
        <div className="profile">
          <section className="profile-wrapper flex-center">
            <div className="avatar">
              <img
                className="profile-avatar"
                src={
                  profileUser?.profileImage || "http://i.imgur.com/Xzm3mI0.jpg"
                }
                alt="profile-avatar"
              ></img>
            </div>

            <div className="profile-content">
              <h1 className="profile-name">{profileUser?.name}</h1>
              <p className="profile-locality">{profileUser?.location}</p>
              <p className="profile-specializations">{profileUser?.stack}</p>
              <div className="profile-actions">
                <a className="btn" href="/profiles/follow">
                  <img
                    className="follow-icon"
                    src="/images/plus.svg"
                    alt="follow"
                  />
                  Follow
                </a>
                <a className="btn" href="mailto:abc@gamil.com">
                  <img
                    className="mail-icon"
                    src="/images/mail.svg"
                    alt="mail"
                  />
                  Hire Me
                </a>
              </div>
            </div>
          </section>
          <section className="container">
            {/* <div className="subnav-container"> */}
            <nav className="subnav">
              <ul className="subnav-list flex">
                {/* <li className="subnav-list-item">
                  <a href="/">Collections</a>
                </li> */}
                <li className="subnav-list-item">
                  <a href="/">About</a>
                </li>
              </ul>
            </nav>
            {/* </div> */}
          </section>

          <section className="wrap-inner">
            <div className="about-content container flex">
              <div className="about-content-main">
                <section className="content-section profile-section-bio">
                  <h2 className="section-label">Biography</h2>
                  <p className="empty-bio">
                    {profileUser?.bio ||
                      `${profileUser?.name} hasn’t added a biography yet 🙁`}
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
                  <span>200 Followers</span>
                  <span>90 Following</span>
                </section>
              </div>
              <div className="about-content-sidebar">
                <section className="content-section profile-info-section">
                  <p className="info-item location">
                    <img
                      className="sidebar-icon"
                      src="/images/location.svg"
                      alt="location"
                    />{" "}
                    {profileUser?.location}
                  </p>
                  <p className="info-item created">
                    <img
                      className="sidebar-icon"
                      src="/images/id-card.svg"
                      alt="location"
                    />
                    {`Member since 
                    ${moment(profileUser.createdAt).format("MMMM YYYY")}`}
                  </p>
                </section>
                <section className="content-section profile-social-section">
                  <h2 className="section-label">Social</h2>
                  <ul className="social-link-list">
                    <li>
                      <a href="">
                        <img
                          className="social-icon"
                          src="/images/linkedin.svg"
                          alt="mail"
                        />{" "}
                        linkedin.com/adrienrochet
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img
                          className="social-icon"
                          src="/images/twitter.svg"
                          alt="mail"
                        />{" "}
                        twitteer.com/adrienrochet
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img
                          className="social-icon"
                          src="/images/facebook.svg"
                          alt="mail"
                        />{" "}
                        facebook.com/adrienrochet
                      </a>
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
}

export default withRouter(Profile);
