import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { addOrder, orderValidationSchema, SelectValues } from 'src/api/orders';

import { QuantityInput } from './order-form_inputs/QuantityInput';
import { SelectInput } from './order-form_inputs/SelectInput';
import { TextInput } from './order-form_inputs/TextInput';

export const OrdersForm = () => {
  //! Mutation

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: SelectValues) => addOrder(data),
    onSuccess: () => queryClient.invalidateQueries(['add'], { exact: true }),
    onError: () => console.log('Something went wrong'),
  });

  const formik = useFormik<SelectValues & { invoicePaymentStatus: boolean }>({
    initialValues: {
      phoneNumber: '',
      orderContent: '',
      orderQuantity: '',
      orderTitle: '',
      invoicePaymentStatus: false,
    },
    onSubmit: (values: SelectValues) => {
      mutate(values);
    },
    validationSchema: orderValidationSchema,
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px', border: 'thin sold' }}
      >
        <SelectInput formik={formik} label='Name' type='phoneNumber' />
        <QuantityInput formik={formik} label='Order quantity' type='orderQuantity' />
        <TextInput formik={formik} label='Order title' type='orderTitle' />
        <TextInput formik={formik} label='Order content' type='orderContent' />

        <button type='submit'>Place an order</button>
      </form>
    </>
  );
};
