import { Order } from 'src/api/orders';
import { add, remove } from 'src/redux/slices/OrderSlice';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/redux/store/Money';

import style from './Orders.module.css';

export const OrderCard = ({ order }: { order: Order[] }) => {
  //! Redux
  const allMarkedOrders = useAppSelector((state) => state.order);
  console.log('all marked orders', allMarkedOrders);
  const dispatch = useAppDispatch();
  const handleAddOrderPay = (id: number | string, title: string) => {
    console.log('hey');
    dispatch(add({ id: id, title: title }));
  };

  const handleOrderRemove = (position: number) => {
    dispatch(remove(position));
  };
  return (
    <>
      <div className={style['order__card']}>
        {order.map((user, index: number) => {
          const checked = allMarkedOrders.map((el) => el.id).includes(user.id);
          console.log('checked', checked);
          // TODO: Dodaj do osobnych komponentów
          return (
            <div className={style['order__card--user']} key={user.id}>
              <div className={style['order__checkbox']}>
                <input
                  type='checkbox'
                  name='order-pay'
                  checked={checked}
                  onChange={() => {
                    if (!checked) {
                      handleAddOrderPay(user.id, user.orderTitle);
                    } else {
                      handleOrderRemove(index);
                    }
                  }}
                />
              </div>
              <div>
                <Link to={`${user.id}`}>
                  <p>Phone:{user.phoneNumber}</p>
                </Link>

                <p>
                  <b>Order title:</b>
                  {user.orderTitle}
                </p>
                <p>
                  <b>Items quantity:</b>
                  {user.orderQuantity}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
