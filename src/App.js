import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "isomorphic-fetch";
import "es6-promise";

const URL = "https://ghibliapi.herokuapp.com/";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filmsIsLoaded: false,
      peopleIsLoaded: false,
      films: [
        {
          title: [],
          description: [],
          director: []
        }
      ],
      people: [
        {
          name: [],
          gender: [],
          age: [],
          id: []
        }
      ]
    };
    this.postFilms = this.postFilms.bind(this);
    this.postPeople = this.postPeople.bind(this);
  }

  //fetches the specified properties for the films of the URL
  //and sets them in state to be accessed later
  getFilmsList() {
    fetch(`${URL}films`)
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

  //fetches the specified properties for the people of the URL
  //and sets them in state to be accessed later
  getPeopleList() {
    fetch(`${URL}people`)
      .then(res => res.json())
      .then(peopleData => {
        let peopleList = peopleData.map(persons => {
          // for each item in the filmList, return a single object
          // with these three properties on it.
          return {
            name: persons.name,
            age: persons.age,
            gender: persons.gender,
            id: persons.id
          };
        });

        this.setState({
          people: peopleList
        });
      });
  }

  //posts the films inside of a div and displays them on the page
  postFilms = () => {
    return this.state.films.map(item => {
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

  //posts the people inside of a div and displays them on the page
  postPeople = () => {
    return this.state.people.map(item => {
      let peopleURLID = `${URL}people/${item.id}`;

      return (
        <div
          className="card text-white bg-secondary mb-1"
          style={{ maxWidth: "18rem" }}
        >
          <div className="card-header">Name: {item.name}</div>
          <div className="card-body">
            <h5 className="card-title">Age: {item.age}</h5>
            <p className="card-text">Gender: {item.gender}</p>
            <a
              href={peopleURLID}
              target="_blank"
              className="btn btn-primary"
              rel="noopener noreferrer"
            >
              Take me to their page!
            </a>
          </div>
        </div>
      );
    });
  };

  //the studio ghinli logo image to be displayed
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

  //the button corresponding to people to be clicked
  peopleButton = () => {
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={this.togglePeople}
      >
        Load People
      </button>
    );
  };

  //the button corresponding to films to be clicked
  filmsButton = () => {
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={this.toggleFilms}
      >
        Load Films
      </button>
    );
  };

  //toggles films, and toggles people off
  toggleFilms = () => {
    this.setState({
      filmsIsLoaded: !this.state.filmsIsLoaded,
      peopleIsLoaded: false
    });
  };

  //toggles people, and toggles films off
  togglePeople = () => {
    this.setState({
      peopleIsLoaded: !this.state.peopleIsLoaded,
      filmsIsLoaded: false
    });
  };

  render() {
    let post;

    if (this.state.filmsIsLoaded === true) {
      this.getFilmsList();

      post = this.postFilms();
    } else if (this.state.peopleIsLoaded === true) {
      this.getPeopleList();

      post = this.postPeople();
    }

    return (
      <React.Fragment>
        {this.filmsButton()}
        {this.peopleButton()}
        {this.logo()}
        {post}
      </React.Fragment>
    );
  }
}

export default App;
