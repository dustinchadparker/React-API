import React from "react";
import "isomorphic-fetch";
import "es6-promise";

const LoadFilms = () => {
  return fetch("https://ghibliapi.herokuapp.com/films")
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

      filmList.map(item => {
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
    });
};

export default LoadFilms;
