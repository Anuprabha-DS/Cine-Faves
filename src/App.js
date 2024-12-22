import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Movie from './components/Movie';
import Heading from './components/Heading';
import Favourites from './components/Favourites';
import SearchBox from './components/SearchBox';
import RemoveFavourites from './components/RemoveFavourites';
import MovieDetails from './components/MovieDetails';
import Login from './components/Login';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearch] = useState('all');
  const [favourites, setFavourites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setLoggedInUser(user);
      // Load user-specific favorites
      loadUserFavorites(user.username);
    }
  }, []);

  const loadUserFavorites = (username) => {
    const allUserFavorites = JSON.parse(localStorage.getItem('userFavorites') || '{}');
    const userFavorites = allUserFavorites[username] || [];
    setFavourites(userFavorites);
  };

  const getMovieRequest = async(searchValue) => {
    const url = `https://www.omdbapi.com/?apikey=cc00c1d1&s=${searchValue}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=cc00c1d1&i=${imdbID}&plot=full`);
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const saveToLocalStorage = (username, userFavorites) => {
    const allUserFavorites = JSON.parse(localStorage.getItem('userFavorites') || '{}');
    allUserFavorites[username] = userFavorites;
    localStorage.setItem('userFavorites', JSON.stringify(allUserFavorites));
  };

  const addFavoriteMovie = (movie) => {
    if (!loggedInUser) {
      alert('You must be logged in to add favorites');
      return;
    }

    const isMovieExists = favourites.some(favourite => favourite.imdbID === movie.imdbID);
    
    if (!isMovieExists) {
      const newFavorites = [...favourites, movie];
      setFavourites(newFavorites);
      saveToLocalStorage(loggedInUser.username, newFavorites);
    }
  };

  const removeFavoriteMovie = (movie) => {
    const newFavorites = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);
    setFavourites(newFavorites);
    saveToLocalStorage(loggedInUser.username, newFavorites);
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  // Handle user login
  const handleLogin = (user) => {
    setLoggedInUser(user);
    loadUserFavorites(user.username);
  };

  // Handle user logout
  const handleLogout = () => {
    setLoggedInUser(null);
    setFavourites([]);
    localStorage.removeItem('loggedInUser');
  };

  return (
    <div className='container-fluid'> 
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <Heading heading='CineFavs' />
        <SearchBox searchValue={searchValue} setSearch={setSearch} />
        <Login onLogin={handleLogin} onLogout={handleLogout} />
      </div>
      <div className='row'>
        <Movie 
          movies={movies} 
          favourites={favourites}  
          handleFavourite={addFavoriteMovie} 
          favouriteComponent={Favourites}
          onMovieSelect={(imdbID) => {
            fetchMovieDetails(imdbID);
          }}
        />
        {selectedMovie && (
          <MovieDetails 
            movie={selectedMovie} 
            onClose={() => setSelectedMovie(null)} 
          />
        )}
      </div>

      {loggedInUser && (
        <>
          <div className='row d-flex align-items-center mt-4 mb-4'>
            <Heading heading={`${loggedInUser.username.charAt(0).toUpperCase()+ loggedInUser.username.slice(1)}'s Favourite Movies`} />
          </div>
          <div className='row'>
            <Movie 
              movies={favourites} 
              handleFavourite={removeFavoriteMovie} 
              favouriteComponent={RemoveFavourites}
              onMovieSelect={(imdbID) => {
                fetchMovieDetails(imdbID);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;