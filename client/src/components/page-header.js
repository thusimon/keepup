import React from 'react';
import { Link } from 'react-router-dom'
import Clock from './clock';
import './page-header.css'

const PageHeader = () => {
  return (
    <header className="page-header">
      <nav>
        <ul>
          <li><Link to='/signup'>Sign Up</Link></li>
          <li className="nav-seperator"></li>
          <li><Link to='/statistics'>Statistics</Link></li>
        </ul>
      </nav>
      <span>
        <Clock />
      </span>
    </header>
  )
}

export default PageHeader;
