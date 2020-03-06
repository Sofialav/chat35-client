import React, { Component } from "react";
import superagent from "superagent";
import { connect } from "react-redux";

const url = "http://localhost:4000";
class App extends Component {
  state = {
    text: ""
  };

  stream = new EventSource(`${url}/stream`);
  componentDidMount() {
    this.stream.onmessage = event => {
      // using parser for convert string event.data into an object
      console.log("event.data TEST", event.data);
      const parser = JSON.parse(event.data);
      this.props.dispatch(parser);
      console.log("PARSED DATA", parser);
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

const connector = connect();
const connected = connector(App);
export default connected;
