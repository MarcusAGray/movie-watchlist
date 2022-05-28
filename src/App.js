import React, { useState, useEffect, createContext, useContext } from 'react'
import './index.css';
import Home from './Home'
import Watchlist from './Watchlist'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faMagnifyingGlass, faStar, faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons'

export const SavedMoviesContext = createContext();
const LOCAL_STORAGE_KEY = 'savedMovies'

function App() {

  const [savedMovies, setSavedMovies] = useState([])

  useEffect(() => {
    const storageContents = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storageContents == null || storageContents == undefined){
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]))
    }
    setSavedMovies(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)))
  }, [])

  return(
    <Router>
      <div className='container'>
        <SavedMoviesContext.Provider value={[savedMovies, setSavedMovies]}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/watchlist" element={<Watchlist/>}/>
          </Routes>
        </SavedMoviesContext.Provider>
      </div>
    </Router>
  )
}

export { App, LOCAL_STORAGE_KEY, FontAwesomeIcon, faMagnifyingGlass, faStar, faCirclePlus, faCircleMinus, faFilm };