import { InitialData, UpdateTypes } from 'src/components/multistep_form/Types/multistepform_types';

import styles from 'src/components/multistep_form/MultiStepForm.module.css';

const StepThree = ({
  name,
  surname,
  street,
  postalCode,
  town,
  phoneNumber,
  orders,
  price,
  dateFrom,
  dateTo,
  updateForm,
}: InitialData & UpdateTypes) => (
  <>
    <section className={styles['step__chosen-orders']}>
      {orders.map((order) => (
        <div key={order.id}>
          <p>{order.id}</p>
          <p>{order.orderTitle}</p>
          <p>{order.orderQuantity}</p>
        </div>
      ))}
    </section>
    <section className={styles['step__client']}>
      <p>
        <b>Full name:</b> {name} {surname}
      </p>
      <p>
        <b>Address:</b> {town} {postalCode} {street}
      </p>
      <p>
        <b>Province:</b> {postalCode}
      </p>
      <p>
        <b>Phone:</b> {phoneNumber}
      </p>
    </section>
    <section className={styles['step__final-form']}>
      <label htmlFor='price'>Invoice price</label>
      <input
        className={styles['step__invoice-price']}
        name='price'
        placeholder='Enter price'
        required
        type='text'
        value={price}
        onChange={(e: React.SyntheticEvent) => {
          const targetInput = e.target as HTMLInputElement;
          return updateForm({ price: targetInput.value });
        }}
      />
      <label htmlFor='date-from'>Date from</label>
      <input
        className={styles['step__invoice-date-from']}
        name='date-from'
        required
        type='date'
        value={dateFrom}
        onChange={(e: React.SyntheticEvent) => {
          const targetInput = e.target as HTMLInputElement;
          return updateForm({ dateFrom: targetInput.value });
        }}
      />
      <label htmlFor='date-to'>Date to</label>
      <input
        className={styles['step__invoice-date-to']}
        name='date-to'
        required
        type='date'
        value={dateTo}
        onChange={(e: React.SyntheticEvent) => {
          const targetInput = e.target as HTMLInputElement;
          return updateForm({ dateTo: targetInput.value });
        }}
      />
    </section>
  </>
);

export default StepThree;
