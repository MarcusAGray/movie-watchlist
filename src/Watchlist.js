import React, { useContext } from 'react'
import { LOCAL_STORAGE_KEY, SavedMoviesContext } from './App'
import Movie from './Movie'
import Header from './Header'

import { FontAwesomeIcon, faCircleMinus } from './App'

function Watchlist() {

  const [savedMovies, setSavedMovies] = useContext(SavedMoviesContext)

  const remove = movieData => {
    let newMovies = savedMovies;
    newMovies = newMovies.filter(movie => movie.imdbID != movieData.imdbID)
    setSavedMovies(newMovies)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newMovies))
  }

  const emptyWatchlistPage = 
    <div className='empty-watchlist-page'>
      <p>Your Watchlist is looking a little empty...</p>
      <br></br>
      <p>Add some movies in the search page</p>
    </div>

  return (
    <div>
      <Header title="My Watchlist" link="/" text="Search for movies"/>
      <main>
        {savedMovies.length == 0 && emptyWatchlistPage}
        {savedMovies.map(movie => {
          return (
            <Movie
              key={movie.imdbID}
              id={movie.imdbID}
              action={remove}
              actionText="Remove"
              symbol = {<FontAwesomeIcon className='button-symbol' icon={faCircleMinus} />}
            />
          )
        })}
      </main>
    </div>
  )
}

export default Watchlist;