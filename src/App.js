import React, { Component } from "react";
import "isomorphic-fetch";
import "es6-promise";

class App extends Component {
  constructor() {
    super();

    this.state = {
      fetched: [
        {
          title: [],
          description: [],
          director: []
        }
      ]
    };
  }

  // title, description, director
  componentDidMount() {
    fetch("https://ghibliapi.herokuapp.com/films")
      .then(res => res.json())
      .then(obj =>
        this.setState({
          fetched: {
            title: JSON.stringify(obj, ["title"]),
            description: JSON.stringify(obj, ["description"]),
            director: JSON.stringify(obj, ["director"])
          }
        })
      );
  }

  createCard() {}

  render() {

    return (
      <div>
        {console.log(this.state.fetched.title)}
        {this.state.fetched.map(item => {
          return <div>{item.title}</div>;
        })}
      </div>
    );
  }
}

export default App;
