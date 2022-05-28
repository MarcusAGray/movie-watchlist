import React, { useState, useEffect, useContext} from 'react'
import { LOCAL_STORAGE_KEY, SavedMoviesContext } from './App'

function Movie(props) {

  const [movieData, setMovieData] = useState({})
  const [savedMovies, setSavedMovies] = useContext(SavedMoviesContext)

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=${props.id}&apikey=3fa84f5e`)
      .then(res => res.json())
      .then(movieData => {
        const movieObj = (({imdbID, Poster, Title, imdbRating, Runtime, Genre, Plot}) =>
                    ({imdbID, Poster, Title, imdbRating, Runtime, Genre, Plot}))(movieData)

        setMovieData(movieObj)
      })
  }, [])

  function saveMovie() {
    const tempArr = savedMovies
    tempArr.push(movieData)
    setSavedMovies(tempArr)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedMovies))
  }

  return (
    <div>
      <img src={movieData.Poster}/>
      <p>{movieData.Title}</p>
      <p>{movieData.imdbRating}</p>
      <p>{movieData.Runtime}</p>
      <p>{movieData.Genre}</p>
      <button onClick={saveMovie}>Watchlist</button>
      <p>{movieData.Plot}</p>
      <button onClick={() => props.removeMovie(props.id)}>Not Interested</button>
    </div>
  )
}

export default Movie;