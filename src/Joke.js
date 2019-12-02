import React, { Component } from "react";
import Vote from "./Vote";
import Smile from "./Smile";
import "./Joke.css";

class Joke extends Component {
  render() {
    return (
      <div className="Joke">
        <Vote
          votes={this.props.votes}
          id={this.props.id}
          handleVote={this.props.handleVote}
        />
        <p className="Joke-text">{this.props.joke}</p>
        <Smile votes={this.props.votes} />
      </div>
    );
  }
}

export default Joke;
