import { Component } from "react";
import Loader from "./Loader";
import moment from "moment";
import { Link } from "react-router-dom";
// import TagPills from "./TagPills";
// import Pagination from "./Pagination";
import { updateFavoritePortfolio } from "../Modal";
import {
  PORTFOLIOS_URL,
  FEED_URL,
  LOCAL_STORAGE_KEY,
} from "../../utility/constants";

class PortfolioList extends Component {
  state = {
    portfolioList: null,
    activePageIndex: 0,
    portfolioPerPage: 20,
    error: "",
  };
  updateData = () => {
    const { activeFeed, username, activeTag } = this.props;
    const { activePageIndex, portfolioPerPage } = this.state;
    let url = PORTFOLIOS_URL;
    let query = `limit=${portfolioPerPage}&offset=${
      portfolioPerPage * activePageIndex
    }`;

    if (activeTag) {
      query += `&tag=${activeTag}`;
    }

    if (activeFeed === "personal") {
      url = FEED_URL;
    } else if (activeFeed === "favorited") {
      query += `&favorited=${username}`;
    } else if (activeFeed === "profileFeed") {
      query += `&author=${username}`;
    }

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage[LOCAL_STORAGE_KEY]
          ? localStorage.getItem(LOCAL_STORAGE_KEY)
          : "",
      },
    };

    fetch(`${url}?${query}`, requestOptions)
      .then(async (res) => {
        if (!res.ok) {
          const { errors } = await res.json();
          return await Promise.reject(errors);
        }
        return res.json();
      })
      .then((data) => {
        this.setState(({ portfolioList }) => ({
          portfolioList: portfolioList
            ? portfolioList.concat(data.portfolios)
            : data.portfolios,
        }));
      })
      .catch((errors) => {
        this.setState({
          error: "Not able to fetch portfolios",
        });
      });
  };
  componentDidMount() {
    this.updateData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.activeFeed !== this.props.activeFeed ||
      prevState.activePageIndex !== this.state.activePageIndex
    ) {
      this.setState(
        ({ activePageIndex }) => ({
          portfolioList: null,
          activePageIndex:
            prevProps.activeFeed !== this.props.activeFeed
              ? 0
              : activePageIndex,
        }),
        () => {
          this.updateData();
        }
      );
    }
  }
  handlePageClick = (activePageIndex) => {
    this.setState({
      activePageIndex,
    });
  };
  handleFavoriteClick = (id) => {
    const portfolio = this.state.portfolioList.find(
      (portfolio) => portfolio.id === id
    );
    updateFavoritePortfolio(
      portfolio.id,
      portfolio.favorited,
      this.updateFavoritedState
    );
  };
  updateFavoritedState = (updatedPortfolio) => {
    const portfolioList = [...this.state.portfolioList];
    let favoritedPortfolio = portfolioList.find(
      (portfolio) => portfolio.id === updatedPortfolio.id
    );
    favoritedPortfolio.favorited = updatedPortfolio.favorited;
    favoritedPortfolio.favoritesCount = updatedPortfolio.favoritesCount;
    this.setState({
      portfolioList,
    });
  };
  render() {
    const {
      portfolioList,
      activePageIndex,
      portfolioPerPage,
      error,
    } = this.state;

    if (error) {
      return <p className="article-preview">{error}</p>;
    }

    if (!portfolioList && !error) {
      return <Loader />;
    }

    if (!portfolioList?.length) {
      return <h3 className="article-preview">No portfolios...</h3>;
    }

    return (
      <>
        {portfolioList.map((portfolio, i) => (
          <div key={i} className="portfolio-card">
            <div className="portfolio-card__meta">
              <Link
                to={`/profiles/${portfolio.author.username}`}
                className="portfolio-card__profile"
              >
                <img
                  src={
                    portfolio.author.avatar || "http://i.imgur.com/Xzm3mI0.jpg"
                  }
                  alt="avatar"
                />
                <div className="portfolio-card__names">
                  <h6>{portfolio.author.name}</h6>
                  <p>@{portfolio.author.username}</p>
                </div>
              </Link>
              <div className="portfolio-card__info">
                <h5 className="portfolio-card__type">
                  {portfolio.type ?? "Personal portfolio"}
                </h5>
                <p className="portfolio-card__avail">
                  <span
                    className={`portfolio-card__avail-sign ${
                      portfolio.author.availability ? "active" : ""
                    }`}
                  ></span>
                  {portfolio.author.availability
                    ? "Available"
                    : "Not available"}
                </p>
              </div>
            </div>
            <Link to={`portfolios/${portfolio.id}`}>
              <img
                className="portfolio-card__preview"
                src={
                  portfolio.image ??
                  "https://images.unsplash.com/photo-1612832020542-2b3125530d4a?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                }
                alt="portfolio preview"
              />
            </Link>
            <div className="portfolio-card__meta-bottom">
              <p>📍 {portfolio.author.location ?? "Any where"}</p>
              <button
                onClick={() => this.handleFavoriteClick(portfolio.id)}
                className={`portfolio-card__btn-fv ${
                  portfolio.favorited ? "active" : ""
                }`}
              >
                <span className="ion-heart">❤️</span> {portfolio.favoritesCount}
              </button>
            </div>
          </div>
        ))}
        {/* <Pagination
          articlePerPage={articlePerPage}
          activePageIndex={activePageIndex}
          totalArticlesCount={totalArticlesCount}
          handlePageClick={this.handlePageClick}
          error={error}
        /> */}
      </>
    );
  }
}

export default PortfolioList;
