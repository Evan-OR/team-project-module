import { useEffect, useRef } from 'react';
import style from '../../styles/drinkModalStyles.module.scss';
import loginModalStyle from '../../styles/loginPageStyles.module.scss';
import { Drink } from '../../types/UserTypes';
import { assertIsNode } from '../../utils/utils';

type DrinkModalProps = {
  toggleModal: (index: number | null) => void;
  drink: Drink;
};

function DrinkModal(props: DrinkModalProps) {
  const { toggleModal, drink } = props;
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      assertIsNode(event.target);
      if (!modal.current?.contains(event.target)) {
        toggleModal(null);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className={style.modalWrapper}>
      <div ref={modal} className={style.modal}>
        {drink.strDrink}
      </div>
    </div>
  );
}

export default DrinkModal;
