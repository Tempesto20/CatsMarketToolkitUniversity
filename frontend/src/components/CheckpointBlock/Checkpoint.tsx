import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { setSell, setCurrentPage } from '../../redux/slices/filterSlice';
import styles from './checkpoint.module.scss';

interface CheckpointItem {
  name: string;
  value: number;
}

const checkpointList: CheckpointItem[] = [
  { name: 'Все', value: 0 },
  { name: 'В наличии', value: 1 },
  { name: 'Отсутствуют в продаже', value: 2 },
];

const Checkpoint: React.FC = () => {
  const dispatch = useAppDispatch();
  const sell = useSelector((state: RootState) => state.filterSlice.sell);

  const checkboxHandler = (value: number) => {
    dispatch(setSell(value));
    // Сбрасываем страницу на первую при изменении фильтра
    dispatch(setCurrentPage(1));
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <p>Группировать по:</p>
          <div className={styles.eventList}>
            {checkpointList.map((item) => {
              return (
                <label className={styles.eventTitle} key={item.value} htmlFor={`radio-${item.value}`}>
                  <input
                    type="radio"
                    name="availability-radio"
                    value={item.value}
                    onChange={() => checkboxHandler(item.value)}
                    checked={sell === item.value}
                    className={styles.subtitle}
                    id={`radio-${item.value}`}
                  />
                  {item.name}
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkpoint;