import React from 'react'
import FoodStyles from "../../styles/foodsecStyles.module.scss"
 function FoodSearchBar() {
  return (
    <div>
        <form className={FoodStyles.form}>
            <input className={FoodStyles.searchBar} placeholder="Search for food" />
        </form>
    </div>
  )
}

export default FoodSearchBar