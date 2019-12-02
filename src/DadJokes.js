import React, { Component } from "react";
import axios from "axios";
import JokesPanel from "./JokesPanel";

import "./DadJokes.css";

const API_URL = "https://icanhazdadjoke.com/";
const HEADERS = {
  responseType: "json",
  headers: {
    Accept: "application/json"
  }
};

class DadJokes extends Component {
  static defaultProps = {
    numJokes: 10
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(localStorage.getItem("jokes") || "[]"),
      loading: false
    };
    this.handleVote = this.handleVote.bind(this);
    this.getJokes = this.getJokes.bind(this);
  }
  async getJokes() {
    this.setState({ loading: true });
    try {
      let jokes = [...this.state.jokes];
      while (jokes.length < this.props.numJokes + this.state.jokes.length) {
        const newJoke = await axios.get(API_URL, HEADERS);
        if (jokes.filter(j => j.id === newJoke.data.id).length === 0) {
          jokes.push({ ...newJoke.data, votes: 0 });
        }
      }
      this.setState(state => ({
        jokes: [...jokes],
        loading: false
      }));
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  }
  handleVote(id, addVotes) {
    this.setState(state => ({
      jokes: state.jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + addVotes } : j
      )
    }));
  }
  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("updating");
    if (prevState.jokes !== this.state.jokes) {
      localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
      console.log("updated");
    }
  }
  render() {
    return (
      <div className="DadJokes">
        <div className="DadJokes-sidebar">
          <h1 className="DadJokes-title">
            <span>Dad</span> Jokes
          </h1>
          <span className="DadJokes-icon" role="img" aria-label="funny smile">
            &#128540;
          </span>
          <button
            disabled={this.state.loading}
            className="DadJokes-button"
            onClick={this.getJokes}
          >
            Get Jokes
          </button>
        </div>
        <div className="DadJokes-panel">
          <JokesPanel {...this.state} handleVote={this.handleVote} />
        </div>
      </div>
    );
  }
}

export default DadJokes;
