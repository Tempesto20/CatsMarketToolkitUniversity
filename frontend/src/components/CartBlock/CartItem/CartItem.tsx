import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { CartItemSlice, setRemoveItem } from '../../../redux/slices/cartSlice';
import { setAddLike, setRemoveLike } from '../../../redux/slices/favoriteSlice';
import notLike from '../../../assets/svg/like.svg';
import Like from '../../../assets/svg/like2.svg';
import clearCart from '../../../assets/svg/clearCart.svg';
import styles from './cartItem.module.scss';

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  img: string;
  count: number;
  discount: number;
  buy: string;
  breed: string;
  description: string;
  age: number;
  issell: number;
  isfavorite: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ 
  id, 
  name, 
  price, 
  img, 
  count, 
  discount 
}) => {
  const dispatch = useDispatch();

  const handlerRemoveItem = () => {
    dispatch(setRemoveItem(id));
  };

  const likeItem = useSelector((state: RootState) => 
    state.favoriteSlice.items.find((obj) => obj.id === id)
  );

  const handlerLikeYes = () => {
    const item: CartItemSlice = {
      id,
      name,
      price,
      img,
      isfavorite: true,
      count: 0,
      buy: '',
      breed: '',
      description: '',
      discount: 0,
      age: 0,
      issell: 0,
    };
    dispatch(setAddLike(item));
  };

  const handlerLikeNo = () => {

    if (window.confirm('Вы действительно хотите удалить котика из списка ваших фаворитов?')) {
      dispatch(setRemoveLike(id));
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className="cart__item-img">
            <Link to={`/cat/${id}`}>
              <img className={styles.img} src={img} alt="Cat" />
            </Link>

            <div className={clsx(discount !== 0 ? 'card__discount' : '')}>
              <p className={clsx(discount !== 0 ? 'discount' : '')}>
                {discount !== 0 ? -discount : ''}
                {discount !== 0 ? `%` : ''}
              </p>
            </div>

            <div className={styles.like}>
              {!likeItem && <img src={notLike} onClick={handlerLikeYes} alt="" />}
              {likeItem && <img src={Like} onClick={handlerLikeNo} alt="" />}
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.name}>
              <Link to={`/cat/${id}`}>
                <h3 className={styles.nameText}>{name}</h3>
              </Link>
            </div>
            <div className={styles.price}>
              <p className={styles.priceText}>{price * count} ₽</p>
            </div>

            <div className={styles.clearContent} onClick={handlerRemoveItem}>
              <img src={clearCart} alt="" className={styles.clear} />
              <p className={styles.clearText}>Удалить из корзины</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;