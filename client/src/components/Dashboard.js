import Card from "./Card";
import React from "react";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolios: [],
      isModalOpen : false
    };
  }
  componentDidMount() {
    fetch("/api/portfolios")
      .then((res) => res.json())
      .then((res) => {
        console.log(res.portfolios);
        console.log(res.url, res.favorited);
        this.setState(
          {
            portfolios: res.portfolios,
          },
          () => {
            console.log(this.state);
            console.log(this.state.portfolios[1].author.username);
          }
        );
      });
  }

  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.setState({ isModalOpen: false });
  

  render() {
    if (this.state.portfolios.length === 0) return <p>Loading...</p>;
    return (
      <section className="dashboard">
        <div className="dashboard__card-showcase">
          <Card
            prominentImage="https://images.unsplash.com/photo-1603539947678-cd3954ed515d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
            title="Getify Portfolio"
            author={this.state.portfolios[1].author.username}
            isModalOpen = {this.state.isModalOpen}
            openModal = {this.openModal}
            closeModal = {this.closeModal}

          />
        </div>
      </section>
    );
  }
}

export default Dashboard;
