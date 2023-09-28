import { useFormik } from 'formik';
import { deposit } from 'src/redux/slices/MoneySlice';
import { useAppDispatch } from 'src/redux/store/Money';
import * as yup from 'yup';

import { TranferType } from './types/PaymentTypes';

import styles from './Payment.module.css';

const DepositSchema = yup.object({
  deposit: yup.number().required('Enter amount of money you want to deposit').positive(),
});

export function DepositForm() {
  const dispatch = useAppDispatch();

  const formikDeposit = useFormik({
    initialValues: {
      deposit: 0,
    },
    onSubmit: (values: TranferType) => {
      dispatch(deposit(values.deposit || 0));
      alert(`You have deposited ${JSON.stringify(values, null, 2)}`);
    },
    validationSchema: DepositSchema,
  });
  return (
    <>
      <form className={styles['deposit-form']} onSubmit={formikDeposit.handleSubmit}>
        <label htmlFor='deposit'>Deposit money</label>
        <input
          className={formikDeposit.errors.deposit ? styles['deposit-error'] : ''}
          name='deposit'
          type='number'
          placeholder='Deposit'
          onChange={formikDeposit.handleChange}
          value={formikDeposit.values.deposit}
        />
        <button type='submit'>Transfer</button>
      </form>
    </>
  );
}
