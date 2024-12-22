import React from "react";

function MovieDetails({ movie, onClose }) {
  return (
    <div className="modal show fade d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-center ">
            <h5 className="modal-title text-center" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{movie.Title}</h5>
            {/* <button 
              type="button" 
              className="btn-close" 
              aria-label="Close" 
              onClick={onClose}
            ></button> */}
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-4">
                <img 
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-poster.png'} 
                  className="img-fluid rounded" 
                  alt={movie.Title} 
                />
              </div>
              <div className="col-md-8">
                <p><strong>Year:</strong> {movie.Year}</p>
                <p><strong>Rating:</strong> {movie.imdbRating}</p>
                <p><strong>Language:</strong> {movie.Language}</p>
                <p><strong>Genre:</strong> {movie.Genre}</p>
                <p><strong>Released:</strong> {movie.Released}</p>
                <p><strong>Actors:</strong> {movie.Actors}</p>
                <p><strong>Writer:</strong> {movie.Writer}</p>
                <p><strong>Director:</strong> {movie.Director}</p>
                <p><strong>Plot:</strong> {movie.Plot}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
