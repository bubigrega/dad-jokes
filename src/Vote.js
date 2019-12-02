import React, { Component } from "react";
import "./Vote.css";

class Vote extends Component {
  static defaultProps = { colors: ["green", "orange", "black", "pink", "red"] };
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    event.target.value === "+"
      ? this.props.handleVote(this.props.id, 1)
      : this.props.handleVote(this.props.id, -1);
  }
  setColor(value) {
    let { colors } = this.props;
    if (value <= -3) return colors[4];
    if (value > -3 && value < 0) return colors[3];
    if (value === 0) return colors[2];
    if (value > 0 && value < 3) return colors[1];
    if (value >= 3) return colors[0];
  }
  render() {
    return (
      <div className="Vote">
        <button onClick={this.handleClick} value="-">
          <i className="material-icons" style={{ pointerEvents: "none" }}>
            arrow_downward
          </i>
        </button>
        <span
          className="Vote-votes"
          style={{ borderColor: this.setColor(this.props.votes) }}
        >
          {this.props.votes}
        </span>
        <button onClick={this.handleClick} value="+">
          <i className="material-icons" style={{ pointerEvents: "none" }}>
            arrow_upward
          </i>
        </button>
      </div>
    );
  }
}

export default Vote;
