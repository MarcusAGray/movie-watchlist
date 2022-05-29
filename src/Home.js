import React, { useState, useContext } from 'react'
import './index.css';
import Header from './Header'
import Movie from './Movie'
import { LOCAL_STORAGE_KEY,
        isMovieSaved, 
        SavedMoviesContext, 
        FontAwesomeIcon, 
        faMagnifyingGlass, 
        faFilm, 
        faCirclePlus } from './App'

function Home() {

  //controls initial render on the page before a search is made 
  const [searchMade, setSearchMade] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [movieIds, setMovieIds] = useState([])
  const [placeholder, setPlaceHolder] = useState("Enter search term here")
  const [noMoviesFound, setNoMoviesFound] = useState(false)
  const [toggleButtonMessage, setToggleButtonMessage] = useState(true)
  
  const [savedMovies, setSavedMovies] = useContext(SavedMoviesContext)

  function search(searchTerm) {
    setSearchMade(true)
    setIsLoading(true)
    setNoMoviesFound(false)
    fetch(`http://www.omdbapi.com/?s=${searchTerm}&type=movie&apikey=3fa84f5e`)
      .then(res => {
        setPlaceHolder(searchTerm)
        setSearchTerm('')
        return res.json()
      })
      .then(data => {
        if(data.Error == 'Movie not found!') {
          setNoMoviesFound(true)
        } else {
          const movieIdsFound = data.Search.map(searchData => searchData.imdbID)
          setMovieIds(movieIdsFound)
        }   
        setIsLoading(false)
      }).catch(err => {
        console.error("ERROR :", err)
      })
  }
  
  const saveMovie = movieData => {
    if(isMovieSaved(savedMovies, movieData.imdbID)) return
    
    const newMovies = savedMovies
    newMovies.push(movieData)
    setSavedMovies(newMovies)
    setToggleButtonMessage(!toggleButtonMessage)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newMovies))
  }

  const openingSearchPage = 
    <div className='start-page search-page'>
      <FontAwesomeIcon className="film-icon" icon={faFilm} />
      <p>Start Exploring</p>
    </div>
  
  const noMoviesFoundPage = 
    <div className='no-movies-page search-page'>
      <p>No movies found.<br></br> Please use another search term.</p>
    </div>

  const loadingPage = 
  <div className='loading-page search-page'>
    <p>Loading...</p>
  </div>
  
  return (
    <div>
      <Header title="Find your film" link="/watchlist" text="My Watchlist"/>
      <div className='search-container'>
        <input
          className='search-bar'
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyPress={e => (e.key === 'Enter' ? search(searchTerm) : null)}
         ></input>
        <button onClick={() => search(searchTerm)}>
          <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass}/>
        </button>
      </div>
      
      <main>
        {
          (!searchMade && openingSearchPage) ||
          (noMoviesFound && noMoviesFoundPage) ||
          (isLoading && loadingPage) ||
          (movieIds.map(movieId => {
            return (
              <Movie
                key={movieId}
                id={movieId}
                action={saveMovie}
                actionText = {isMovieSaved(savedMovies, movieId) ? "Movie Saved" : "Add to watchlist"}
                symbol={!isMovieSaved(savedMovies, movieId) ? <FontAwesomeIcon className='button-symbol' icon={faCirclePlus} /> : null}
              />
            )
          }))
        }
      </main>
    </div>
  )
}

export default Home;