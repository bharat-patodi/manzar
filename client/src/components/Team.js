import React from "react";

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: [],
    };
  }

  componentDidMount() {
    fetch("/api/team")
      .then((res) => res.json())
      .then((team) =>
        this.setState({ team }, () => console.log("FETCH - Team mates: ", team))
      );
  }

  render() {
    return (
      <div>
        <p>AltCampers building this project: </p>
        <ul>
          {this.state.team.map((teamMate) => {
            return (
              <li key={teamMate.id}>
                {teamMate.firstName} {teamMate.lastName}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Team;
