import React from 'react'
import navStyles from '../styles/navbarStyles.module.scss'
import homeLogo from '../images/home.png'


function Navbar() {
  return (
    <div className={navStyles.navContainer}>

    <img className={navStyles.logo} src={homeLogo} alt="logo" />

      <ul className={navStyles.ul}>
        <li className={navStyles.li}> <a href="/">Home</a></li>
        <li className={navStyles.li}> <a href="/about">Food</a></li>
        <li className={navStyles.li}> <a href="/contact">Drinks</a></li>
      </ul>
    </div>
    
  )
}

export default Navbar
