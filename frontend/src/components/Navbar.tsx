import React from 'react'
import navStyles from '../styles/navbarStyles.module.scss'

function Navbar() {
  return (
    <div className={navStyles.navContainer}>
      <ul className={navStyles.ul}>
        <li className={navStyles.li}> <a href="/">Home</a></li>
        <li className={navStyles.li}> <a href="/about">Food</a></li>
        <li className={navStyles.li}> <a href="/contact">Drinks</a></li>
      </ul>
    </div>
  )
}

export default Navbar
