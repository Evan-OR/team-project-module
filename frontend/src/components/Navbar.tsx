import React from 'react'
import navStyles from '../styles/navbarStyles.module.scss'
function Navbar() {
  return (
    <div className={navStyles.navbarBackground}>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>
  )
}

export default Navbar
