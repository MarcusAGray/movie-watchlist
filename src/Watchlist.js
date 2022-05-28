import React, { useContext } from 'react'
import { LOCAL_STORAGE_KEY } from './App'
import { SavedMoviesContext } from './App'
import Movie from './Movie'
import SavedMovieDisplay from './SavedMovieDisplay'
import Header from './Header'

function Watchlist() {

  const [savedMovies, setSavedMovies] = useContext(SavedMoviesContext)

  function remove(id) {
    let tempArr = savedMovies;
    tempArr = tempArr.filter(e => e.imdbID != id)
    console.log("tempArr: ", tempArr)
    setSavedMovies(tempArr)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedMovies))
  }

  if (savedMovies.length == 0) {
    return (
      <div>
        <p>Your Watchlist is looking a little empty</p>
        <p>Add some movies</p>
      </div>
    )
  }

  return (
    <div>
      <Header link="/" text="Search for movies"/>
      {savedMovies.map(movie => {
        return (
          <SavedMovieDisplay
            key={movie.imdbID}
            Poster={movie.Poster}
            Title={Movie.Title}
            remove={() => remove(movie.imdbID)}
          />
        )
      })}
    </div>
  )
}

export default Watchlist;