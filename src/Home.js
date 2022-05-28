import React, { useState } from 'react'
import { Link } from "react-router-dom"
import Loading from './Loading'
import Movies from './Movies'
import Header from './Header'

function Home() {

  const [searchMade, setSearchMade] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [movieIds, setMovieIds] = useState([])

  const [placeholder, setPlaceHolder] = useState("Enter search term here")

  const [noMoviesFound, setNoMoviesFound] = useState(false)

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

  const removeMovie = movieId => {
    const newMovieIds = movieIds.filter(id => id != movieId)
    setMovieIds(newMovieIds)
  }

  return (
    <div>
      <Header link="/watchlist" text="My Watchlist"/>
      <div className='search-container'>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyPress={e => (e.key === 'Enter' ? search(searchTerm) : null)}
        />
        <button onClick={() => search(searchTerm)}>Search</button>
      </div>

      {
        (!searchMade && <p>Search for movies</p>) ||
        (noMoviesFound && <p>No movies found. Please use another search term</p>) ||
        (isLoading && <Loading />) ||
        ((movieIds.length == 0) && <p>No remaining movies</p>) ||
        <Movies 
          movieIds={movieIds} 
          removeMovie={removeMovie}
        /> 
      }
    </div>
  )
}

export default Home;