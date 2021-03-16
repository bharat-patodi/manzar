import { Component } from "react";
import { Link } from "react-router-dom";
import PortfolioList from "./partials/PortfolioList";
import TagList from "./partials/TagList";

class Home extends Component {
  state = {
    activeFeed: "global",
    activeTag: "",
  };
  handleFeedClick = (activeFeed) => {
    if (activeFeed !== this.state.activeTag) {
      this.setState({
        activeFeed: activeFeed,
        activeTag: "",
      });
    }
  };
  handleTagClick = (tag) => {
    this.setState({
      activeTag: tag,
      activeFeed: tag,
    });
  };
  render() {
    const { activeFeed, activeTag } = this.state;
    return (
      <main className="home">
        <section className="hero">
          <div className="container">
            <h1>Portfolio is a box of chocolates!</h1>
            <Link to="/editor">
              <button className="btn-large standard-btn hero-btn">
                Add Portfolio
              </button>
            </Link>
          </div>
        </section>

        <section className="dashboard">
          <div className="container flex">
            <div className="home__portfolios">
              <ul className="home__feed-btns">
                <li
                  onClick={() => this.handleFeedClick("global")}
                  className={`home__feed-btn ${
                    activeFeed === "global" ? "active" : ""
                  }`}
                >
                  All
                </li>
                {activeTag ? (
                  <li
                    onClick={() => this.handleFeedClick(activeTag)}
                    className={`home__feed-btn ${
                      activeFeed === activeTag ? "active" : ""
                    }`}
                  >
                    #{activeTag}
                  </li>
                ) : (
                  ""
                )}
              </ul>

              <PortfolioList activeFeed={activeFeed} activeTag={activeTag} />
            </div>

            <aside className="home__sidebar">
              <div className="home__tag-container">
                <p className="heading">Popular Tags</p>
                <TagList
                  handleTagClick={this.handleTagClick}
                  activeTag={activeTag}
                />
              </div>
            </aside>
          </div>
        </section>
      </main>
    );
  }
}

export default Home;
