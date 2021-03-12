import Card from "./Card";
import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolios: [],
      isModalOpen: false,
      tags: [],
      users: [],
      activeTag: "",
    };
  }
  handleTagClick = (tag) => {
    console.log(tag);
    this.setState({
      activeTag: tag,
    });
  };

  componentDidMount() {
    fetch("/api/portfolios")
      .then((res) => res.json())
      .then((res) => {
        let tags = Array.from(
          new Set(res.portfolios.map((portfolio) => portfolio.tagList).flat())
        ).filter((tag) => tag !== "");
        let users = Array.from(
          new Set(res.portfolios.map((portfolio) => portfolio.author.username))
        ).filter((username) => username !== "");
        this.setState(
          {
            portfolios: res.portfolios,
            tags: tags,
            users: users,
          },
          () => console.log(this.state)
        );
      });
  }

  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    if (this.state.portfolios.length === 0) return <p>Loading...</p>;
    let refinedCards = [];
    if (!this.state.activeTag) {
      refinedCards = this.state.portfolios;
    } else {
      refinedCards = this.state.portfolios.filter((portfolio) =>
        portfolio.tagList.includes(this.state.activeTag)
      );
    }
    return (
      <div className="home">
        <section className="hero">
          <h1>Portfolio is a box of chocolates!</h1>
        </section>
        <section className="dashboard">
          <section className="tag-bar">
            {this.state.tags &&
              this.state.tags.map((tag) => (
                <button
                  className={
                    tag === this.state.activeTag
                      ? "tag standard-btn active"
                      : "tag standard-btn"
                  }
                  key={tag}
                  onClick={() => this.handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
          </section>
          <section className="dashboard__card-showcase">
            {refinedCards.map((portfolio) => {
              return (
                <Card
                  prominentImage="https://images.unsplash.com/photo-1603539947678-cd3954ed515d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
                  author={portfolio.author.username}
                  isModalOpen={this.state.isModalOpen}
                  openModal={this.openModal}
                  closeModal={this.closeModal}
                />
              );
            })}
          </section>
        </section>
      </div>
    );
  }
}

export default Home;
