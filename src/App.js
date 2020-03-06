import React, { Component } from "react";
import superagent from "superagent";

const url = "http://localhost:4000";
class App extends Component {
  state = {
    text: ""
  };

  stream = new EventSource(`${url}/stream`);
  componentDidMount() {
    this.stream.onmessage = function(event) {
      console.log("event.data TEST", event.data);
    };
  }

  onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await superagent
        .post(`${url}/message`)
        .send({ text: this.state.text });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
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
            name="text"
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
