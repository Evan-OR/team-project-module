import React from 'react'
import navStyles from '../styles/navbarStyles.module.scss'

function Navbar() {
  return (
    <div>
      <ul className={navStyles.ul}>
        <li className={navStyles.li}> <a href="/">Home</a></li>
        <li className={navStyles.li}> <a href="/about">About</a></li>
        <li className={navStyles.li}> <a href="/contact">Contact</a></li>
      </ul>
    </div>
  )
}

export default Navbar
