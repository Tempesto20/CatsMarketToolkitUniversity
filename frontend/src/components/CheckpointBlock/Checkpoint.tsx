import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setSellType } from '../../redux/slices/filterSlice';
import styles from './checkpoint.module.scss';

type CheckpointItem = {
  name: string;
  sellProperty: number;
};

const checkpointList: CheckpointItem[] = [
  { name: 'Все', sellProperty: 0 },
  { name: 'В наличии', sellProperty: 1 },
  { name: 'Отсутствуют', sellProperty: 2 },
];

const Checkpoint: React.FC = () => {
  const dispatch = useDispatch();
  const [checkpointIsActive, setCheckpointIsActive] = React.useState(false);
  const sellType = useSelector((state: RootState) => state.filterSlice.sell);

  const changeHandler = () => {
    setCheckpointIsActive((prev) => !prev);
  };

  const onChangeSellType = (item: CheckpointItem) => {
    dispatch(setSellType(item.sellProperty));
    setCheckpointIsActive(false);
  };

  // Закрытие выпадающего списка при клике вне его области
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const checkpointElement = document.querySelector(`.${styles.checkpoint}`);
      if (checkpointElement && !checkpointElement.contains(event.target as Node)) {
        setCheckpointIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentCheckpoint = checkpointList.find(item => item.sellProperty === sellType) || checkpointList[0];

  return (
    <div className={styles.checkpoint}>
      <div className={styles.checkpoint__label}>
        <svg
          className={checkpointIsActive ? styles.transform : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>

        <b>Наличие:</b>
        <span onClick={changeHandler}>{currentCheckpoint.name}</span>
      </div>
      {checkpointIsActive && (
        <div className={styles.checkpoint__popup}>
          <ul>
            {checkpointList.map((item, index) => (
              <li
                key={index}
                onClick={() => onChangeSellType(item)}
                className={sellType === item.sellProperty ? styles.active : ''}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Checkpoint;