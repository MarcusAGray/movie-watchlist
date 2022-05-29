import React, { useState, useEffect, useContext} from 'react'
import { SavedMoviesContext, isMovieSaved, FontAwesomeIcon, faStar} from './App'
import './movie.css';

function Movie(props) {

  const [movieData, setMovieData] = useState({})
  const [savedMovies, setSavedMovies] = useContext(SavedMoviesContext)

  function getMovieData() {
    // Searches savedMovies for movie data before trying to fetch it
    if (isMovieSaved(savedMovies, props.id) ) {
      const movieObj = savedMovies.find(movie => movie.imdbID == props.id)
      setMovieData(movieObj)
    } else {
      fetch(`http://www.omdbapi.com/?i=${props.id}&apikey=3fa84f5e`)
      .then(res => res.json())
      .then(movieData => {
        const movieObj = (({imdbID, Poster, Title, imdbRating, Runtime, Genre, Plot}) =>
                    ({imdbID, Poster, Title, imdbRating, Runtime, Genre, Plot}))(movieData)
  
        setMovieData(movieObj)
      })
    }
  }

  useEffect(() => {
    getMovieData()
  }, [])

  return (
    <div className='movie-display'>
      <img src={movieData.Poster} alt="Movie Poster"/>
      <div className='movie-info-container'>
        <div className='movie-info-heading'>
          <h3>{movieData.Title}</h3>
          <div className='rating-container'>
            <FontAwesomeIcon className="star-icon" icon={faStar} />
            <p className='rating'>{movieData.imdbRating}</p>
          </div>
        </div>
        <div className='movie-info-subheading'>
          <p>{movieData.Runtime}</p>
          <p>{movieData.Genre}</p>
          <button onClick={() => props.action(movieData)}>
            {props.symbol}
            <p>{props.actionText}</p>
          </button>
        </div>
        <p className='movie-des'>{movieData.Plot}</p>
      </div>
    </div>
  )
}

export default Movie;

