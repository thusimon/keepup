import React from 'react';
import { Link } from 'react-router-dom'

const PageHeader = () => {
  return (
    <header>
    <nav>
      <ul>
        <li><Link to='/signup'>Sign Up</Link></li>
        <li><Link to='/statistics'>Statistics</Link></li>
      </ul>
    </nav>
  </header>
  )
}

export default PageHeader;
