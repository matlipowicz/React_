import { createContext, useContext, useEffect, useState } from 'react';
import { getAllOrders, Order } from 'src/api/orders';
import { OrderContextMultiStepFormType } from 'src/components/multistep_form/Types/multistepform_types';

export const InvoicesContext = createContext<OrderContextMultiStepFormType | null>(null);

export const InvoicesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [invoiceArray, setInvoiceArray] = useState<Order[]>([]);
  const [orderData, setOrderData] = useState<Order[] | null>(null);

  useEffect(() => {
    getAllOrders().then((data) => setOrderData(data));
  }, []);

  function handleButtonAdd(e: React.SyntheticEvent, id: string | number) {
    e.preventDefault();

    // FIND and FILTER ORDERS
    const findOrder = orderData?.find((order) => order.id === id) as Order;
    const findExistingOrder = invoiceArray.includes(findOrder);

    if (!findExistingOrder) setInvoiceArray((prev) => [...prev, findOrder]);
  }

  return (
    <InvoicesContext.Provider value={{ invoiceArray, handleButtonAdd, orderData }}>
      {children}
    </InvoicesContext.Provider>
  );
};

export const useInvoiceContext = () => {
  const ctx = useContext(InvoicesContext);
  if (!ctx) {
    console.log('Context InvoiceContext used out of a Context scope');
  }
  return ctx;
};
