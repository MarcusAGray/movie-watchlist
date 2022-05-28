import React from 'react';
import './index.css';
import { Link } from "react-router-dom"

function Header(props) {
  return (
    <div className="header">
      <h1>{props.title}</h1>
      <Link to={props.link}>{props.text}</Link>
    </div>
  )
}

export default Header