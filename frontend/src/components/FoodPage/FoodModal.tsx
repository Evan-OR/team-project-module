import React from 'react'
import { Meal } from '../../types/UserTypes';
import CloseButton from '../../icons/CloseButton';
import { getFoodIngredients } from '../../utils/utils';
import foodStyle from '../../styles/foodStyles/foodModal.module.scss';

type FoodModalProps = {
    toggleModal: (index: Meal | null) => void;
    food: Meal;
}


function FoodModal(props: FoodModalProps) {
    const {toggleModal, food} = props;
  return (
    <div className={foodStyle.modalWrapper}>
      <div onClick={() => toggleModal(null)} className={foodStyle.backBtn}>
        <CloseButton className={foodStyle.backBtn}/>
      </div>

      <div className={foodStyle.wrapper}>
        <div className={foodStyle.imgWrapper}>
            <img draggable={false} alt={`Picture of ${food.mealName}`} src={food.imageURL}></img>
        </div>
      </div>
      <div className={foodStyle.contentWrapper}>
        <div className={foodStyle.foodInfoWrapper}>
            <div className={foodStyle.title}>{food.mealName}</div>
            <div className={foodStyle.subTitle}>Instructions</div>
            <div className={foodStyle.description}>{food.instructions}</div>
            <div className={foodStyle.subTitle}>Ingredients</div>
            <div className={foodStyle.ingreientsWrapper}>
                {getFoodIngredients(food)}
                <div>
                {/* Liking code to go here */}
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default FoodModal;