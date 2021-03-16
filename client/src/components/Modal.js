import React from "react";
import { Link, withRouter } from "react-router-dom";
import Comments from "./partials/Comments";
import Thumbnails from "./partials/Thumbnails";
import { PORTFOLIOS_URL, LOCAL_STORAGE_KEY } from "../utility/constants";
import FullPageSpinner from "./partials/FullPageSpinner";

class Modal extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      portfolio: null,
      error: "",
    };
  }

  fetchData = () => {
    let id = this.props.match.params.id;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem(LOCAL_STORAGE_KEY),
      },
    };

    fetch(`${PORTFOLIOS_URL}/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          portfolio: data.portfolio,
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

  render() {
    const { portfolio, error } = this.state;
    const { user } = this.props;

    if (error) {
      return <p className="api-fetch-error">{error}</p>;
    }
    if (!portfolio) {
      return (
        <div className="full-height">
          <FullPageSpinner />
        </div>
      );
    }
    return (
      <>
        <div className="overlay">
          <div className="overlay__close-button">
            <button className="close-btn" onClick={this.props.closeModal}>
              x
            </button>
          </div>
          <div className="overlay__modal">
            <div className="overlay__modal-container">
              <div className="overlay__modal-content-container">
                <div className="modal__user">
                  <div className="user-info flex-between">
                    <div className="user-info__container">
                      <Link to={`/profiles/${portfolio.author.username}`}>
                        <img
                          className="user-avatar"
                          src={
                            portfolio.image || "http://i.imgur.com/Xzm3mI0.jpg"
                          }
                          alt="user-profile-avatar"
                        ></img>
                      </Link>
                      <div className="user-info__header-details">
                        <h1 className="portfolio-title">
                          {portfolio.title || "Personal portfolio website"}
                        </h1>
                        <div className="flex">
                          <Link to={`/profiles/${portfolio.author.username}`}>
                            <h4 className="user-link">
                              {portfolio.author.name}
                            </h4>
                          </Link>

                          <Link
                            to={`/profiles/${portfolio.author.username}/follow`}
                          >
                            <span className="user-follow">Follow</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="user-info__header-actions">
                      <Link to={portfolio.url}>
                        <button className="btn">Portfolio</button>
                      </Link>
                      <a className="btn" href="/profile">
                        🖤 {portfolio.favoritesCount}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="modal__portfolio">
                  <iframe
                    title="portfolio"
                    src={portfolio.url}
                    frameBorder="0"
                    className="portfolio-preview"
                    height="600%"
                    width="100%"
                  />
                  {/* <a href="https://jonny.me/"alt="portfolio-link" className="portfolio-link"/> */}
                  {/* <a href="https://jonny.me/" className="portfolio-item-link"
                            style={{backgroundImage: "url(" + "https://images.unsplash.com/photo-1603539947678-cd3954ed515d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80" + ")"}}
                            >

                            </a>     */}
                </div>

                <section className="description-container">
                  <p>{portfolio.description}</p>

                  <p>
                    I am available for work :
                    <br />
                    <a href={`mailto:${portfolio.author.email}`}>
                      {portfolio.author.email}
                    </a>
                  </p>
                </section>

                <section className="feedback-section">
                  <Comments id={portfolio.id} user={user} />
                </section>
              </div>

              <section className="user-details-section">
                <div className="user-avatar-container flex">
                  <span className="user-avatar-line"></span>
                  <Link to={`/profiles/${portfolio.author.username}`}>
                    <img
                      className="user-avatar"
                      src={portfolio.image || "http://i.imgur.com/Xzm3mI0.jpg"}
                      alt="user-profile-avatar"
                    ></img>
                  </Link>
                  <span className="user-avatar-line"></span>
                </div>
                <Link to={`/profiles/${portfolio.author.username}`}>
                  <h4 className="user-link">{portfolio.author.name}</h4>
                </Link>
                <div className="user-bio">{portfolio.author.bio}</div>
              </section>

              {/* <section className="more-by-user-section">
                <Thumbnails portfolio={portfolio} />
              </section> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Modal);
