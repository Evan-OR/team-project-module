import { useEffect, useRef } from 'react';
import style from '../../styles/drinkModalStyles.module.scss';
import loginModalStyle from '../../styles/loginPageStyles.module.scss';
import { assertIsNode } from '../../utils/utils';

type DrinkModalProps = {
  toggleModal: (index: number | null) => void;
};

function DrinkModal(props: DrinkModalProps) {
  const { toggleModal } = props;
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
    <div className={loginModalStyle.modalWrapper}>
      <div ref={modal} className={loginModalStyle.loginPageWrapper}>
        thing
      </div>
    </div>
  );
}

export default DrinkModal;
