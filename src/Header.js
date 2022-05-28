import React from 'react';
import { Link } from "react-router-dom"

function Header(props) {
  return (
    <div>
      <h1>Find your film</h1>
      <Link to={props.link}>{props.text}</Link>
    </div>
  )
}

export default Header