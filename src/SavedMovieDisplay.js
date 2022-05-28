import React from 'react'

function SavedMovieDisplay(props) {

  return (
    <div>
      <img src={props.Poster}/>
      <p>{props.Title}</p>
      <button onClick={props.remove}>Remove</button>
    </div>
  )
}

export default SavedMovieDisplay;