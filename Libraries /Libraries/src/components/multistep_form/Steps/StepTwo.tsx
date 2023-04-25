import { useEffect } from 'react';
import { Order } from 'src/api/orders';
import { OrderContextMultiStepFormType } from 'src/components/multistep_form/Types/multistepform_types';
import { useInvoiceContext } from 'src/contexts/context/InvoicesContext';

import styles from '../MultiStepForm.module.css';

//! Types

type OrderTypeProps = {
  orders: Order[];
  phoneNumber: string;
  updateForm: (orders: { orders: Order[] }) => void;
};

//! Context

//! Component
const StepTwo = ({ phoneNumber, updateForm }: OrderTypeProps) => {
  //? Nie wiem czemu jak nie dam type assertion to mi zwraca te właściwości w any
  const { invoiceArray, orderData, handleButtonAdd } =
    useInvoiceContext() as OrderContextMultiStepFormType;

  useEffect(() => {
    updateForm({ orders: invoiceArray });
  }, [invoiceArray]);

  console.log(invoiceArray);
  return (
    <>
      {orderData !== null ? (
        <div className={styles['step__orders']}>
          {orderData.map((order: Order) => {
            if (order?.phoneNumber === phoneNumber) {
              return (
                <div key={order?.id} className={styles['step__order']}>
                  <p>
                    <b>Title:</b>
                    {order?.orderTitle}
                  </p>
                  <p>
                    <b>Content:</b>
                    {order?.orderContent}
                  </p>
                  <p>
                    <b>Quantity:</b>
                    {order?.orderQuantity}
                  </p>
                  <p className={styles['step__paragraph-id']}>
                    <b>Order id:</b>
                    {order?.id}
                  </p>
                  <button
                    className={styles['step__invoice-btn']}
                    onClick={(e: React.SyntheticEvent) => {
                      handleButtonAdd(e, order.id);
                    }}
                  >
                    Add
                  </button>
                </div>
              );
            }
          })}
        </div>
      ) : null}
    </>
  );
};

export default StepTwo;
