import React from 'react'
import Movie from './Movie'

function Movies(props) {

  return (
    <div>
      {props.movieIds.map(movieId => {
        return (
          <Movie
            key={movieId}
            id={movieId}
            removeMovie={props.removeMovie}
          />
        )
      })}
    </div>
  )
}

export default Movies;