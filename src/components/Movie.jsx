import React from 'react';

const Movie = (props) => {
  // Check if onMovieSelect is passed and is a function
  const handleMovieSelect = typeof props.onMovieSelect === "function"
    ? props.onMovieSelect
    : () => console.warn("onMovieSelect is not defined or not a function");

  return (
    <>
      {props.movies.map((movie, index) => (
        <div key={index} className="image-container col-sm-4 col-md-3 col-lg-2 mb-4">
          <div className="card">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-poster.png'}
              className="card-img-top"
              alt={movie.Title}
              style={{ height: '300px', objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => {
                console.log("Clicked movie:", movie.imdbID); // Debug log
                handleMovieSelect(movie.imdbID); // Call handleMovieSelect
              }}
            />
            <div className="card-body">
              <h5 className="card-title">{movie.Title}</h5>
              <p className="card-text">Year: {movie.Year}</p>
            </div>
          </div>
          <div 
            onClick={() => props.handleFavourite(movie)} 
            className="overlay d-flex align-item-center justify-content-center"
          >
            <props.favouriteComponent movie={movie} favourites={props.favourites} />
            {/* <props.favouriteComponent /> */}
          </div>
        </div>
      ))}
    </>
  );
};

export default Movie;
