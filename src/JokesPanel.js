import React, { Component } from "react";
import Joke from "./Joke";
import "./JokesPanel.css";

class JokesPanel extends Component {
  render() {
    let jokes = this.props.jokes.sort((a, b) => b.votes - a.votes);
    return (
      <div className="JokesPanel">
        {this.props.loading ? (
          <div className="JokesPanel-loading">
            <p>loading</p>
          </div>
        ) : (
          jokes.map(j => (
            <Joke key={j.id} {...j} handleVote={this.props.handleVote} />
          ))
        )}
      </div>
    );
  }
}
export default JokesPanel;
