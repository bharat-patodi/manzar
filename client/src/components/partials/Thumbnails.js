import React from "react";
import { Link, withRouter } from "react-router-dom";
import { PORTFOLIOS_URL } from "../../utility/constants";
import Loader from "./Loader";

class Thumbnails extends React.Component {
  state = {
    portfolioList: null,
    error: "",
  };

  fetchData = () => {
    const username = this.props.username;

    fetch(`${PORTFOLIOS_URL}?author=${username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          portfolioList: data.portfolios,
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
    const { portfolioList, error } = this.state;

    if (error) {
      return <p>{error}</p>;
    }

    if (!portfolioList) {
      return <Loader />;
    }

    return (
      <>
        <div className="more-by-thumbnails">
          <h3 className="thumbnail-label">Portfolios</h3>
          <ul className="thumbnails-list">
            {portfolioList.map((portfolio) => (
              <li key={portfolio.id} className="thumbnails-list-items">
                <div className="thumbnails">
                  <img
                    src={
                      portfolio.image ||
                      "https://images.unsplash.com/photo-1612832020542-2b3125530d4a?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                    }
                    alt="portfolio-title"
                  ></img>
                </div>
                <div className="thumbnail-portfolio-title">
                  {portfolio.type || "Personal portfolio"}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default withRouter(Thumbnails);
