import React from 'react'

const Movie=(props)=>{
    const FavouriteComponent = props.favouriteComponent;
    return (
    <>

    {props.movies.map((movie,index)=>
    <div  key={index} className='image-container col-sm-4 col-md-3 col-lg-2 mb-4'>
        <div onClick={() => props.onMovieSelect(movie.imdbID)}className='card' >
            {/* <div > */}

            <img src={movie.Poster} alt="movie" className="card-img-top"></img>
            <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text">Year:{movie.Year}</p>
                {/* <button className="btn btn-primary" onClick={() =>props.fetchMovieDetails(movie.imdbID)}>Show More</button>  */}
            </div>
            {/* </div> */}
            
        </div>
        <div onClick={()=>props.handleFavourite(movie)} className='overlay d-flex align-item-center justify-content-center'>
            <FavouriteComponent/>
        </div>
    </div>)}

    
    </>
    )
  }


export default Movie
