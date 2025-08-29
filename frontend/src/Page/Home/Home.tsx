import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { fetchCats } from '../../redux/slices/catsSlice';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import CatBlock from '../../components/CatsBlock/CatBlock';
import Sort from '../../components/Sort/Sort';
import CartButton from '../../components/CartBlock/CartButton/CartButton';
import Skeleton from '../../components/CatsBlock/Skeleton';
import styles from './home.module.scss';
import FavoriteButton from '../../components/FavoriteBlock/FavoriteButton/FavoriteButton';
import Pagination from '../../components/Pagination/Pagination';
import Checkpoint from '../../components/CheckpointBlock/Checkpoint';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const sortType = useSelector((state: RootState) => state.filterSlice.sort.sortProperty);
  const currentPage = useSelector((state: RootState) => state.filterSlice.currentPage);
  const cats = useSelector((state: RootState) => state.catsSlice.items);
  const cart = useSelector((state: RootState) => state.cartSlice.items);
  const sell = useSelector((state: RootState) => state.filterSlice.sell);
  const status = useSelector((state: RootState) => state.catsSlice.status);

  const onChangePageHandler = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  // const getCats = async () => {
  //   const sortBy = sortType.replace('-', '');
  //   const order = sortType.includes('-') ? 'asc' : 'desc';
    
  //   // Правильно формируем параметр issell
  //   let issellParam = '';
  //   if (sell === 1) {
  //     issellParam = 'issell=true'; // В наличии
  //   } else if (sell === 2) {
  //     issellParam = 'issell=false'; // Отсутствуют
  //   }
  //   // Для sell = 0 (Все) не добавляем параметр
    
  //   dispatch(
  //     fetchCats({
  //       sortBy,
  //       order,
  //       currentPage,
  //       issell: issellParam,
  //     }),
  //   );
  // };


const getCats = async () => {
  const sortBy = sortType.replace('-', '');
  const order = sortType.includes('-') ? 'asc' : 'desc';
  
  const queryParams: any = {
    sortBy,
    order,
    currentPage,
  };
  
  // Добавляем issell только если выбрана фильтрация (не "Все")
  if (sell !== 0) {
    queryParams.issell = sell;
  }
  
  dispatch(fetchCats(queryParams));
};

  React.useEffect(() => {
    getCats();
  }, [sortType, currentPage, sell]);

  const catsArray = cats.map((item) => (
    <CatBlock 
      key={item.id} 
      count={0} 
      {...item} 
    />
  ));

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.sort}>
            <Sort />
          </div>
          <Link to="/favorite">
            <div className={styles.favorite}>
              <FavoriteButton />
            </div>
          </Link>
          <Link to="/cart">
            <div className={styles.cart}>
              <CartButton />
            </div>
          </Link>
          <div className={styles.checkpoint}>
            <Checkpoint />
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.content}>{status === 'loading' ? skeletons : catsArray}</div>
        </div>

        <Pagination currentPage={currentPage} onChangePage={onChangePageHandler} />
      </div>
    </div>
  );
};

export default Home;