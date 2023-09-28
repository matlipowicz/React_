import { useFormik } from 'formik';
import { withdraw } from 'src/redux/slices/MoneySlice';
import { useAppDispatch } from 'src/redux/store/Money';
import * as yup from 'yup';

import { TranferType } from './types/PaymentTypes';

import styles from './Payment.module.css';

const WithdrawSchema = yup.object({
  withdraw: yup.number().required('Enter amount of money you want to withdraw').positive(),
});

export function WithdrawForm() {
  const dispatch = useAppDispatch();
  const formikWithdraw = useFormik({
    initialValues: {
      withdraw: 0,
    },
    onSubmit: (values: TranferType) => {
      dispatch(withdraw(values.withdraw || 0));
      alert(`You have deposited ${JSON.stringify(values, null, 2)}`);
    },
    validationSchema: WithdrawSchema,
  });
  return (
    <>
      <form className={styles['withdraw-form']} onSubmit={formikWithdraw.handleSubmit}>
        <label htmlFor='deposit'>Withdraw money</label>
        <input
          className={formikWithdraw.errors.withdraw ? styles['deposit-error'] : ''}
          name='withdraw'
          type='number'
          placeholder='Withdraw'
          onChange={formikWithdraw.handleChange}
          value={formikWithdraw.values.withdraw}
        />
        <button type='submit'>Transfer</button>
      </form>
    </>
  );
}
