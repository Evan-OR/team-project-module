import React from 'react'
import instructionStyles from '../styles/instruction.module.scss'
import drinkLogo from '../images/drinkLogo.png'
import foodlogo from '../images/foodLogo.png'

const Instruction = () => {
  return (
    <div className={instructionStyles.Container}>
      <div className={instructionStyles.infoBoxContainers}>
      <img className={instructionStyles.logo} src={drinkLogo} alt="logo" />
      <h1>Drinks</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis non consectetur culpa adipisci soluta excepturi explicabo. Fugit dolorem iure asperiores, adipisci voluptatem, tempore, veritatis soluta rerum tenetur vel cum. Minus?</p>
      </div>

      <div className={instructionStyles.infoBoxContainers}>
        <img className={instructionStyles.logo} src={foodlogo} alt="logo" />
        <h1>Food</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis non consectetur culpa adipisci soluta excepturi explicabo. Fugit dolorem iure asperiores, adipisci voluptatem, tempore, veritatis soluta rerum tenetur vel cum. Minus?</p>
      </div>
    </div>
  )
}

export default Instruction