import React, { Component } from "react";
import superagent from "superagent";

class App extends Component {
  onSubmit = async e => {
    e.preventDefault();
    try {
      const response = await superagent
        .post("http://localhost:4000/message")
        .send({ text: "hardcoded text" });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <main>
        <form onSubmit={this.onSubmit}>
          <input type="text"></input>
          <button>Send</button>
        </form>
      </main>
    );
  }
}

export default App;
