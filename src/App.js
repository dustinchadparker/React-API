import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "isomorphic-fetch";
import "es6-promise";
import LoadFilms from "./components/LoadFilms.jsx";
// import LoadPeople from './components/LoadPeople';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filmsIsLoaded: false,
      films: [
        {
          title: [],
          description: [],
          director: []
        }
      ],
      people: [
        {
          title: [],
          description: [],
          director: []
        }
      ]
    };
  }

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

  toggleFilms = () => {
    this.setState({ filmsIsLoaded: !this.state.filmsIsLoaded });
  };

  render() {
    let element;
    if (this.state.filmsIsLoaded === true) {
      element = <LoadFilms />;
    } else {
      element = this.logo();
    }
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.toggleFilms}
        >
          Load Films
        </button>
        {element}
      </React.Fragment>
    );
  }
}

export default App;
