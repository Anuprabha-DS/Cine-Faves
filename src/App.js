import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Movie from './components/Movie';
import Heading from './components/Heading';
import Favourites from './components/Favourites';
import SearchBox from './components/SearchBox';
import RemoveFavourites from './components/RemoveFavourites';
import MovieDetails from './components/MovieDetails';

function App() {
  const [movies,setMovies]=useState([])
  const [searchValue,setSearch]=useState('all')
  const [favourites,setFavourites]=useState([])

  const [selectedMovie, setSelectedMovie] = useState(null);


  const getMovieRequest = async(searchValue)=>{
    const url = `https://www.omdbapi.com/?apikey=cc00c1d1&s=${searchValue}`


    const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}

  }


  const fetchMovieDetails = (async (imdbID) => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=cc00c1d1&i=${imdbID}&plot=full`);
      const data = await response.json();
      setSelectedMovie(data);
      console.log(data);
         } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  });
  

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

  const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};


  const addFavoriteMovie = (movie) => {
    // Check if movie already exists in favourites
    const isMovieExists = favourites.some(favourite => favourite.imdbID === movie.imdbID);
    
    // Only add if movie doesn't exist in favourites
    if (!isMovieExists) {
        const newFavorite = [...favourites, movie];
        setFavourites(newFavorite);
        saveToLocalStorage(newFavorite);
    }
};

  const removeFavoriteMovie=(movies)=>{
    const newFavorite=favourites.filter((favourite)=>favourite.imdbID!==movies.imdbID);
    setFavourites(newFavorite)
    saveToLocalStorage(newFavorite);

  }

  useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);


  

  return (
    <div className='container-fluid '> 
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <Heading heading='CineFavs' />
      <SearchBox searchValue={searchValue} setSearch={setSearch}/>
    </div>
      <div className='row'>
        <Movie movies={movies} 
        handleFavourite={addFavoriteMovie} 
        favouriteComponent={Favourites}
        onMovieSelect={fetchMovieDetails}
        detailsMovie={MovieDetails}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <Heading heading='Favourite Movies'/>
      </div>
      <div className='row'>
        <Movie movies={favourites} 
        handleFavourite={removeFavoriteMovie} 
        favouriteComponent={RemoveFavourites}/>
      </div>
    </div>
  );
}

export default App;
