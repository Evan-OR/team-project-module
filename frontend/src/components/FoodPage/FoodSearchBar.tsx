import React from 'react'
import FoodStyles from "../../styles/foodSearchbar.module.scss"
import SearchIcon from '../DrinksPage/SearchIcon'
 function FoodSearchBar() {
  return (
        <form className={FoodStyles.foodForm}>
            <div className={FoodStyles.searchWrapper}>
                <input className={FoodStyles.searchBar} placeholder="Search for food" />
                <SearchIcon styles={{ width: '25px', fill: '#202020', cursor: 'pointer' }}/> {/*Only want it for the icon not functionality*/}
            </div>
        </form>
  )
}

export default FoodSearchBar