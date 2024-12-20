//   function MovieDetails({ movie, onClose, onAddToFavorites, isFavorite }) {
import React from 'react'

 const MovieDetails = (props)=>{
    return (
      <div className="movie-details">
        <button className="close-btn" onClick={onClose}>Close</button>
        <div className="movie-detail-content">
          <img 
            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-poster.png'} 
            alt={movie.Title} 
          />
          <div className="details">
            <h2>{movie.Title}</h2>
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Rating:</strong> {movie.imdbRating}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            
            {!isFavorite && (
              <button 
                className="add-favorite-details"
                onClick={() => onAddToFavorites(movie)}
              >
                Add to Favorites
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

export default MovieDetails