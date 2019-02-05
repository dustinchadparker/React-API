import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "isomorphic-fetch";
import "es6-promise";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      films: [
        {
          title: [],
          description: [],
          director: []
        }
      ]
    };
    this.postFilms = this.postFilms.bind(this);
  }

  // title, description, director
  componentDidMount() {
    fetch("https://ghibliapi.herokuapp.com/films")
      .then(res => res.json())
      .then(filmData => {
        let filmList = filmData.map(film => {
          // for each item in the filmList, return a single object
          // with these three properties on it.
          return {
            title: film.title,
            description: film.description,
            director: film.director
          };
        });

        this.setState({
          films: filmList
        });
      });
  }

  postFilms() {
    document.getElementsByClassName("btn-primary")[0].remove();
    document.getElementsByClassName("btn-div")[0].remove();
    
    this.state.films.map(item => {
      console.log(item);
      return (
        <div
          className="card text-white bg-secondary mb-3"
          style={{ maxWidth: "18rem" }}
        >
          <div className="card-header">{item.title}</div>
          <div className="card-body">
            <h5 className="card-title">{item.director}</h5>
            <p className="card-text">{item.description}</p>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="btn-div">
          <img
            src="https://seeklogo.com/images/S/Studio_Ghibli-logo-78E2716B50-seeklogo.com.png"
            alt="logo"
            width="200"
            height="100"
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.postFilms.bind(this)}
        >
          {" "}
          Load Films
        </button>
      </React.Fragment>
    );
  }
}

export default App;
