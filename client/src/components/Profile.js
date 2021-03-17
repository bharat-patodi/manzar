import React from "react";
import { Link, withRouter } from "react-router-dom";
import { PROFILE_URL, LOCAL_STORAGE_KEY } from "../utility/constants";
import moment from "moment";
import FullPageSpinner from "./partials/FullPageSpinner";
import Thumbnails from "./partials/Thumbnails";

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

  handleFollowClick = (profile) => {
    updateFollowUser(
      profile.username,
      profile.following,
      this.updateFollowedState
    );
  };
  updateFollowedState = (profileUser) => {
    console.log(profileUser);
    this.setState({
      profileUser,
    });
  };

  render() {
    const { profileUser, error } = this.state;

    if (error) {
      return <p className="api-fetch-error full-height">{error}</p>;
    }
    if (!profileUser) {
      return (
        <div className="full-height">
          <FullPageSpinner />
        </div>
      );
    }
    // console.log(this.props);
    return (
      <>
        <div className="profile container">
          <section className="profile-wrapper flex-center">
            <div className="avatar">
              <img
                className="profile-avatar"
                src={profileUser?.avatar || "http://i.imgur.com/Xzm3mI0.jpg"}
                alt="profile-avatar"
              ></img>
            </div>

            <div className="profile-content">
              <h1 className="profile-name">{profileUser?.name}</h1>
              <p className="profile-locality">{profileUser?.location}</p>
              {/* <p className="profile-bio">{profileUser?.bio}</p> */}
              <div className="profile-actions">
                <div className="toggle"></div>
                {profileUser.username === this.props?.user?.username ? (
                  <Link className="standard-btn" to="/settings">
                    Edit profile
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => this.handleFollowClick(profileUser)}
                      className="standard-btn"
                    >
                      <img
                        className="follow-icon"
                        src="/images/plus.svg"
                        alt="follow"
                      />
                      {profileUser.following ? "Unfollow" : "Follow"}{" "}
                    </button>
                    <button>
                      <a className="standard-btn" href="mailto:abc@gamil.com">
                        <img
                          className="mail-icon"
                          src="/images/mail.svg"
                          alt="mail"
                        />
                        Hire Me
                      </a>
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>
          {/* <section className="container">
            <nav className="subnav">
              <ul className="subnav-list flex">
                <li className="subnav-list-item">
                  <a href="/">About</a>
                </li>
              </ul>
            </nav>
          </section> */}

          <section className="wrap-inner">
            <div className="about-content flex">
              <div className="about-content-main">
                <section className="content-section profile-section-bio">
                  <h2 className="section-label">About Me</h2>
                  <p className="empty-description">
                    {profileUser?.bio ||
                      `${profileUser?.name} hasn’t added a biography yet 🙁`}
                  </p>
                </section>
                <section class="content-section profile-skills">
                  <h2 className="section-label">Skills</h2>
                  <ul className="skills-list flex">
                    {!profileUser?.stackList
                      ? ""
                      : profileUser?.stackList.map((stack) => {
                          return <li class="skill-btn">{stack}</li>;
                        })}
                  </ul>
                </section>
                <span className="profile-status flex"></span>
                <Thumbnails username={profileUser.username} />
              </div>
              <div className="about-content-sidebar">
                <section className="content-section profile-info-section">
                  <p className="info-item location">
                    <img
                      className="sidebar-icon"
                      src="/images/location.svg"
                      alt="location"
                    />{" "}
                    {profileUser?.location || (
                      <span className="empty">Not added</span>
                    )}
                  </p>
                  <p className="info-item created">
                    <img
                      className="sidebar-icon"
                      src="/images/id-card.svg"
                      alt="location"
                    />
                    {`Member since 
                    ${moment(profileUser?.createdAt).format("MMMM YYYY")}`}
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
                        />
                        {profileUser?.socialLinks?.linkedin || (
                          <span className="empty">Not added</span>
                        )}
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img
                          className="social-icon"
                          src="/images/twitter.svg"
                          alt="mail"
                        />
                        {profileUser?.socialLinks?.twitter || (
                          <span className="empty">Not added</span>
                        )}
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img
                          className="social-icon"
                          src="/images/github.svg"
                          alt="mail"
                        />
                        {profileUser?.socialLinks?.github || (
                          <span className="empty">Not added</span>
                        )}
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

export function updateFollowUser(username, following, updateFollowedState) {
  let requestOptions;
  if (!following) {
    requestOptions = {
      method: "POST",
      headers: {
        authorization: localStorage.getItem(LOCAL_STORAGE_KEY),
      },
    };
  } else {
    requestOptions = {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem(LOCAL_STORAGE_KEY),
      },
    };
  }
  fetch(`${PROFILE_URL}/${username}/follow`, requestOptions)
    .then(async (res) => {
      if (!res.ok) {
        const { errors } = await res.json();
        return await Promise.reject(errors);
      }
      return res.json();
    })
    .then(({ profile }) => updateFollowedState(profile))
    .catch((errors) => {
      console.log(errors);
    });
}

export default withRouter(Profile);
