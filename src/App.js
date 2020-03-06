import React, { Component } from "react";
import superagent from "superagent";

class App extends Component {
  state = {
    text: ""
  };
  onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await superagent
        .post("http://localhost:4000/message")
        .send({ text: this.state.text });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  onChange = e => {
    this.setState({
      text: e.target.value
    });
  };
  reset = () => {
    this.setState({ text: "" });
  };
  render() {
    return (
      <main>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            onChange={this.onChange}
            value={this.state.text}
          ></input>
          <button>Send</button>
        </form>
        <button onClick={this.reset}>Reset</button>
      </main>
    );
  }
}

export default App;
