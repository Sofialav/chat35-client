import React, { Component } from "react";
import superagent from "superagent";
import { connect } from "react-redux";

const url = "https://sheltered-sea-69941.herokuapp.com";
// const url = "http://localhost:4000";
class App extends Component {
  state = {
    text: "",
    name: ""
    // user: ""
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
    } catch (error) {
      console.log(error);
    }
  };
  onNewChannel = async e => {
    e.preventDefault();
    try {
      const response = await superagent
        .post(`${url}/channel`)
        .send({ name: this.state.name });
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
    this.setState({ text: "", name: "" });
  };
  // onCreateNick = e => {
  //   e.preventDefault();
  //   return const nickName = this.state.user
  // };
  render() {
    const messages = this.props.messages.map(message => <p>{message}</p>);
    const channels = this.props.channels.map(channel => <p>{channel}</p>);
    return (
      <main>
        <form>
          <input
            placeholder="create a nickname"
            name="nick"
            type="text"
            onChange={this.onChange}
            value={this.state.nick}
          ></input>
          <button>Create</button>
        </form>
        {/* messages form */}
        <form onSubmit={this.onSubmit}>
          <input
            name="text"
            type="text"
            onChange={this.onChange}
            value={this.state.text}
            placeholder="Your message here"
          ></input>
          <button>Send</button>
        </form>
        {/* channels form */}
        <form onSubmit={this.onNewChannel}>
          <input
            name="name"
            type="text"
            onChange={this.onChange}
            value={this.state.name}
            placeholder="New channel"
          ></input>
          <button>Send</button>
        </form>
        <button onClick={this.reset}>Reset</button>
        <div>
          <h3>Channels:</h3>
          {channels}
        </div>
        <div>
          <h3>Messages:</h3>
          {messages}
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    channels: state.channels
  };
}
const connector = connect(mapStateToProps);
const connected = connector(App);
export default connected;
