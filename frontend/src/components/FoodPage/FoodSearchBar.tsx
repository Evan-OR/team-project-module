import React from 'react'

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