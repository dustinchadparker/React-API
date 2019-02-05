import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "isomorphic-fetch";
import "es6-promise";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
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

  postFilms = () => {
    return this.state.films.map(item => {
      console.log(item);
      return (
        <div
          className="card text-white bg-secondary mb-1"
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
  };

  logo = () => {
    return (
      <div className="btn-div">
        <img
          src="https://seeklogo.com/images/S/Studio_Ghibli-logo-78E2716B50-seeklogo.com.png"
          alt="logo"
          width="200"
          height="100"
        />
      </div>
    );
  };

  toggle = () => {
    this.setState({ isLoaded: !this.state.isLoaded });
  };

  render() {
    let element;
    if (this.state.isLoaded === true) {
      element = this.postFilms();
    } else {
      element = this.logo();
    }
    return (
      <React.Fragment>
        <button type="button" className="btn btn-primary" onClick={this.toggle}>
          Load Films
        </button>
        {element}
      </React.Fragment>
    );
  }
}

export default App;
