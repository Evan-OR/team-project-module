import { useState } from "react";
import foodStyles from "../../styles/foodsecStyles.module.scss";
import searchBarStyles from "../../styles/searchbarStyles.module.scss";
import FoodCard from "./FoodCard";
import food from "../../dataset/food.json"
import { Meal } from "../../types/UserTypes";
import SearchIcon from "../DrinksPage/SearchIcon";

const foodSec = () => {
  const [foodList, setFoodList] = useState<Meal[]>(food);
  const [searchResults, setSearchResults] = useState<Meal[]>(food);

  const handleSearchChange = (e: { target: { value: string; }; }) => {
      const mealResults = foodList.filter(foodList => foodList.strMeal?.toLowerCase().includes(e.target.value.toLowerCase()))

      setSearchResults(mealResults)
    }
  return(
    <div className={foodStyles.FoodDisplayWrapper}>

      {/* Search Bar */}
      <form className={searchBarStyles.foodForm}>
            <div className={searchBarStyles.searchWrapper}>
                {/* Search term now changes when you type not when you press enter */}
                <input 
                onChange={handleSearchChange} 
                className={searchBarStyles.searchBar} 
                placeholder="Search for food" 
                id="search"
                type="text"
                />
                {/* Will remove it as a component soon and just use the svg */}
                <SearchIcon 
                styles={{ width: '25px', fill: '#202020', cursor: 'pointer' }}
                /> {/*Only want it for the icon not functionality*/}
            </div>
        </form>
      {/* End of Search Bar */}

    {searchResults.length > 0 ?
      <>
      <div className={foodStyles.titleWrapper}>
        <h3 className={foodStyles.title}>Searched Food</h3>
      </div>
        <div className={foodStyles.FoodMenuContainer}>
          <div className={foodStyles.cardDisplayWrapper}>
            {searchResults.map((meal) => (
              <FoodCard key={meal.idMeal} meal={meal}/>
            ))}
          </div>
        </div>
        </>
        :
        <>
        <div className={foodStyles.titleWrapper}>
          <h3 className={foodStyles.title}>All Food</h3>
        </div>
        <div className={foodStyles.FoodMenuContainer}>
            <div className={foodStyles.cardDisplayWrapper}>
            {foodList.map((meal) => (
              <FoodCard key={meal.idMeal} meal={meal}/>
            ))}
            </div>
        </div> 
      </>
    }
    </div>
  )}

export default foodSec;  


// {/* <div className={foodStyles.titleWrapper}>
//           <h3 className={foodStyles.title}>Other Food</h3>
//       </div>
//       <div className={foodStyles.FoodMenuContainer}>
//         <div className={foodStyles.cardDisplayWrapper}>
//           {searchResults.length > 0
//             ? searchResults.map((meal) => (
//               <FoodCard key={meal.idMeal} meal={meal}/>
//             ))
//           : foodList.map((meal) => (
//             <FoodCard key={meal.idMeal} meal={meal}/>
//           ))
//           }
//         </div>
//         </div> */}