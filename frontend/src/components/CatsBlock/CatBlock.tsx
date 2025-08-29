import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { CartItemSlice, setAddItem } from '../../redux/slices/cartSlice';
import { setAddLike, setRemoveLike } from '../../redux/slices/favoriteSlice';
import notLike from '../../assets/svg/like.svg';
import Like from '../../assets/svg/like2.svg';
import line from '../../assets/svg/line.svg';
import './catBlock.scss';

const CatBlock: React.FC<CartItemSlice> = ({
  id,
  img,
  name,
  price,
  age,
  discount,
  buy,
  isfavorite,
  issell,
}) => {
  const dispatch = useAppDispatch();

  const cartItem = useSelector((state: RootState) => state.cartSlice.items);
  // console.log(cartItem.length);

  const likeItem = useSelector((state: RootState) => state.favoriteSlice.items).find(
    (obj) => obj.id === id,
  );
  //писк по конкретной id при добавлении в фавориты
  // console.log(likeItem);

  const handlerLikeYes = () => {
    const item: CartItemSlice = {
      id,
      name,
      price,
      img,
      discount,
      isfavorite: true,
      buy,
      issell,
      count: 0,
      breed: '',
      description: '',
      age: 0,
    };
    // setLike(true); // при использовании useState
    dispatch(setAddLike(item));
    // console.log(item)
  };

  const handlerLikeNo = () => {
    // setLike(false);// при использовании useState
    dispatch(setRemoveLike(id));
    //console.log(item)
  };

  const handlerAddItems = () => {
    for (let i = 0; i < cartItem.length; i++) {
      //console.log(cartItem[i].id);
      if (cartItem[i].id !== id) {
        //если такой id ещё НЕ имеется корзине, то добавлять
        //console.log('если такой id ещё НЕ имеется корзине, то добавлять');
      } else {
        //если такой id ИМЕЕТСЯ корзине, то не добавлять
        //console.log('не добавлять')
        return;
      }
    }
    const item: CartItemSlice = {
      id,
      name,
      price,
      img,
      discount,
      buy,
      issell,
      count: 0,
      breed: '',
      description: '',
      age: 0,
      isfavorite: false,
    };
    dispatch(setAddItem(item));
    //console.log(item)
  };

  return (
    <div className="cards__cat">
      <div className="card">
        <div className="card__img">
          <Link to={`/cat/${id}`} key={id}>
            <img src={img} alt="" className="card__cat-img" />
          </Link>
          <div className={clsx(discount !== 0 ? 'card__discount' : '')}>
            <p className={clsx(discount !== 0 ? 'discount' : '')}>
              {discount !== 0 ? -discount : ''}
              {discount !== 0 ? `%` : ''}
            </p>
          </div>
          <div className="card__like">
            {!likeItem && <img src={notLike} onClick={handlerLikeYes} alt="" />}
            {likeItem && <img src={Like} onClick={handlerLikeNo} alt="" />}
          </div>
        </div>

        <div className="card__background">
          <Link to={`/cat/${id}`} key={id} className="card__title">
            {name}
          </Link>

          <div className="card__cat-row">
            <img src={line} alt="" className="line"></img>

            <p className="color__cat">
              Коричневый
              <br></br>
              окрас
            </p>
            <div className="cat_year">
              <p className="years__cat">{age}</p>
              <p className="years__cat-1">Возраст</p>
            </div>
            <div className="cat__quantity">
              <div className="old__cat">
                4<p className="quantity__cat">Кол-во лап</p>
              </div>
            </div>
          </div>
          <h3 className="price__cat">{price} руб.</h3>

          <button
            disabled={buy === 'Продан'}
            //пофиксил возможность приобретения уже проданных котиков
            onClick={handlerAddItems}
            className={clsx(buy !== 'Продан' ? 'buy__cat buy' : 'buy__cat sold')}>
            {/*onClick={clickHandler}*/}
            <p className="byu__cat-1 ">{buy}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatBlock;

// const [like, setLike] = React.useState(isfavorite);

// console.log(like)
// const chengeLikeYes = () => {
//   setLike(true);
// };

// const chengeLikeNo = () => {
//   setLike(false);
// };
// console.log(id + ' ' + like);

// for(let i=0; i<likeItem.length; i++){
//   console.log('start id' + ' ' + likeItem[i].id)
//   console.log('start isfavorite' + ' ' +likeItem[i].isfavorite)
//   console.log('lol-1')

//   if(likeItem[i].id === id){
//     console.log('lol-2')
//     likeItem[i].isfavorite = true;
//     // console.log('finish isfavorite' + ' ' +likeItem[i].isfavorite)
//     console.log('finish isfavorite')
//     dispatch(setLike(true));
//   } else {
//   console.log('lol-3')
//   likeItem[i].isfavorite = true;
//   console.log('finish isfavorite' + ' ' +likeItem[i].isfavorite)
//  } return
// }

//  {discount !== 0 ? cardDiscount : cardDiscountNone}

// const catBuy = (
//   <button className="buy__cat buy">
//     {/*onClick={clickHandler}*/}
//     <b className="byu__cat-1 ">{buy}</b>
//   </button>
// );

// const catSold = (
//   <div className="buy__cat sold">
//     <a href="#!" className="byu__cat-1 ">
//       {buy}
//     </a>
//   </div>
// );
//          {/* {buy !== 'Продан' ? catBuy : catSold} */}

// <div>
//   <img src={img} style={{ maxWidth: '250px' }} />
//   <h1>имя {name}</h1>
//   <b>цена {price}</b>
//   <b>возраст {age}</b>
//   <b>лайк {isfavorite}</b>
//   <button onClick={likeHandler}> like </button>
//   <div style={{ backgroundColor: '#161617', maxWidth: '250px' }}>
//     {like}
//     {/* {like && <img src={notLike} />} */}
//   </div>
// </div>;
