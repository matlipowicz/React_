import { useFormik } from 'formik';
import { editOrder } from 'src/api/orders';
import { deposit } from 'src/redux/slices/MoneySlice';
import { reset } from 'src/redux/slices/OrderSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/store/Money';

type OrderIds = Array<number | string>;

export const PayOrders = () => {
  const orders = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  const orderId: OrderIds = orders.map((order) => order.id);

  const formik = useFormik({
    initialValues: {
      amount: 0,
    },
    onSubmit: (values) => {
      dispatch(deposit(values.amount));
      editOrder(orderId);
      dispatch(reset());
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '350px' }}
      >
        <label htmlFor='amount'>Finalise Invoice</label>
        <input
          type='number'
          name='amount'
          placeholder='Enter total digit for listed invoices'
          onChange={formik.handleChange}
          value={formik.values.amount}
          style={{ padding: '5px', width: '100%', marginBottom: '20px' }}
        />
      </div>
      <button type='submit'>Pay</button>
    </form>
  );
};
